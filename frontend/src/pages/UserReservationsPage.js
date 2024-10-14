import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Replace with actual user ID or token-based authentication
    const userId = 1; // This should come from authentication context

    axios
      .get(`http://localhost:3000/api/users/${userId}/reservations`)
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        setError('Error al obtener las reservas.');
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Mis Reservas</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {reservations.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre del Evento</th>
                <th className="py-2 px-4 border-b">Fecha del Evento</th>
                <th className="py-2 px-4 border-b">Estado</th>
                {/* Add other columns as needed */}
              </tr>
            </thead>
            <tbody>
              {reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td className="py-2 px-4 border-b">{reservation.name}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(reservation.eventFrom).toLocaleString()} -{' '}
                    {new Date(reservation.eventTo).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{reservation.status}</td>
                  {/* Add other fields as needed */}
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
