const express = require('express');
const admin = require('./firebaseServer');

const app = express();
const port = 3000;

// Middleware para análise de corpos de requisições JSON
app.use(express.json());

const db = admin.database();
const dbRefEsteira = db.ref('ControleDeDados/esteira');
const dbRefArCondicionado = db.ref('ControleDeDados/arCondicionado');

// Variável do ar condicionado
let intervalIdArCondicionado = null;
let horasDeUso = 0;

// Variáveis da esteira
let intervalIdEsteira = null;
let minutosDeUsoDiario = 0;
let horasDeUsoDiario = 0;
let minutosDeUsoTotal = 0;
let horasDeUsoTotal = 0;

app.post('/timer/iniciar', (req, res) => {
    if (!intervalIdArCondicionado) {
      intervalIdArCondicionado = setInterval(() => {
        horasDeUso ++;
  
        dbRefArCondicionado.update({
          horasDeUso
        });
      }, 5000);
  
      return res.sendStatus(200);
    } else {
      return res.status(400).send('A contagem de tempo já está em andamento.');
    }
  });
  
  app.post('/timer/parar', (req, res) => {
    if (intervalIdArCondicionado) {
      clearInterval(intervalIdArCondicionado);
      intervalIdArCondicionado = null;
  
      return res.sendStatus(200);
    } else {
      return res.status(400).send('A contagem de tempo ainda não foi iniciada.');
    }
  });

// Rota para iniciar a contagem de tempo da esteira
app.post('/timer/start', async (req, res) => {
  if (!intervalIdEsteira) {
    const snapshot = await dbRefEsteira.once('value');

    horasDeUsoTotal = snapshot.child('horasDeUsoTotal').val() || 0;
    minutosDeUsoTotal = snapshot.child('minutosDeUsoTotal').val() || 0;

    intervalIdEsteira = setInterval(() => {
      minutosDeUsoDiario = minutosDeUsoDiario >= 59 ? 0 : minutosDeUsoDiario + 1;
      minutosDeUsoTotal = minutosDeUsoTotal >= 59 ? 0 : minutosDeUsoTotal + 1;

      if (minutosDeUsoDiario === 0) {
        horasDeUsoDiario++;
      }

      if (minutosDeUsoTotal === 0) {
        horasDeUsoTotal++;
      }

      dbRefEsteira.update({
        minutosDeUsoDiario,
        horasDeUsoDiario,
        minutosDeUsoTotal,
        horasDeUsoTotal
      });
    }, 1000);

    res.sendStatus(200);
  } else {
    res.sendStatus(400).send('A contagem de tempo já está em andamento.');
  }
});

// Rota para parar a contagem de tempo da esteira
app.post('/timer/stop', (req, res) => {
  if (intervalIdEsteira) {
    clearInterval(intervalIdEsteira);
    intervalIdEsteira = null;

    res.sendStatus(200);
  } else {
    res.sendStatus(400).send('A contagem de tempo ainda não foi iniciada.');
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});