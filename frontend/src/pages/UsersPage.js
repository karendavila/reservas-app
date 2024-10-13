// src/pages/UsersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UpdateUserForm from '../components/UpdateUserForm';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For updating a user
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch users from the backend API
    axios
      .get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Error al obtener los usuarios.');
      });
  }, []);

  const handleDeleteUser = userId => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      axios
        .delete(`http://localhost:3000/api/users/${userId}`)
        .then(() => {
          // Remove user from list
          setUsers(users.filter(user => user.id !== userId));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          alert('Error al eliminar el usuario. Por favor, intente nuevamente.');
        });
    }
  };

  const handleUpdateUser = user => {
    setSelectedUser(user);
  };

  const handleUserUpdated = updatedUser => {
    // Update the user in the list
    setUsers(
      users.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null); // Close the update form
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {selectedUser ? (
          <UpdateUserForm
            user={selectedUser}
            onUserUpdated={handleUserUpdated}
          />
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Correo Electrónico</th>
                <th className="py-2 px-4 border-b">Rol</th>
                <th className="py-2 px-4 border-b">CI</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.ci || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    {user.status ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleUpdateUser(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UsersPage;
