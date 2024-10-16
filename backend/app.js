require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const eventRoutes = require('./routes/eventRoutes');
const path = require('path');

app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Montar las rutas
app.use('/api', userRoutes);
app.use('/api', roomRoutes);
app.use('/api', eventRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'El servidor está funcionando correctamente.',
  });
});

// Iniciar la base de datos y el servidor
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: false }) // force: true reiniciará las tablas cada vez
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
