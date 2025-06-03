const express = require('express');
const app = express();
const PORT = 3000;

// Valor fijo de desplazamiento
const FIXED_SHIFT = 3;

app.use(express.json());

function cesarEncrypt(text) {
  return text.split('').map(char => {
    if(/[a-z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 97 + FIXED_SHIFT) % 26 + 97);
    }
    if(/[A-Z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 65 + FIXED_SHIFT) % 26 + 65);
    }
    return char;
  }).join('');
}

function cesarDecrypt(text) {
  return text.split('').map(char => {
    if(/[a-z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 97 - FIXED_SHIFT + 26) % 26 + 97);
    }
    if(/[A-Z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 65 - FIXED_SHIFT + 26) % 26 + 65);
    }
    return char;
  }).join('');
}

// Ruta para encriptar
app.post('/encrypt', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message es requerido" });
  }
  const encrypted = cesarEncrypt(message);
  res.json({ encrypted });
});

// Ruta para desencriptar
app.post('/decrypt', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message es requerido" });
  }
  const decrypted = cesarDecrypt(message);
  res.json({ decrypted });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});