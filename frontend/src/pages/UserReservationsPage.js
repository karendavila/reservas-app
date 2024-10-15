import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserReservationsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  // Obtener el userId desde el estado global (Redux)
  const { userId } = useSelector(state => state.auth);

  useEffect(() => {
    if (!userId) return;

    axiosInstance
      .get(`/users/${userId}/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        setError('Error al obtener las reservas.');
      });
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Mis Reservas</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {events.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre del Evento</th>
                <th className="py-2 px-4 border-b">Fecha del Evento</th>
                <th className="py-2 px-4 border-b">Estado</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.eventFrom).toLocaleString()} -{' '}
                    {new Date(event.eventTo).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{event.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No tienes reservas.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserReservationsPage;
