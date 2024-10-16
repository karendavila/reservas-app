const { Room, User } = require('../models');
const path = require('path');

exports.createRoom = async (req, res) => {
  try {
    let roomData = req.body;

    // Si se subió una imagen, agregar la ruta a los datos
    if (req.file) {
      roomData.imagePath = req.file.path;
    }

    const newRoom = await Room.create(roomData);
    res.status(201).json(newRoom);
  } catch (error) {
    // Si el error es un error de validación de Sequelize
    if (
      ['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(
        error.name
      )
    ) {
      // Formatear el mensaje de error
      const validationErrors = error.errors.map(err => err.message);
      res.status(400).json({ errors: validationErrors });
    } else {
      // Si es cualquier otro tipo de error
      console.error(error);
      res.status(500).json({ error: 'Error al crear la sala.' });
    }
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las salas.' });
  }
};

exports.getRoomById = async (req, res) => {
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
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Sala no encontrada.' });
    }

    // Si se subió una nueva imagen, actualizar la ruta
    if (req.file) {
      req.body.imagePath = req.file.path;
    }

    await room.update(req.body);
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la sala.' });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Sala no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la sala.' });
  }
};
