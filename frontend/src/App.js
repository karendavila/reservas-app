import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import CreateReservationPage from './pages/CreateReservationPage';
import UserReservationsPage from './pages/UserReservationsPage';
import AdminReservationsPage from './pages/AdminReservationsPage';
import { useDispatch } from 'react-redux';
import { refreshToken } from './features/auth/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Intentar renovar el token al cargar la app
    dispatch(refreshToken());

    const interval = setInterval(() => {
      // Renovar el token cada 50 minutos (o el tiempo adecuado según tu configuración)
      dispatch(refreshToken());
    }, 50 * 60 * 1000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/rooms/:id" element={<RoomDetailsPage />} />
      <Route path="/create-reservation" element={<CreateReservationPage />} />
      <Route path="/my-reservations" element={<UserReservationsPage />} />
      <Route path="/admin/reservations" element={<AdminReservationsPage />} />
    </Routes>
  );
}

export default App;
