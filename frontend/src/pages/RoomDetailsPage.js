import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Para obtener el rol del usuario desde Redux
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import UpdateRoomForm from '../components/UpdateRoomForm';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Obtener el rol del usuario desde Redux
  const { role } = useSelector(state => state.auth);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/rooms/${id}`)
      .then(response => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching room:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleRoomUpdated = updatedRoom => {
    setRoom(updatedRoom);
    setShowUpdateForm(false);
  };

  const handleDeleteRoom = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta sala?')) {
      axios
        .delete(`http://localhost:3000/api/rooms/${room.id}`)
        .then(() => {
          // Redirect to rooms list or another appropriate page
          navigate('/rooms');
        })
        .catch(error => {
          console.error('Error deleting room:', error);
          alert('Error al eliminar la sala. Por favor, intente nuevamente.');
        });
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto my-8">
          <p>Cargando sala...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div>
        <Header />
        <div className="container mx-auto my-8">
          <p>Sala no encontrada.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <HeroSection title={room.name} backgroundImage={room.image} />
      <div className="container mx-auto my-8">
        {showUpdateForm ? (
          <UpdateRoomForm room={room} onRoomUpdated={handleRoomUpdated} />
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={room.image || 'https://via.placeholder.com/600x400'}
                  alt={room.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h2 className="text-3xl font-bold mb-4">{room.name}</h2>
                <p className="mb-4">{room.description}</p>
                <ul className="mb-4 space-y-2">
                  <li>
                    <strong>Capacidad:</strong> {room.capacity}
                  </li>
                  <li>
                    <strong>Ubicación:</strong> {room.location}
                  </li>
                  <li>
                    <strong>Encargado:</strong> {room.staffowner}
                  </li>
                </ul>
                {/* Mostrar los botones de "Actualizar" y "Eliminar" solo si el usuario es administrador */}
                {role === 'admin' && (
                  <>
                    <button
                      onClick={handleUpdateClick}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Actualizar Sala
                    </button>
                    <button
                      onClick={handleDeleteRoom}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Eliminar Sala
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RoomDetailsPage;
