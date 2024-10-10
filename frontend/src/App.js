import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import RoomsPage from './pages/RoomsPage';
import HomePage from './pages/HomePage'; // We'll create this next

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
