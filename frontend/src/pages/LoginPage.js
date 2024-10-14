import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authActions';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // If you plan to redirect after login

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
    // // For now, we'll just display the entered data
    // console.log('Login data:', formData);
    // setMessage('Funcionalidad de inicio de sesión aún no implementada.');
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Inicio de Sesión
        </h2>
        {message && <p className="text-blue-500 mb-4 text-center">{message}</p>}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded shadow"
        >
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
          <p className="mt-4 text-center">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
