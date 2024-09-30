const { Event } = require('../models');
const upload = require('../middlewares/eventFileUploadMiddleware');

// Crear un nuevo evento (Create)
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent); // Responder con el nuevo evento creado
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el evento.' });
  }
};

// Obtener todos los eventos (Read - Get All)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll(); // Obtener todos los eventos
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los eventos.' });
  }
};

// Obtener un evento por ID (Read - Get One)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId); // Buscar evento por ID
    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el evento.' });
  }
};

// Actualizar un evento por ID (Update)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId); // Buscar el evento por ID
    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }

    await event.update(req.body); // Actualizar los campos con los nuevos datos
    res.status(200).json(event); // Responder con el evento actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el evento.' });
  }
};

// Eliminar un evento por ID (Delete)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId); // Buscar el evento por ID
    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }

    await event.destroy(); // Eliminar el evento
    res.status(204).json(); // Responder sin contenido
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el evento.' });
  }
};

// Controlador para subir archivos
exports.uploadFile = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }

    // Se diferencia entre los tipos de archivos, usando req.body.fileType
    if (req.body.fileType === 'program') {
      event.programPath = req.file.path; // Guardar la ruta del archivo del programa
    } else if (req.body.fileType === 'agreement') {
      event.agreementPath = req.file.path; // Guardar la ruta del archivo del acuerdo
    } else {
      return res.status(400).json({ error: 'Tipo de archivo no válido.' });
    }
    await event.save();

    res.status(200).json({
      message: 'Archivo subido correctamente.',
      filePath: req.file.path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al subir el archivo.' });
  }
};
