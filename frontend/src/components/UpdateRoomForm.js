import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const UpdateRoomForm = ({ room, onRoomUpdated }) => {
  const [formData, setFormData] = useState({
    name: room.name,
    description: room.description,
    capacity: room.capacity,
    location: room.location,
    staffowner: room.staffowner,
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axiosInstance
      .put(`/rooms/${room.id}`, formData)
      .then(response => {
        // Handle success
        console.log('Room updated:', response.data);
        onRoomUpdated(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error updating room:', error);
        setError('Error al actualizar la sala. Por favor, intente nuevamente.');
      });
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4">Actualizar Sala</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block">Nombre de la Sala</label>
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
        {/* Location */}
        <div>
          <label className="block">Ubicación</label>
          <input
            type="text"
            name="location"
            className="w-full border p-2"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        {/* Staff Owner */}
        <div>
          <label className="block">Encargado</label>
          <input
            type="text"
            name="staffowner"
            className="w-full border p-2"
            value={formData.staffowner}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default UpdateRoomForm;
