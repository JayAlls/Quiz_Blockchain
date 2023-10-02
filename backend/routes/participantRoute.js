const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController");

router.post('/submit', participantController.submitAnswers);
router.get('/ranking', participantController.getRanking);

module.exports = router;
