const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const protect = require('../middlewares/authMiddleware');
const restrictTo = require('../middlewares/restrictTo');

// Rutas para el modelo Room
router.post('/rooms', protect, restrictTo('admin'), roomController.createRoom);
router.get('/rooms', roomController.getRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.put(
  '/rooms/:id',
  protect,
  restrictTo('admin'),
  roomController.updateRoom
);
router.delete(
  '/rooms/:id',
  protect,
  restrictTo('admin'),
  roomController.deleteRoom
);

module.exports = router;
