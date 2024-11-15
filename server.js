require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Usa a variável PORT do .env ou 3000 como padrão

// Estado global para os giroflexes
let giroflexState = false;

// Middlewares
app.use(bodyParser.json());

// Rota para alternar o estado do giroflex
app.post('/toggle', (req, res) => {
  giroflexState = !giroflexState; // Alterna o estado atual
  console.log(`Estado do giroflex alterado para: ${giroflexState}`);
  res.status(200).send({ success: true, state: giroflexState });
});

// Rota para obter o estado atual do giroflex
app.get('/status', (req, res) => {
  res.status(200).send({ state: giroflexState });
});

// Rota padrão para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está rodando! 🚀');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
