// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authActions';
import {
  FaUpload,
  FaEnvelope,
  FaCalendarAlt,
  FaInfoCircle,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    role: 'user', // Valor predeterminado para el rol (usuario)
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Nuevo campo para confirmar la contraseña
    ci: '',
    status: true, // Valor predeterminado para el estado (activo)
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpiar el error al modificar el campo
    setErrors({ ...errors, [name]: '' });

    // Evaluar fortaleza de contraseña si el campo es password
    if (name === 'password') {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const evaluatePasswordStrength = password => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/(?=.*[a-z])/.test(password)) strength += 1;
    if (/(?=.*[A-Z])/.test(password)) strength += 1;
    if (/(?=.*\d)/.test(password)) strength += 1;
    if (/(?=.*[@$!%*?&])/.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        return 'Muy Débil';
      case 2:
        return 'Débil';
      case 3:
        return 'Medio';
      case 4:
        return 'Fuerte';
      case 5:
        return 'Muy Fuerte';
      default:
        return '';
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validar Nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'El nombre solo debe contener letras y espacios.';
    }

    // Validar Correo Electrónico
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    // Validar Contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (
      !/(?=.*[a-z])/.test(formData.password) ||
      !/(?=.*[A-Z])/.test(formData.password) ||
      !/(?=.*\d)/.test(formData.password) ||
      !/(?=.*[@$!%*?&])/.test(formData.password)
    ) {
      newErrors.password =
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&).';
    }

    // Validar Confirmar Contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmación de contraseña es requerida.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    // Validar CI (opcional)
    if (formData.ci) {
      if (!/^\d+$/.test(formData.ci.trim())) {
        newErrors.ci = 'La cédula de identidad solo debe contener números.';
      }
    }

    setErrors(newErrors);

    // Retornar si hay errores
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validate()) {
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
    } else {
      setError('Por favor, corrige los errores en el formulario.');
      setSuccess('');
    }
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
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full border p-2 rounded ${
                errors.name ? 'border-red-500' : ''
              }`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              required
            />
            {errors.name ? (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            ) : (
              <small className="text-gray-500 text-sm mt-1"></small>
            )}
          </div>

          {/* Correo Electrónico */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full border p-2 rounded ${
                errors.email ? 'border-red-500' : ''
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
            />
            {errors.email ? (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            ) : (
              <small className="text-gray-500 text-sm mt-1"></small>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-1 font-semibold">
              Contraseña
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className={`w-full border p-2 rounded ${
                errors.password ? 'border-red-500' : ''
              }`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-10 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordStrength && (
              <small
                className={`text-sm mt-1 ${
                  passwordStrength === 'Muy Débil' ||
                  passwordStrength === 'Débil'
                    ? 'text-red-500'
                    : passwordStrength === 'Medio'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
              >
                {passwordStrength}.
              </small>
            )}
            {errors.password ? (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            ) : (
              <small className="text-gray-500 text-sm mt-1">
                Mínimo 8 caracteres. Debe contener al menos una letra mayúscula,
                una letra minúscula, un número y un carácter especial (@$!%*?&).
              </small>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-semibold"
            >
              Confirmar Contraseña
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={`w-full border p-2 rounded ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="absolute top-10 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label={
                showConfirmPassword
                  ? 'Ocultar contraseña'
                  : 'Mostrar contraseña'
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword ? (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            ) : (
              <small className="text-gray-500 text-sm mt-1"></small>
            )}
          </div>

          {/* Cédula de Identidad */}
          <div className="mb-4">
            <label htmlFor="ci" className="block mb-1 font-semibold">
              Cédula de Identidad (CI)
            </label>
            <input
              type="text"
              id="ci"
              name="ci"
              className={`w-full border p-2 rounded ${
                errors.ci ? 'border-red-500' : ''
              }`}
              value={formData.ci}
              onChange={handleChange}
              placeholder="Ingresa tu cédula de identidad"
            />
            {errors.ci ? (
              <p className="text-red-500 text-sm mt-1">{errors.ci}</p>
            ) : (
              <small className="text-gray-500 text-sm mt-1">
                Solo números.
              </small>
            )}
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
