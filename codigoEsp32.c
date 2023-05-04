//importando bibliotecas
#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <ArduinoJson.h>
#include <dht11.h>

//fazendo definições para não repetir muito texto durante o código 
#define WIFI_SSID "Bratislava"
#define WIFI_PASSWORD "slamaluco"
WiFiServer server(80);
#define FIREBASE_HOST "https://saiot-fb259-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "wo2oMjKoNtRe7thwTNfNWr6gq8fVwYVGMPmvcXPc"

#define DHT11PIN 13   //definição do pino do sensor DHT11
dht11 DHT11;

int led = 2;

//variáveis de estado
int estadoArCondicionado;
int estadoDimer;
int estadoEsteira;

//informações do ar condicionado que serão puxadas do banco de dados
int temperaturaArCondicionado;
int temperaraturaAmbiente;


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
  verificaEstadoDoArCondicionado();
  enviarDadosDoArCondicionadoParaBancoDeDados();
  
  /*
  verificaEstadoDaEsteira();
  requisicaoClient();
  */
}

//funções ar condiciondao
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
    verificaEstadoDoArCondicionado();
    verificaTemperaturaDoArCondicionado();
    sensorDeTemperatura();
    
    meuDelay(1000);
  }
}


//funções dimer
/*
void verificaEstadoDoDimer() {
  estadoDimer = Firebase.getInt("/ControleDeDados/dimer/ligadoDesligado");

  if(estadoDimer == 1) {
    digitalWrite(led, 1);
  } else {
    digitalWrite(led, 0);
  }
}
*/

//funções esteira
/*
void verificaEstadoDaEsteira() {
  estadoEsteira = Firebase.getInt("/ControleDeDados/esteira/ligadoDesligado");

  if(estadoEsteira == 1) {
    digitalWrite(led, 1);
  } else {
    digitalWrite(led, 0);
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
*/

//função delay
void meuDelay(int delay) {
  tempoAnterior = millis();
  
  tempoAtual = tempoAnterior;
  
  while (tempoAtual - tempoAnterior < delay) { 
  	tempoAtual = millis();

    //verificações e interrupção ar condicionado
    verificaTemperaturaDoArCondicionado();
    verificaEstadoDoArCondicionado();
    if(estadoArCondicionado == 0) {
      break;
    }
  }
}

void sensorDeTemperatura() {
  int check = DHT11.read(DHT11PIN);

  Firebase.set("ControleDeDados/arCondicionado/temperaturaAmbiente", (float)DHT11.temperature, 1);
}
