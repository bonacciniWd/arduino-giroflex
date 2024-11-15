const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Estado global para os giroflexes
let giroflexState = false;

// Middlewares
app.use(bodyParser.json());

// Rota para alternar o estado do giroflex
app.post('/toggle', (req, res) => {
  giroflexState = !giroflexState; // Inverte o estado atual
  console.log(`Estado do giroflex alterado para: ${giroflexState}`);
  res.status(200).send({ success: true, state: giroflexState });
});

// Rota para obter o estado atual do giroflex
app.get('/status', (req, res) => {
  res.status(200).send({ state: giroflexState });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
