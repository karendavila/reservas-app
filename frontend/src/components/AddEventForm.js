// src/components/AddEventForm.jsx
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
    roomId: '',
  });
  const [programFile, setProgramFile] = useState(null);
  const [agreementFile, setAgreementFile] = useState(null);
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

  const handleFileChange = e => {
    const { name, files } = e.target;
    if (name === 'programFile') {
      setProgramFile(files[0]);
    } else if (name === 'agreementFile') {
      setAgreementFile(files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/events', formData);
      console.log('Evento creado:', response.data);
      // Llamar a la función `onEventCreated` y pasarle los archivos
      onEventCreated(response.data, programFile, agreementFile);
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Error al crear el evento. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Solicitar Reserva
      </h2>
      {error && (
        <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sala y Archivos */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Espacio</h3>
          {/* Sala */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2"></label>
            <select
              name="roomId"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.roomId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un espacio</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Información Básica */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Información Básica
          </h3>

          {/* Nombre del Evento */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Nombre del Evento
            </label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          {/* Capacidad y Costo */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block text-gray-700 font-medium mb-2">
                Capacidad
              </label>
              <input
                type="number"
                name="capacity"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-medium mb-2">
                Costo
              </label>
              <input
                type="text"
                name="cost"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Contacto */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Información de Contacto
            </label>
            <input
              type="text"
              name="contact"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Fechas</h3>
          <div className="flex flex-wrap -mx-2">
            {/* Fecha de Inicio del Evento */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Inicio del Evento
              </label>
              <input
                type="datetime-local"
                name="eventFrom"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.eventFrom}
                onChange={handleChange}
                required
              />
            </div>
            {/* Fecha de Fin del Evento */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Fin del Evento
              </label>
              <input
                type="datetime-local"
                name="eventTo"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.eventTo}
                onChange={handleChange}
                required
              />
            </div>
            {/* Inicio de la Reserva */}
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-medium mb-2">
                Inicio de la Reserva
              </label>
              <input
                type="datetime-local"
                name="reservationFrom"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.reservationFrom}
                onChange={handleChange}
                required
              />
            </div>
            {/* Fin de la Reserva */}
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-gray-700 font-medium mb-2">
                Fin de la Reserva
              </label>
              <input
                type="datetime-local"
                name="reservationTo"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.reservationTo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Botón de Envío */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-200"
          >
            Crear Reserva
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
