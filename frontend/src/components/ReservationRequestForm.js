import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const ReservationRequestForm = ({ onRequestCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    comments: '',
    capacity: '',
    cost: '',
    contact: '',
    eventFrom: '',
    eventTo: '',
    reservationFrom: '',
    reservationTo: '',
    programFile: null, // For uploading the program file
    agreementFile: null, // For uploading the agreement file
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Create form data for file upload
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('comments', formData.comments);
      data.append('capacity', formData.capacity);
      data.append('cost', formData.cost);
      data.append('contact', formData.contact);
      data.append('eventFrom', formData.eventFrom);
      data.append('eventTo', formData.eventTo);
      data.append('reservationFrom', formData.reservationFrom);
      data.append('reservationTo', formData.reservationTo);
      // Set default status to 'pending'
      data.append('status', 'pending');
      // Append files if they exist
      if (formData.programFile) {
        data.append('programFile', formData.programFile);
      }
      if (formData.agreementFile) {
        data.append('agreementFile', formData.agreementFile);
      }

      // Send POST request to create the reservation request
      const response = await axiosInstance.post('/reservations', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success
      console.log('Reservation request created:', response.data);
      setSuccess('Solicitud de reserva creada exitosamente.');
      setError('');
      if (onRequestCreated) {
        onRequestCreated(response.data);
      }

      // Clear the form
      setFormData({
        name: '',
        description: '',
        comments: '',
        capacity: '',
        cost: '',
        contact: '',
        eventFrom: '',
        eventTo: '',
        reservationFrom: '',
        reservationTo: '',
        programFile: null,
        agreementFile: null,
      });
    } catch (error) {
      // Handle error
      console.error('Error creating reservation request:', error);
      setError(
        error.response?.data?.error ||
          'Error al crear la solicitud de reserva. Por favor, intente nuevamente.'
      );
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Crear Solicitud de Reserva
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded shadow"
        encType="multipart/form-data"
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nombre del Evento</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Descripción</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Comments */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Comentarios</label>
          <textarea
            name="comments"
            className="w-full border p-2 rounded"
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Capacity */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Capacidad</label>
          <input
            type="number"
            name="capacity"
            className="w-full border p-2 rounded"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        {/* Cost */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Costo</label>
          <input
            type="text"
            name="cost"
            className="w-full border p-2 rounded"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        {/* Contact */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Contacto</label>
          <input
            type="text"
            name="contact"
            className="w-full border p-2 rounded"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        {/* Event From */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Inicio del Evento</label>
          <input
            type="datetime-local"
            name="eventFrom"
            className="w-full border p-2 rounded"
            value={formData.eventFrom}
            onChange={handleChange}
            required
          />
        </div>
        {/* Event To */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Fin del Evento</label>
          <input
            type="datetime-local"
            name="eventTo"
            className="w-full border p-2 rounded"
            value={formData.eventTo}
            onChange={handleChange}
            required
          />
        </div>
        {/* Reservation From */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Inicio de la Reserva
          </label>
          <input
            type="datetime-local"
            name="reservationFrom"
            className="w-full border p-2 rounded"
            value={formData.reservationFrom}
            onChange={handleChange}
            required
          />
        </div>
        {/* Reservation To */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Fin de la Reserva</label>
          <input
            type="datetime-local"
            name="reservationTo"
            className="w-full border p-2 rounded"
            value={formData.reservationTo}
            onChange={handleChange}
            required
          />
        </div>
        {/* Program File */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Archivo del Programa
          </label>
          <input
            type="file"
            name="programFile"
            className="w-full"
            onChange={handleChange}
          />
        </div>
        {/* Agreement File */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Archivo del Contrato
          </label>
          <input
            type="file"
            name="agreementFile"
            className="w-full"
            onChange={handleChange}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
};

export default ReservationRequestForm;
