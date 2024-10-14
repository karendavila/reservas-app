import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/reservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        setError('Error al obtener las reservas.');
      });
  }, []);

  // Aquí es donde debes colocar la función handleUpdateStatus
  const handleUpdateStatus = (reservationId, newStatus) => {
    if (
      window.confirm(`¿Estás seguro de que deseas ${newStatus} esta reserva?`)
    ) {
      axios
        .put(`http://localhost:3000/api/reservations/${reservationId}`, {
          status: newStatus,
        })
        .then(response => {
          // Actualiza la reserva en el estado
          setReservations(
            reservations.map(reservation =>
              reservation.id === reservationId
                ? { ...reservation, status: newStatus }
                : reservation
            )
          );
        })
        .catch(error => {
          console.error('Error updating reservation status:', error);
          alert(
            'Error al actualizar el estado de la reserva. Por favor, intente nuevamente.'
          );
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Todas las Reservas
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {reservations.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre del Evento</th>
                <th className="py-2 px-4 border-b">Usuario</th>
                <th className="py-2 px-4 border-b">Fecha del Evento</th>
                <th className="py-2 px-4 border-b">Estado</th>
                {/* Otras columnas si es necesario */}
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td className="py-2 px-4 border-b">{reservation.id}</td>
                  <td className="py-2 px-4 border-b">{reservation.name}</td>
                  <td className="py-2 px-4 border-b">
                    {reservation.user?.name || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(reservation.eventFrom).toLocaleString()} -{' '}
                    {new Date(reservation.eventTo).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{reservation.status}</td>
                  {/* Acciones */}
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() =>
                        handleUpdateStatus(reservation.id, 'approved')
                      }
                      className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(reservation.id, 'denied')
                      }
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Denegar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No hay reservas.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminReservationsPage;
