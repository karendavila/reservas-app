const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const protect = require('../middlewares/authMiddleware'); // Middleware de autenticación

const upload = require('../middlewares/eventFileUploadMiddleware');

// Rutas para el CRUD
router.post('/events', protect, eventController.createEvent); // Crear un evento
router.get('/events', eventController.getAllEvents); // Obtener todos los eventos
router.get('/events/:eventId', eventController.getEventById); // Obtener un evento por ID
router.put('/events/:eventId', protect, eventController.updateEvent); // Actualizar un evento por ID
router.delete('/events/:eventId', protect, eventController.deleteEvent); // Eliminar un evento por ID
router.get('/my-events', protect, eventController.getEventsByUser); // Obtener eventos por usuario

// Rutas para la subida de archivos después de la creación del evento
router.post(
  '/events/:eventId/upload-files',
  upload.fields([
    { name: 'programPath', maxCount: 1 },
    { name: 'agreementPath', maxCount: 1 },
  ]),
  eventController.uploadFiles
);

module.exports = router;
