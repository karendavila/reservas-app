import React from 'react';
import ReservationRequestForm from '../components/ReservationRequestForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreateReservationPage = () => {
  const handleRequestCreated = request => {
    // Optionally handle after a request is created
    console.log('Reservation request created:', request);
  };

  return (
    <div>
      <Header />
      <ReservationRequestForm onRequestCreated={handleRequestCreated} />
      <Footer />
    </div>
  );
};

export default CreateReservationPage;
