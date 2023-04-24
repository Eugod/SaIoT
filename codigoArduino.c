/********************* Inclusão Bibliotecas **************************/
#include <WiFi.h>
#include <FirebaseESP32.h>

/********************* Declaração Variáveis **************************/
const char *ssid = "xxxxxx";
const char *password = "xxxxxxx";
WiFiServer server(80);

/********************* Setup **************************/
void setup()
{
    Serial.begin(115200);
    delay(3000);
    pinMode(4, OUTPUT);
    digitalWrite(4, 0);

    // Conexão ao WiFi
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");

    // Inicia o Servidor
    server.begin();
    Serial.println("Server started");

    // Apresenta Endereço IP do ESP32 na Serial
    Serial.println(WiFi.localIP());

    // Faz conexão com firebase
    FirebaseESP32 firebase;
    firebase.begin("saiot-fb259", "wo2oMjKoNtRe7thwTNfNWr6gq8fVwYVGMPmvcXPc");
    firebase.set("endereco-ip-esp32", WiFi.localIP().toString());
}

/********************* Loop Principal **************************/
void loop()
{
    // Verifica se há algum cliente conectado
    WiFiClient client = server.available();
    if (!client)
    {
        return;
    }
    
    // Aguada o cliente enviar algum dado
    Serial.println("new client");
    while (!client.available())
    {
        delay(1);
    }
    String req = client.readStringUntil('\r');
    Serial.println(req);
    client.flush();
    if (req.indexOf("/gpio/0") != -1)
    {
        digitalWrite(4, 0);
        delay(100);
    }
    else if (req.indexOf("/gpio/1") != -1)
    {
        digitalWrite(4, 1);
        delay(100);
    }
    else
    {
        Serial.println("invalid request");
        client.stop();
        return;
    }
    client.flush();
}