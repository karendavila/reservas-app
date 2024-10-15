import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Importar Redux hooks
import { logoutUser } from '../features/auth/authActions'; // Acción de cerrar sesión

import ucvlogo from '../assets/ucvlogo1.png'; // Update the path to your logo

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener datos del usuario y autenticación del estado de Redux
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login'); // Redirigir al login después del logout
  };

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={ucvlogo} alt="Logo" className="h-10 mr-2" />
          <span className="text-white text-xl font-bold">UCV Events</span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/home" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/events" className="text-white hover:text-gray-300">
            Events
          </Link>
          <Link to="/rooms" className="text-white hover:text-gray-300">
            Rooms
          </Link>

          {/* Mostrar el nombre del usuario si está autenticado o el botón de Login */}
          {isAuthenticated ? (
            <>
              <span className="text-white">Bienvenido, {user}</span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 ml-4"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700">
          <Link
            to="/home"
            className="block px-4 py-2 text-white hover:bg-blue-600"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block px-4 py-2 text-white hover:bg-blue-600"
          >
            Events
          </Link>
          <Link
            to="/rooms"
            className="block px-4 py-2 text-white hover:bg-blue-600"
          >
            Rooms
          </Link>

          {/* Mostrar el nombre del usuario o el botón de Login en el menú móvil */}
          {isAuthenticated ? (
            <>
              <span className="text-white">Bienvenido, {user}</span>{' '}
              {/* user debe ser solo el nombre */}
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 ml-4"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
