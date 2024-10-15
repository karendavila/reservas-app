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
exports.uploadFiles = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId); // Buscar evento por ID
    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }

    // Si se subieron los archivos, actualizar las rutas en el modelo
    if (req.files?.programPath) {
      event.programPath = req.files.programPath[0].path;
    }
    if (req.files?.agreementPath) {
      event.agreementPath = req.files.agreementPath[0].path;
    }

    await event.save(); // Guardar cambios en el evento
    res
      .status(200)
      .json({ message: 'Archivos subidos y evento actualizado', event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al subir los archivos.' });
  }
};

// Obtener todos los eventos asociados a un usuario por userId
exports.getEventsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Event.findAll({
      where: { userId }, // Filtrar los eventos por userId
    });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ error: 'No se encontraron eventos para este usuario.' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Error al obtener los eventos del usuario.' });
  }
};
