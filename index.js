const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

function cesarEncrypt(text, shift) {
  return text.split('').map(char => {
    if(/[a-z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
    }
    if(/[A-Z]/.test(char)) {
      return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
    }
    return char;
  }).join('');
}

function cesarDecrypt(text, shift) {
  return cesarEncrypt(text, 26 - (shift % 26));
}

// Ruta para encriptar
app.post('/encrypt', (req, res) => {
  const { message, shift } = req.body;
  if (!message || typeof shift !== "number") {
    return res.status(400).json({ error: "message y shift requeridos" });
  }
  const encrypted = cesarEncrypt(message, shift);
  res.json({ encrypted });
});

// Ruta para desencriptar
app.post('/decrypt', (req, res) => {
  const { message, shift } = req.body;
  if (!message || typeof shift !== "number") {
    return res.status(400).json({ error: "message y shift requeridos" });
  }
  const decrypted = cesarDecrypt(message, shift);
  res.json({ decrypted });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});