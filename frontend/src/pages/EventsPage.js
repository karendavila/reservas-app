// src/pages/EventsPage.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Para obtener el rol del usuario desde Redux
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import backgroundImage from '../assets/ucvfondo.jpg';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener el rol del usuario desde Redux
  const { role } = useSelector(state => state.auth);

  // Obtener eventos de la API y filtrar solo los eventos aprobados
  useEffect(() => {
    axiosInstance
      .get('/events')
      .then(response => {
        // Filtrar solo los eventos con estado "approved"
        const approvedEvents = response.data.filter(
          event => event.status === 'approved'
        );
        setEvents(approvedEvents);
        setFilteredEvents(approvedEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = searchTerm => {
    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto my-8">
          <p>Cargando eventos...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <HeroSection
        title="Eventos"
        subtitle="Descubre los próximos eventos"
        backgroundImage={backgroundImage}
      />
      <div className="container mx-auto my-8 px-4">
        <div className="flex justify-between items-center">
          <SearchBar placeholder="Buscar eventos..." onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div key={event.id} className="border rounded-lg overflow-hidden">
                <img
                  src={event.image || 'https://via.placeholder.com/600x400'}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{event.name}</h2>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                  <Link
                    to={`/events/${event.id}`}
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No se encontraron eventos.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
