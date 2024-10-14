import axios from 'axios';
import { loginSuccess, refreshAccessToken, logout } from './authSlice';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:3000/api'; //  la URL de tu API

// Acción para iniciar sesión
export const login = (email, password) => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    const { token, refreshToken, name, role } = response.data.data;

    // Guardar tokens en localStorage
    localStorage.setItem('user', name);
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('isAuthenticated', true);

    // Actualizar el estado global con Redux
    dispatch(loginSuccess({ user: { name, role }, token, refreshToken }));
    // Mostrar SweetAlert de éxito
    Swal.fire({
      title: 'Inicio de sesión exitoso',
      text: `Bienvenido, ${name}`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    // Mostrar SweetAlert de error
    Swal.fire({
      title: 'Error',
      text: 'El correo o la contraseña son incorrectos',
      icon: 'error',
      confirmButtonText: 'Intentar de nuevo',
    });
  }
};

// Acción para refrescar el token
export const refreshToken = () => async dispatch => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      dispatch(logout());
      localStorage.clear();
      return;
    }

    const response = await axios.post(`${API_URL}/refresh-token`, {
      refreshToken,
    });
    const { token: newToken } = response.data;

    // Guardar el nuevo token en localStorage
    localStorage.setItem('token', newToken);

    // Actualizar el token en el estado global con Redux
    dispatch(refreshAccessToken({ token: newToken }));
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    dispatch(logout());
    localStorage.clear();
  }
};
