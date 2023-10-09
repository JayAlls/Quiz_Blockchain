const Participant = require("../models/participantsModel");

// Soumettre les réponses d'un participant et enregistrer le score
exports.submitAnswers = async (req, res) => {
  try {
    // Vérifier si le pseudo existe déjà
    const existingParticipant = await Participant.findOne({ name: req.body.name });
    if (existingParticipant) {
      return res.status(400).send("Ce pseudo est déjà utilisé.");
    }

    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).send(participant);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// Récupérer le classement des participants
exports.getRanking = async (req, res) => {
  try {
    const ranking = await Participant.find().sort({ score: -1 });
    res.json(ranking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
