// Importar Express
const express = require("express");
const { Room } = require('./models');

// Crear una aplicación de Express
const app = express();

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Ruta inicial (raíz)
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Middleware para parsear JSON
app.use(express.json());

// Crear un nuevo Room
app.post('/rooms', async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la sala.' });
  }
});

// Listar todos los Rooms
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las salas.' });
  }
});

// Obtener un Room por ID
app.get('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: 'Sala no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la sala.' });
  }
});

// Actualizar un Room
app.put('/rooms/:id', async (req, res) => {
  try {
    const [updated] = await Room.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRoom = await Room.findByPk(req.params.id);
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ error: 'Sala no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la sala.' });
  }
});

// Eliminar un Room
app.delete('/rooms/:id', async (req, res) => {
  try {
    const deleted = await Room.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Sala no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la sala.' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
