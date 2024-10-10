import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import backgroundImage from '../assets/background.jpeg';

const roomsData = [
  {
    id: 1,
    name: 'Room A',
    capacity: '50 people',
    image: 'https://via.placeholder.com/300',
  },
  // Add more rooms as needed
];

const RoomsPage = () => {
  const [rooms, setRooms] = React.useState(roomsData);

  const handleSearch = searchTerm => {
    const filteredRooms = roomsData.filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRooms(filteredRooms);
  };

  return (
    <div>
      <Header />
      <HeroSection
        title="Salas"
        subtitle="Explora las salas disponibles"
        backgroundImage={backgroundImage}
      />
      <div className="container mx-auto my-8">
        <SearchBar placeholder="Search rooms..." onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {rooms.map(room => (
            <div key={room.id} className="border rounded-lg overflow-hidden">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{room.name}</h2>
                <p className="mt-2 text-gray-600">Capacity: {room.capacity}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                  View Details
                </button>
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
