import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import backgroundImage from '../assets/background.jpeg';

const eventsData = [
  {
    id: 1,
    title: 'Event 1',
    description: 'Description of Event 1',
    image: 'https://via.placeholder.com/300',
  },
  // Add more events as needed
];

const EventsPage = () => {
  const [events, setEvents] = React.useState(eventsData);

  const handleSearch = searchTerm => {
    const filteredEvents = eventsData.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  return (
    <div>
      <Header />
      <HeroSection
        title="Eventos"
        subtitle="Descubre los próximos eventos"
        backgroundImage={backgroundImage}
      />
      <div className="container mx-auto my-8">
        <SearchBar placeholder="Search events..." onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {events.map(event => (
            <div key={event.id} className="border rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p className="mt-2 text-gray-600">{event.description}</p>
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

export default EventsPage;
