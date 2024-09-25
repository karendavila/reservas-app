// Importar Express
const express = require("express");

// Crear una aplicación de Express
const app = express();

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Ruta inicial (raíz)
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.get("/hola/", (req, res) => {
    res.send("¡Hola diego");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
