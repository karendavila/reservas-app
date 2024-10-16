import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminReservationsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploadingAgreementId, setUploadingAgreementId] = useState(null);
  const [agreementFile, setAgreementFile] = useState(null);

  // Obtener los eventos desde la API
  useEffect(() => {
    axiosInstance
      .get('/events') // Llamada al endpoint de eventos
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setError('Error al obtener los eventos.');
        setLoading(false);
      });
  }, []);

  // Manejar el cambio de archivo para el contrato
  const handleAgreementFileChange = event => {
    setAgreementFile(event.target.files[0]);
  };

  // Manejar la subida del archivo de contrato
  const handleUploadAgreement = eventId => {
    if (!agreementFile) return;

    const formData = new FormData();
    formData.append('agreementPath', agreementFile);

    axiosInstance
      .post(`/events/${eventId}/upload-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        alert('Contrato subido exitosamente.');
        setUploadingAgreementId(null); // Limpiar el estado después de subir
        // Refrescar los datos para mostrar el nuevo archivo
        axiosInstance.get('/events').then(response => {
          setEvents(response.data);
        });
      })
      .catch(error => {
        console.error('Error al subir el contrato:', error);
        alert('Error al subir el contrato. Intente nuevamente.');
      });
  };

  // Función para actualizar el estado del evento
  const handleUpdateStatus = (eventId, newStatus) => {
    if (
      window.confirm(`¿Estás seguro de que deseas ${newStatus} este evento?`)
    ) {
      axiosInstance
        .put(`/events/${eventId}`, { status: newStatus })
        .then(response => {
          // Actualiza el estado del evento en la lista
          setEvents(
            events.map(event =>
              event.id === eventId ? { ...event, status: newStatus } : event
            )
          );
        })
        .catch(error => {
          console.error('Error updating event status:', error);
          alert(
            'Error al actualizar el estado del evento. Por favor, intente nuevamente.'
          );
        });
    }
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
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Administrar Eventos
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Descripción</th>
                  <th className="py-3 px-6 text-left">Comentarios</th>
                  <th className="py-3 px-6 text-left">Capacidad</th>
                  <th className="py-3 px-6 text-left">Costo</th>
                  <th className="py-3 px-6 text-left">Contacto</th>
                  <th className="py-3 px-6 text-left">Fecha del Evento</th>
                  <th className="py-3 px-6 text-left">Reserva Desde - Hasta</th>
                  <th className="py-3 px-6 text-left">Estado</th>
                  <th className="py-3 px-6 text-left">Programa</th>
                  <th className="py-3 px-6 text-left">Contrato</th>
                  <th className="py-3 px-6 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-b">
                    <td className="py-3 px-6">{event.id}</td>
                    <td className="py-3 px-6">{event.name}</td>
                    <td className="py-3 px-6">{event.description}</td>
                    <td className="py-3 px-6">{event.comments || 'N/A'}</td>
                    <td className="py-3 px-6">{event.capacity}</td>
                    <td className="py-3 px-6">{event.cost}</td>
                    <td className="py-3 px-6">{event.contact}</td>
                    <td className="py-3 px-6">
                      {new Date(event.eventFrom).toLocaleString()} -{' '}
                      {new Date(event.eventTo).toLocaleString()}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(event.reservationFrom).toLocaleString()} -{' '}
                      {new Date(event.reservationTo).toLocaleString()}
                    </td>
                    <td className="py-3 px-6">{event.status}</td>
                    {/* Programa */}
                    <td className="py-3 px-6">
                      {event.programPath ? (
                        <a
                          href={`http://localhost:3000/${event.programPath}`} // Ajusta la URL al puerto del backend
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Ver Programa
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    {/* Contrato */}
                    <td className="py-3 px-6">
                      {event.agreementPath ? (
                        <a
                          href={`http://localhost:3000/${event.agreementPath}`} // Ajusta la URL al puerto del backend
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Ver Contrato
                        </a>
                      ) : (
                        <>
                          {uploadingAgreementId === event.id ? (
                            <div>
                              <input
                                type="file"
                                onChange={handleAgreementFileChange}
                              />
                              <button
                                onClick={() => handleUploadAgreement(event.id)}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                              >
                                Subir Contrato
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setUploadingAgreementId(event.id)}
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                              Cargar Contrato
                            </button>
                          )}
                        </>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleUpdateStatus(event.id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(event.id, 'denied')}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Denegar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No hay eventos disponibles.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminReservationsPage;
