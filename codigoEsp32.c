//importando bibliotecas
#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <ArduinoJson.h>

//fazendo definições para não repetir muito texto durante o código 
#define WIFI_SSID "Bratislava"
#define WIFI_PASSWORD "Neguebaloko21"
WiFiServer server(80);
#define FIREBASE_HOST "https://saiot-fb259-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "wo2oMjKoNtRe7thwTNfNWr6gq8fVwYVGMPmvcXPc"

int led = 2;

//variáveis de estado
int estadoArCondicionado;
int estadoDimer;
int estadoEsteira;

//informações do ar condicionado que serão puxadas do banco de dados
/*
int consumoArCondicionado = 0;
int temperaturaArCondicionado;
int temperaraturaAmbiente;
*/

//informações da esteira que serão puxadas do banco de dados
int consumoEsteira = 0;
int horasDeUsoDiario = 0;
int minutosDeUsoDiario = 0;
int horasDeUsoTotal;
int minutosDeUsoTotal;

//variáveis da função meuDelay
unsigned long tempoAnterior;
unsigned long tempoAtual;

void setup() {
  pinMode(led, OUTPUT);

  Serial.begin(115200);      //inicia comunicação serial

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);     //inicia comunicação com wifi com rede definica anteriormente
  
  Serial.print("Conectando ao WiFi");       //imprime "Conectando ao wifi"
  while (WiFi.status() != WL_CONNECTED)     //enquanto se conecta ao wifi fica colocando pontos
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.println();

  Serial.println("WiFi conectado!");
  Serial.println();

  Serial.print("IP da rede: ");
  Serial.println(WiFi.localIP());

  server.begin();   //inicia o servidor HTTP

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);   //inicia comunicação com firebase definido anteriormente

  Firebase.set("IP", WiFi.localIP().toString());   //envia o IP da rede para o diretório IP no firebase
}

void loop() {
  /*
  verificaEstadoDoArCondicionado();
  enviarDadosDoArCondicionadoParaBancoDeDados();
  */

  verificaEstadoDaEsteira();
  puxaTempoDeUsoTotal();
  enviarDadosDaEsteiraParaBancoDeDados();
  requisicaoClient();
}

//funções ar condiciondao
/*
void verificaEstadoDoArCondicionado() {
  estadoArCondicionado = Firebase.getInt("/ControleDeDados/arCondicionado/ligadoDesligado");

  if(estadoArCondicionado == 1) {
    digitalWrite(led, 1);
  } else {
    digitalWrite(led, 0);
  }
}

void verificaTemperaturaDoArCondicionado() {
  temperaturaArCondicionado = Firebase.getInt("ControleDeDados/arCondicionado/temperatura");
}

void enviarDadosDoArCondicionadoParaBancoDeDados() {
  while(estadoArCondicionado == 1) {
    consumoArCondicionado ++;

    Firebase.set("ControleDeDados/arCondicionado/consumo", consumoArCondicionado);

    meuDelay(60000);

    verificaEstadoDoArCondicionado();
    verificaTemperaturaDoArCondicionado();
  }
}
*/

//funções dimer
void verificaEstadoDoDimer() {
  estadoDimer = Firebase.getInt("/ControleDeDados/dimer/ligadoDesligado");

  if(estadoDimer == 1) {
    digitalWrite(led, 1);
  } else {
    digitalWrite(led, 0);
  }
}

void enviarDadosDoDimerParaBancoDeDados() {
  while(estadoDimer == 1) {


    meuDelay(1000);
    
    verificaEstadoDoDimer();
  }
}

//funções esteira
void verificaEstadoDaEsteira() {
  estadoEsteira = Firebase.getInt("/ControleDeDados/esteira/ligadoDesligado");

  if(estadoEsteira == 1) {
    digitalWrite(led, 1);
  } else {
    digitalWrite(led, 0);
  }
}

void puxaTempoDeUsoTotal() {
  horasDeUsoTotal = Firebase.getInt("/ControleDeDados/esteira/horasDeUsoTotal");
  minutosDeUsoTotal = Firebase.getInt("/ControleDeDados/esteira/minutosDeUsoTotal");
}

void enviarDadosDaEsteiraParaBancoDeDados() {
  Firebase.set("ControleDeDados/esteira/horasDeUsoDiario", horasDeUsoDiario);

  while(estadoEsteira == 1) {
    consumoEsteira ++;
    minutosDeUsoDiario ++;
    minutosDeUsoTotal ++;

    if(minutosDeUsoDiario == 60) {
      minutosDeUsoDiario = 0;
      horasDeUsoDiario ++;
      Firebase.set("ControleDeDados/esteira/horasDeUsoDiario", horasDeUsoDiario);
    }

    if(minutosDeUsoTotal == 60){
      minutosDeUsoTotal = 0;
      horasDeUsoTotal++;
      Firebase.set("ControleDeDados/esteira/horasDeUsoTotal", horasDeUsoTotal);
    }

    Firebase.set("ControleDeDados/esteira/consumo", consumoEsteira);
    Firebase.set("ControleDeDados/esteira/minutosDeUsoDiario", minutosDeUsoDiario);
    Firebase.set("ControleDeDados/esteira/minutosDeUsoTotal", minutosDeUsoTotal);

    meuDelay(60000);
    
    verificaEstadoDaEsteira();
  }
}

//requisição do client
void requisicaoClient() {
  WiFiClient client = server.available();

  if(client) {
    String req = client.readStringUntil('\r');
    client.flush();

    if(req.indexOf("off") != -1) {
      digitalWrite(led, 0);
      Firebase.set("ControleDeDados/esteira/ligadoDesligado", 0);
    }
  }

  client.flush();
}

//função delay
void meuDelay(int delay) {
  tempoAnterior = millis();
  
  tempoAtual = tempoAnterior;
  
  while (tempoAtual - tempoAnterior < delay) { 
  	tempoAtual = millis();

    //verificações e interrupção ar condicionado
    /*
    verificaTemperaturaDoArCondicionado();
    verificaEstadoDoArCondicionado();
    if(estadoArCondicionado == 0) {
      break;
    }
    */

    //verificações e interrupção esteira
    requisicaoClient();
    verificaEstadoDaEsteira();
    if(estadoEsteira == 0) {
      break;
    }
  }
}

