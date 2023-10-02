require('dotenv').config();  // Ajout de cette ligne pour charger les variables d'environnement

const express = require("express");
const mongoose = require("mongoose");
const quizRoutes = require('./routes/quizRoute');
const participantRoutes = require('./routes/participantRoute');

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })  // Utilisation de la variable d'environnement
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utilisation des routes
app.use('/api/quiz', quizRoutes);
app.use('/api/participants', participantRoutes);

// Middleware de gestion des erreurs (optionnel)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
