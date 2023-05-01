//importando bibliotecas
#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <ArduinoJson.h>

//fazendo definições para não repetir muito texto durante o código 
#define WIFI_SSID "Bratislava"
#define WIFI_PASSWORD "Neguebaloko21"
#define FIREBASE_HOST "https://saiot-fb259-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "wo2oMjKoNtRe7thwTNfNWr6gq8fVwYVGMPmvcXPc"

int estadoArCondicionado;
int estadoDimer;
int estadoEsteira;

int led = 2;

int consumo = 0;

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

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);   //inicia comunicação com firebase definido anteriormente

  Firebase.set("IP", WiFi.localIP().toString());   //envia o IP da rede para o diretório IP no firebase
}

void loop() {
  verificaEstadoDoArCondicionado();
  enviarDadosDoArCondicionadoParaBancoDeDados();
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

void enviarDadosDoArCondicionadoParaBancoDeDados() {
  while(estadoArCondicionado == 1) {
    consumo = consumo + 1;

    Firebase.set("ControleDeDados/arCondicionado/consumo", consumo);

    meuDelay(1000);

    verificaEstadoDoArCondicionado();
  }
}

// funções dimer
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

void enviarDadosDaEsteiraParaBancoDeDados() {
  while(estadoEsteira == 1) {


    meuDelay(1000);
    
    verificaEstadoDaEsteira();
  }
}

//função delay
void meuDelay(int delay) {
  tempoAnterior = millis();
  
  tempoAtual = tempoAnterior;
  
  while (tempoAtual - tempoAnterior < delay) { 
  	tempoAtual = millis();
  }
}
