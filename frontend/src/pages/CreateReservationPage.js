import React from 'react';
import AddEventForm from '../components/AddEventForm'; // Importar el formulario de creación de eventos
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosInstance from '../axiosConfig'; // Importar axios configurado

const CreateReservationPage = () => {
  // Función para manejar la creación del evento y la subida de archivos
  const handleEventCreated = async (event, programFile, agreementFile) => {
    console.log('Evento creado:', event);

    // Solo sube archivos si hay archivos seleccionados
    if (programFile || agreementFile) {
      const formData = new FormData();
      if (programFile) formData.append('programPath', programFile);
      if (agreementFile) formData.append('agreementPath', agreementFile);

      try {
        const response = await axiosInstance.post(
          `/events/${event.id}/upload-files`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Archivos subidos:', response.data);
      } catch (error) {
        console.error('Error al subir archivos:', error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Solicitar Reserva para Evento
        </h2>
        {/* Pasar la función `handleEventCreated` como prop al formulario */}
        <AddEventForm onEventCreated={handleEventCreated} />
      </div>
      <Footer />
    </div>
  );
};

export default CreateReservationPage;
