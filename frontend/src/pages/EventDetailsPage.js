import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import UpdateEventForm from '../components/UpdateEventForm';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/events/${id}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching event:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleEventUpdated = updatedEvent => {
    setEvent(updatedEvent);
    setShowUpdateForm(false);
  };

  const handleDeleteEvent = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      axios
        .delete(`http://localhost:3000/api/events/${event.id}`)
        .then(() => {
          // Redirect to events list or another appropriate page
          navigate('/events');
        })
        .catch(error => {
          console.error('Error deleting event:', error);
          alert('Error al eliminar el evento. Por favor, intente nuevamente.');
        });
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto my-8">
          <p>Cargando evento...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        <Header />
        <div className="container mx-auto my-8">
          <p>Evento no encontrado.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <HeroSection title={event.name} backgroundImage={event.image} />
      <div className="container mx-auto my-8">
        {showUpdateForm ? (
          <UpdateEventForm event={event} onEventUpdated={handleEventUpdated} />
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={event.image || 'https://via.placeholder.com/600x400'}
                  alt={event.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h2 className="text-3xl font-bold mb-4">{event.name}</h2>
                <p className="mb-4">{event.description}</p>
                <ul className="mb-4 space-y-2">
                  <li>
                    <strong>Capacidad:</strong> {event.capacity}
                  </li>
                  <li>
                    <strong>Costo:</strong> {event.cost}
                  </li>
                  <li>
                    <strong>Contacto:</strong> {event.contact}
                  </li>
                  <li>
                    <strong>Estado:</strong> {event.status}
                  </li>
                  <li>
                    <strong>Inicio del Evento:</strong>{' '}
                    {new Date(event.eventFrom).toLocaleString()}
                  </li>
                  <li>
                    <strong>Fin del Evento:</strong>{' '}
                    {new Date(event.eventTo).toLocaleString()}
                  </li>
                </ul>
                <button
                  onClick={handleUpdateClick}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Actualizar Evento
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Eliminar Evento
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default EventDetailsPage;
