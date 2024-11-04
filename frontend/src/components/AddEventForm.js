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
  const [imageFile, setImageFile] = useState(null); // Estado para la imagen
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío

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

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImageFile(file);
    // Optional: Implement previsualización si lo deseas
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true); // Iniciar indicador de carga

    const data = new FormData();
    // Agregar los campos del formulario al FormData
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    // Agregar el archivo de imagen
    if (imageFile) {
      data.append('imageFile', imageFile); // Nombre consistente con el backend
    }

    try {
      const response = await axiosInstance.post('/events', data, {
        // Enviar 'data' en lugar de 'formData'
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Evento creado:', response.data);
      // Llamar a la función `onEventCreated` y pasarle los datos del evento
      onEventCreated(response.data);
      // Opcional: Resetear el formulario después de la creación exitosa
      setFormData({
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
      setImageFile(null);
      setError('');
    } catch (error) {
      console.error('Error creating event:', error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.errors?.join(', ') ||
        'Error al crear el evento. Por favor, intente nuevamente.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false); // Finalizar indicador de carga
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
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Sala y Espacio */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Espacio</h3>
          {/* Sala */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Selecciona un Espacio
            </label>
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

        {/* Imagen del Evento */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Imagen del Evento
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Imagen del Evento
            </label>
            <input
              type="file"
              name="imageFile" // Cambiado de 'image' a 'imageFile' para coincidir con el backend
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required // Opcional: Haz que este campo sea obligatorio
            />
          </div>
          {/* Opcional: Previsualización de la Imagen */}
          {imageFile && (
            <div className="mt-4">
              <p className="text-gray-700 font-medium mb-2">
                Previsualización de la Imagen:
              </p>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Previsualización"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Botón de Envío */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-200"
            disabled={isSubmitting} // Deshabilitar el botón mientras se envía
          >
            {isSubmitting ? 'Creando...' : 'Crear Reserva'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
