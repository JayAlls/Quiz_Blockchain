const Quiz = require("../models/questionsModel");

exports.getQuiz = async (req, res) => {
  try {
    const quizData = await Quiz.find();
    res.json(quizData);
  } catch (err) {
    res.status(500).send({ err });
  }
};
