import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserReservationsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/my-events`)
      .then(response => {
        setEvents(response.data);
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
        {events.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre del Evento</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Capacidad</th>
                <th className="py-2 px-4 border-b">Costo</th>
                <th className="py-2 px-4 border-b">Contacto</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Inicio del Evento</th>
                <th className="py-2 px-4 border-b">Fin del Evento</th>
                <th className="py-2 px-4 border-b">Inicio de la Reserva</th>
                <th className="py-2 px-4 border-b">Fin de la Reserva</th>
                <th className="py-2 px-4 border-b">Fecha de Creación</th>
                <th className="py-2 px-4 border-b">Ruta del Programa</th>
                {/* Omitiendo el campo de contrato */}
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">{event.description}</td>
                  <td className="py-2 px-4 border-b">{event.capacity}</td>
                  <td className="py-2 px-4 border-b">{event.cost}</td>
                  <td className="py-2 px-4 border-b">{event.contact}</td>
                  <td className="py-2 px-4 border-b">{event.status}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.eventFrom).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.eventTo).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.reservationFrom).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.reservationTo).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(event.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {event.programPath ? (
                      <a
                        href={event.programPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Ver Programa
                      </a>
                    ) : (
                      'No disponible'
                    )}
                  </td>
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
