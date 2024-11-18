const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Array para armazenar os estados de cada ESP8266
let devices = {
  device1: false,
  device2: false,
  device3: false
};

app.use(express.json());

// Endpoint para alterar o estado do dispositivo
app.post('/trigger/:device', (req, res) => {
  const deviceId = req.params.device;
  
  if(devices[deviceId] !== undefined) {
    devices[deviceId] = true;
    res.status(200).send({ status: 'success', device: deviceId });
  } else {
    res.status(404).send({ status: 'error', message: 'Device not found' });
  }
});

// Endpoint para verificar o estado dos dispositivos
app.get('/status', (req, res) => {
  res.status(200).json(devices);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
