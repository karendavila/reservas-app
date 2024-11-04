// /app/routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const protect = require('../middlewares/authMiddleware'); // Middleware de autenticación

// Renombrar las importaciones para evitar conflictos
const uploadFiles = require('../middlewares/eventFileUploadMiddleware');
const uploadImages = require('../middlewares/eventImageUploadMiddleware');

// Rutas para el CRUD

// Crear un nuevo evento con imagen
router.post(
  '/events',
  protect, // Usar 'protect' en lugar de 'authMiddleware'
  uploadImages.single('imageFile'), // Nombre del campo de imagen en el formulario
  eventController.createEvent
);

// Obtener todos los eventos
router.get('/events', eventController.getAllEvents);

// Obtener un evento por ID
router.get('/events/:eventId', eventController.getEventById);

// Actualizar un evento existente con imagen
router.put(
  '/events/:eventId',
  protect,
  uploadImages.single('imageFile'), // Nombre del campo de imagen en el formulario
  eventController.updateEvent
);

// Eliminar un evento por ID
router.delete('/events/:eventId', protect, eventController.deleteEvent);

// Obtener eventos por usuario
router.get('/my-events', protect, eventController.getEventsByUser);

// Rutas para la subida de archivos después de la creación del evento
router.post(
  '/events/:eventId/upload-files',
  protect, // Asegurar que la ruta esté protegida
  uploadFiles.fields([
    { name: 'programPath', maxCount: 1 },
    { name: 'agreementPath', maxCount: 1 },
  ]),
  eventController.uploadFiles
);

module.exports = router;
