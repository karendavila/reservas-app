const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middlewares/eventFileUploadMiddleware');

// Rutas para el CRUD
router.post('/events', eventController.createEvent); // Crear un evento
router.get('/events', eventController.getAllEvents); // Obtener todos los eventos
router.get('/events/:eventId', eventController.getEventById); // Obtener un evento por ID
router.put('/events/:eventId', eventController.updateEvent); // Actualizar un evento por ID
router.delete('/events/:eventId', eventController.deleteEvent); // Eliminar un evento por ID

// Ruta para subir un archivo
router.post(
  '/events/:eventId/upload-file',
  upload.single('file'),
  eventController.uploadFile
);

module.exports = router;
