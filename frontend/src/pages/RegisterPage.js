import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authActions';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    role: 'user', // Valor predeterminado para el rol (usuario)
    name: '',
    email: '',
    password: '',
    ci: '',
    status: true, // Valor predeterminado para el estado (activo)
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Enviar la solicitud POST a la API backend para crear un nuevo usuario
    axiosInstance
      .post('/users', formData)
      .then(response => {
        console.log('Usuario registrado:', response.data);
        // Mostrar SweetAlert de éxito
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Tu cuenta ha sido creada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Continuar',
        }).then(() => {
          // Autenticar al usuario automáticamente y redirigir
          dispatch(login(formData.email, formData.password, navigate));
        });
      })
      .catch(error => {
        // Manejar error
        console.error('Error al registrar el usuario:', error);
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
