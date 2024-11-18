require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Suporte para CORS

const app = express();
const PORT = process.env.PORT || 3000; // Porta do servidor

// Estado global para os giroflexes
let giroflexState = false;

// Middlewares
app.use(cors()); // Habilita CORS
app.use(bodyParser.json());

// Logs de requisições para debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rota para alternar o estado do giroflex
app.post('/toggle', (req, res) => {
  try {
    giroflexState = !giroflexState; // Alterna o estado atual
    console.log(`Estado do giroflex alterado para: ${giroflexState}`);
    res.status(200).json({ success: true, state: giroflexState });
  } catch (error) {
    console.error('Erro ao alternar o estado do giroflex:', error);
    res.status(500).json({ success: false, error: 'Erro interno no servidor' });
  }
});

// Rota para obter o estado atual do giroflex
app.get('/status', (req, res) => {
  try {
    res.status(200).json({ state: giroflexState });
  } catch (error) {
    console.error('Erro ao obter o estado do giroflex:', error);
    res.status(500).json({ success: false, error: 'Erro interno no servidor' });
  }
});

// Rota padrão para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está rodando! 🚀');
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro capturado pelo middleware global:', err);
  res.status(500).json({ success: false, error: 'Erro interno no servidor' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
