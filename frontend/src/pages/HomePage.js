import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

import backgroundImage from '../assets/background.jpeg';

const HomePage = () => {
  const { user, role, isAuthenticated } = useSelector(state => {
    console.log('state', state);
    return state.auth;
  }); // Obtener el usuario y su rol del estado global
  console.log('role', role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Si no está autenticado, redirigir al login
    }
  }, [isAuthenticated, navigate]);

  if (!role) {
    // Mientras no se cargue el rol, muestra un indicador de carga o nada
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Header />
      <HeroSection
        title="Bienvenido"
        subtitle="Descubre eventos y salas disponibles"
        backgroundImage={backgroundImage}
      />

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Bienvenido, {user}
        </h1>

        {role === 'admin' ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Panel de Administración
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MenuCard
                title="Gestionar espacios"
                description="Configura y administra los espacios disponibles"
                link="/rooms"
                icon="🏠"
              />
              <MenuCard
                title="Gestionar reservas"
                description="Revisa y gestiona las reservas de los usuarios"
                link="/reservations"
                icon="📑"
              />
              <MenuCard
                title="Consultar usuarios"
                description="Revisa la lista de usuarios registrados"
                link="/users"
                icon="👤"
              />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Panel de Usuario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <MenuCard
                title="Solicitar reserva"
                description="Reserva un espacio para tu evento"
                link="/create-reservation"
                icon="📝"
              />
              <MenuCard
                title="Consultar mis reservas"
                description="Revisa las reservas que has realizado"
                link="/my-reservations"
                icon="🔍"
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

// Componente MenuCard para mostrar cada opción en forma de tarjeta (card)
const MenuCard = ({ title, description, link, icon }) => {
  return (
    <a
      href={link}
      className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform transition-transform hover:-translate-y-1"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </a>
  );
};

export default HomePage;
