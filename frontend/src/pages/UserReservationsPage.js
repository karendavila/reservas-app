// src/pages/UserReservationsPage.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import {
  FaUpload,
  FaEnvelope,
  FaCalendarAlt,
  FaInfoCircle,
} from 'react-icons/fa';
import Modal from '../components/Modal';

const UserReservationsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState('');
  const [uploadingProgramId, setUploadingProgramId] = useState(null);
  const [programFile, setProgramFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados para los modales
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedEventContact, setSelectedEventContact] = useState('');
  const [showEventDateModal, setShowEventDateModal] = useState(false);
  const [selectedEventDates, setSelectedEventDates] = useState({});
  const [showReservationDateModal, setShowReservationDateModal] =
    useState(false);
  const [selectedReservationDates, setSelectedReservationDates] = useState({});
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/my-events`)
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        setError('Error al obtener las reservas.');
        setLoading(false);
      });
  }, []);

  // Manejar el cambio en el término de búsqueda
  const handleSearch = term => {
    setSearchTerm(term);

    const filtered = events.filter(event => {
      const lowerCaseTerm = term.toLowerCase();
      const searchableFields =
        `${event.name} ${event.description}`.toLowerCase();

      return searchableFields.includes(lowerCaseTerm);
    });

    setFilteredEvents(filtered);
  };

  // Manejar el cambio de archivo para el programa
  const handleProgramFileChange = event => {
    setProgramFile(event.target.files[0]);
  };

  // Manejar la subida del archivo del programa
  const handleUploadProgram = eventId => {
    if (!programFile) return;

    const formData = new FormData();
    formData.append('programPath', programFile);

    axiosInstance
      .post(`/events/${eventId}/upload-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        alert('Programa subido exitosamente.');
        setUploadingProgramId(null);
        setProgramFile(null);
        // Refrescar los datos para mostrar el nuevo archivo
        axiosInstance.get(`/my-events`).then(response => {
          setEvents(response.data);
          setFilteredEvents(response.data);
        });
      })
      .catch(error => {
        console.error('Error al subir el programa:', error);
        alert('Error al subir el programa. Intente nuevamente.');
      });
  };

  // Funciones para manejar los modales
  const handleShowContact = contactInfo => {
    setSelectedEventContact(contactInfo);
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setSelectedEventContact('');
  };

  const handleShowEventDate = eventDates => {
    setSelectedEventDates(eventDates);
    setShowEventDateModal(true);
  };

  const handleCloseEventDateModal = () => {
    setShowEventDateModal(false);
    setSelectedEventDates({});
  };

  const handleShowReservationDate = reservationDates => {
    setSelectedReservationDates(reservationDates);
    setShowReservationDateModal(true);
  };

  const handleCloseReservationDateModal = () => {
    setShowReservationDateModal(false);
    setSelectedReservationDates({});
  };

  const handleShowDescription = description => {
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
    setSelectedDescription('');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto my-8">
          <p>Cargando reservas...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Mis Reservas
        </h2>
        {/* Agregar el SearchBar */}
        <div className="mb-4">
          <SearchBar placeholder="Buscar reservas..." onSearch={handleSearch} />
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {filteredEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Descripción</th>
                  <th className="py-3 px-6 text-left">Capacidad</th>
                  <th className="py-3 px-6 text-left">Costo</th>
                  <th className="py-3 px-6 text-left">Contacto</th>
                  <th className="py-3 px-6 text-left">Fecha del Evento</th>
                  <th className="py-3 px-6 text-left">Reserva</th>
                  <th className="py-3 px-6 text-left">Estado</th>
                  <th className="py-3 px-6 text-left">Programa</th>
                  <th className="py-3 px-6 text-left">Contrato</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr
                    key={event.id}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    } hover:bg-gray-200 transition-colors`}
                  >
                    <td className="py-3 px-6 font-semibold text-gray-800">
                      {event.name}
                    </td>
                    {/* Mostrar icono en lugar de descripción */}
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleShowDescription(event.description)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaInfoCircle size={20} />
                      </button>
                    </td>
                    <td className="py-3 px-6">{event.capacity}</td>
                    <td className="py-3 px-6">{event.cost}</td>
                    {/* Mostrar icono en lugar de contacto */}
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleShowContact(event.contact)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEnvelope size={20} />
                      </button>
                    </td>
                    {/* Fecha del Evento */}
                    <td className="py-3 px-6">
                      <button
                        onClick={() =>
                          handleShowEventDate({
                            eventFrom: event.eventFrom,
                            eventTo: event.eventTo,
                          })
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaCalendarAlt size={20} />
                      </button>
                    </td>
                    {/* Reserva */}
                    <td className="py-3 px-6">
                      <button
                        onClick={() =>
                          handleShowReservationDate({
                            reservationFrom: event.reservationFrom,
                            reservationTo: event.reservationTo,
                          })
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaCalendarAlt size={20} />
                      </button>
                    </td>
                    {/* Estado */}
                    <td className="py-3 px-6">
                      {event.status === 'approved'
                        ? 'Aprobado'
                        : event.status === 'denied'
                        ? 'Denegado'
                        : 'Pendiente'}
                    </td>
                    {/* Programa */}
                    <td className="py-3 px-6">
                      {event.programPath ? (
                        <a
                          href={`http://localhost:3000/${event.programPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Ver
                        </a>
                      ) : (
                        <>
                          {uploadingProgramId === event.id ? (
                            <div className="flex items-center">
                              <input
                                type="file"
                                onChange={handleProgramFileChange}
                                className="text-sm"
                              />
                              <button
                                onClick={() => handleUploadProgram(event.id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded ml-2 text-sm"
                              >
                                Subir
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setUploadingProgramId(event.id)}
                              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                            >
                              <FaUpload className="mr-1" /> Cargar
                            </button>
                          )}
                        </>
                      )}
                    </td>
                    {/* Contrato */}
                    <td className="py-3 px-6">
                      {event.agreementPath ? (
                        <a
                          href={`http://localhost:3000/${event.agreementPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Ver
                        </a>
                      ) : (
                        'No disponible'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No tienes reservas.</p>
        )}
      </div>
      <Footer />
      {/* Modal para mostrar el contacto */}
      {showContactModal && (
        <Modal onClose={handleCloseContactModal}>
          <h2 className="text-xl font-bold mb-4">Información de Contacto</h2>
          <p>{selectedEventContact}</p>
          <button
            onClick={handleCloseContactModal}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </Modal>
      )}
      {/* Modal para mostrar la Fecha del Evento */}
      {showEventDateModal && (
        <Modal onClose={handleCloseEventDateModal}>
          <h2 className="text-xl font-bold mb-4">Fecha del Evento</h2>
          <p>
            Desde: {new Date(selectedEventDates.eventFrom).toLocaleString()}
          </p>
          <p>Hasta: {new Date(selectedEventDates.eventTo).toLocaleString()}</p>
          <button
            onClick={handleCloseEventDateModal}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </Modal>
      )}
      {/* Modal para mostrar la Fecha de Reserva */}
      {showReservationDateModal && (
        <Modal onClose={handleCloseReservationDateModal}>
          <h2 className="text-xl font-bold mb-4">Fecha de Reserva</h2>
          <p>
            Desde:{' '}
            {new Date(
              selectedReservationDates.reservationFrom
            ).toLocaleString()}
          </p>
          <p>
            Hasta:{' '}
            {new Date(selectedReservationDates.reservationTo).toLocaleString()}
          </p>
          <button
            onClick={handleCloseReservationDateModal}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </Modal>
      )}
      {/* Modal para mostrar la Descripción */}
      {showDescriptionModal && (
        <Modal onClose={handleCloseDescriptionModal}>
          <h2 className="text-xl font-bold mb-4">Descripción del Evento</h2>
          <p>{selectedDescription}</p>
          <button
            onClick={handleCloseDescriptionModal}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </Modal>
      )}
    </div>
  );
};

export default UserReservationsPage;
