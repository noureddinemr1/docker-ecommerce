const express = require('express');
const cors = require('cors');
const connection = require('./models'); // Import de la connexion MySQL

const app = express();
app.use(cors());
app.use(express.json());

// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(results);  // Renvoie les résultats en JSON
  });
});

// Route pour récupérer tous les produits
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des produits:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(results);  // Renvoie les résultats en JSON
  });
});

// Démarrer le serveur sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
