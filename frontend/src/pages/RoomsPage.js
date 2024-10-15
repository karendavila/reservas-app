import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Para obtener el rol del usuario desde Redux
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import AddRoomForm from '../components/AddRoomForm';
import backgroundImage from '../assets/background.jpeg';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);

  // Obtener el rol del usuario desde Redux
  const { role } = useSelector(state => state.auth);

  // Fetch rooms from the backend API
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/rooms')
      .then(response => {
        setRooms(response.data);
        setFilteredRooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = searchTerm => {
    const filtered = rooms.filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleAddRoom = () => {
    setShowAddRoomForm(true);
  };

  const handleRoomCreated = newRoom => {
    // Update the rooms list with the new room
    const updatedRooms = [...rooms, newRoom];
    setRooms(updatedRooms);
    setFilteredRooms(updatedRooms);
    setShowAddRoomForm(false);
    // Optionally, display a success message to the user
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto my-8">
          <p>Cargando salas...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <HeroSection
        title="Salas"
        subtitle="Explora las salas disponibles"
        backgroundImage={backgroundImage}
      />
      <div className="container mx-auto my-8">
        <div className="flex justify-between items-center">
          <SearchBar placeholder="Buscar salas..." onSearch={handleSearch} />

          {/* Mostrar el botón de "Añadir Sala" solo si el usuario es administrador */}
          {role === 'admin' && (
            <button
              onClick={handleAddRoom}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Añadir Sala
            </button>
          )}
        </div>

        {/* Formulario para añadir salas */}
        {showAddRoomForm && <AddRoomForm onRoomCreated={handleRoomCreated} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredRooms.map(room => (
            <div key={room.id} className="border rounded-lg overflow-hidden">
              <img
                src={room.image || 'https://via.placeholder.com/600x400'}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{room.name}</h2>
                <p className="mt-2 text-gray-600">{room.description}</p>
                <Link
                  to={`/rooms/${room.id}`}
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

export default RoomsPage;
