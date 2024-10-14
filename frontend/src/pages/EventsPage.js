import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import AddEventForm from '../components/AddEventForm';
import backgroundImage from '../assets/background.jpeg';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddEventForm, setShowAddEventForm] = useState(false); // State to control form visibility

  // Fetch events from the API
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/events')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data);
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

  const handleAddEvent = () => {
    setShowAddEventForm(true);
  };

  const handleEventCreated = newEvent => {
    // Update the events list with the new event
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    setShowAddEventForm(false);
    // Optionally, display a success message to the user
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
      <div className="container mx-auto my-8">
        <div className="flex justify-between items-center">
          <SearchBar placeholder="Buscar eventos..." onSearch={handleSearch} />
          <button
            onClick={handleAddEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Añadir Evento
          </button>
        </div>
        {showAddEventForm && (
          <AddEventForm onEventCreated={handleEventCreated} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredEvents.map(event => (
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
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;