// src/App.js
import React, { useEffect, useState } from 'react';
import './index.css';

const App = () => {
  // Déclarez un état pour les utilisateurs, le chargement et les erreurs
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Utilisez useEffect pour effectuer la requête lorsque le composant se charge
  useEffect(() => {
    // Effectue une requête HTTP pour récupérer les utilisateurs depuis le backend
    fetch('http://localhost:5000/users')  // Assurez-vous que l'URL est correcte
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);  // Stocke les données des utilisateurs
        setLoading(false);  // Met à jour l'état de chargement
      })
      .catch((error) => {
        setError(error.message);  // Enregistre l'erreur en cas de problème
        setLoading(false);  // Met à jour l'état de chargement
      });
  }, []);  // Le tableau vide [] signifie que l'effet se lance une seule fois lors du montage du composant

  // Affiche un message pendant que les données sont en cours de chargement
  if (loading) return <div>Loading...</div>;

  // Affiche un message d'erreur si une erreur s'est produite
  if (error) return <div>Error: {error}</div>;

  // Affiche la liste des utilisateurs une fois les données chargées
  return (
    <div className="app-container">
      <h1>Bienvenue sur notre boutique en ligne</h1>
      <p>Découvrez nos produits exclusifs!</p>
      <button>Commencer</button>

      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>  
        ))}
      </ul>
    </div>
  );
};

export default App;
