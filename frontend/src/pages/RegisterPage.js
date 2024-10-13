// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    role: 'user', // Default role
    name: '',
    email: '',
    password: '',
    ci: '',
    status: true, // Default status
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Send a POST request to your backend API to create a new user
    axios
      .post('http://localhost:3000/api/users', formData)
      .then(response => {
        // Handle success
        console.log('User registered:', response.data);
        setSuccess('Usuario registrado exitosamente.');
        setError('');
        // Clear the form
        setFormData({
          role: 'user',
          name: '',
          email: '',
          password: '',
          ci: '',
          status: true,
        });
      })
      .catch(error => {
        // Handle error
        console.error('Error registering user:', error);
        setError(
          error.response?.data?.error ||
            'Error al registrar el usuario. Por favor, intente nuevamente.'
        );
        setSuccess('');
      });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">{success}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded shadow"
        >
          {/* Role */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Rol</label>
            <select
              name="role"
              className="w-full border p-2 rounded"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nombre</label>
            <input
              type="text"
              name="name"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Contraseña</label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* CI */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">CI</label>
            <input
              type="text"
              name="ci"
              className="w-full border p-2 rounded"
              value={formData.ci}
              onChange={handleChange}
            />
          </div>
          {/* Status */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-semibold">
              {formData.status ? 'Activo' : 'Inactivo'}
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Registrarse
          </button>
          <p className="mt-4 text-center">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Inicia Sesión
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
