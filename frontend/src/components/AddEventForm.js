import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const AddEventForm = ({ onEventCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    cost: '',
    contact: '',
    eventFrom: '',
    eventTo: '',
    reservationFrom: '',
    reservationTo: '',
    roomId: '', // The room ID to associate the event with
  });
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);

  // Fetch rooms to populate the dropdown
  useEffect(() => {
    axiosInstance
      .get('/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Set default status if needed
    const data = { ...formData, status: 'pending' };

    axiosInstance
      .post('/events', data)
      .then(response => {
        // Handle success
        console.log('Event created:', response.data);
        onEventCreated(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error creating event:', error);
        setError('Error al crear el evento. Por favor, intente nuevamente.');
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          // Display validation errors
          setError(error.response.data.errors.join(', '));
        }
      });
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Evento</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block">Nombre del Evento</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block">Descripción</label>
          <textarea
            name="description"
            className="w-full border p-2"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Capacity */}
        <div>
          <label className="block">Capacidad</label>
          <input
            type="number"
            name="capacity"
            className="w-full border p-2"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        {/* Cost */}
        <div>
          <label className="block">Costo</label>
          <input
            type="text"
            name="cost"
            className="w-full border p-2"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        {/* Contact */}
        <div>
          <label className="block">Contacto</label>
          <input
            type="text"
            name="contact"
            className="w-full border p-2"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        {/* Event From */}
        <div>
          <label className="block">Inicio del Evento</label>
          <input
            type="datetime-local"
            name="eventFrom"
            className="w-full border p-2"
            value={formData.eventFrom}
            onChange={handleChange}
            required
          />
        </div>
        {/* Event To */}
        <div>
          <label className="block">Fin del Evento</label>
          <input
            type="datetime-local"
            name="eventTo"
            className="w-full border p-2"
            value={formData.eventTo}
            onChange={handleChange}
            required
          />
        </div>
        {/* Reservation From */}
        <div>
          <label className="block">Inicio de la Reserva</label>
          <input
            type="datetime-local"
            name="reservationFrom"
            className="w-full border p-2"
            value={formData.reservationFrom}
            onChange={handleChange}
            required
          />
        </div>
        {/* Reservation To */}
        <div>
          <label className="block">Fin de la Reserva</label>
          <input
            type="datetime-local"
            name="reservationTo"
            className="w-full border p-2"
            value={formData.reservationTo}
            onChange={handleChange}
            required
          />
        </div>
        {/* Room ID */}
        <div>
          <label className="block">Sala</label>
          <select
            name="roomId"
            className="w-full border p-2"
            value={formData.roomId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una sala</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Crear Evento
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
