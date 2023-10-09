'use client';

import React from 'react'
import "./style.scss";
import Option from "../component/Option/index";
import { useEffect, useState } from 'react';

const Quiz = () => {

   
    const [data, setData] = useState([]); // useState stocker les questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // useState pour la questions afficher (avec toutes ces donné)
    const [questionArrayIndex, setQuestionArrayIndex] = useState(0) // stock le tableau des questions dans la questions afficher
    const [showAnswer, setShowAnswer] = useState(false);
    const [optionSelected, setOptionSelected] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const [questNumber, setQuestNumber] = useState(1);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:4200/api/quiz");
            const jsonData = await response.json();
            setData(jsonData);
            // console.log(jsonData[currentQuestionIndex].questions[questionArrayIndex].options);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();

        return () => {
          // Effet de nettoyage ici
          setData([]); // Réinitialise les données
          setCurrentQuestionIndex(0); // Réinitialise l'index de la question courante
          setQuestionArrayIndex(0); // Réinitialise l'index du tableau des questions
          setShowAnswer(false); // Réinitialise l'affichage de la réponse
          setOptionSelected(null); // Réinitialise l'option sélectionnée
          setQuizFinished(false); // Réinitialise l'état du quiz terminé
          setQuestNumber(1); // Réinitialise le numéro de la question
          setScore(0); // Réinitialise le score
          setUsername(''); // Réinitialise le nom d'utilisateur
          setErrorMessage(null) // Réinitialise le message d'erreur
        };
      }, []);
    
      const currentQuestion = data[currentQuestionIndex];
      const currentOptions = currentQuestion ? currentQuestion.questions[questionArrayIndex]?.options : null;

      const selectOption = (index) => {
        setOptionSelected(index);
        setShowAnswer(true);
        if (index === correctAnswerIndex) {
          setScore(score + 1);
      }
      } 

      // useEffect(() => {
      //   console.log("Option selected:", optionSelected);
      //   console.log(showAnswer);
      // }, [optionSelected]);

      const correctAnswerIndex = currentQuestion ? currentQuestion.questions[questionArrayIndex]?.correctAnswer : null;

      // console.log(correctAnswerIndex);

      const nextQuestion = () => {
        // Réinitialisez l'état pour la prochaine question
        setOptionSelected(null);
        setShowAnswer(false);
    
        // Passez à la question suivante
        if (questionArrayIndex < currentQuestion.questions.length - 1) {
            setQuestionArrayIndex(questionArrayIndex + 1);
            setQuestNumber(questNumber + 1);
          } else if (currentQuestionIndex < data.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setQuestionArrayIndex(0);
            setQuestNumber(questNumber + 1);
        } else {
            // Quiz terminé
            console.log("Quiz terminé");
        }

        if (currentQuestionIndex === data.length - 1 && questionArrayIndex === currentQuestion.questions.length - 1) {
          setQuizFinished(true);
          alert('Quiz terminé');  // Ajoutez cette ligne pour afficher l'alerte
        }

      };

      const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };
      
      // ENVOI DU SCORE
      const submitScore = async () => {
        const payload = {
          name: username,
          score: score
        };
      
        try {
          const response = await fetch("http://localhost:4200/api/participants/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
      
          if (response.ok) {
            // Redirigez l'utilisateur vers la page de classement
            window.location.href = "/ranking";
          } else if (response.status === 400) {
            // Gérer le cas où le pseudo est déjà pris
            setErrorMessage("Ce pseudo est déjà utilisé.");
          } else {
            console.error("Erreur lors de l'envoi du score");
          }
        } catch (err) {
          console.error(err);
        }
      };
      
  return (
    <div className="quizContainer">
        <h1>Question N°{questNumber}</h1>

        {currentQuestion && (
            <>
                <h2>{currentQuestion.questions[questionArrayIndex].question}</h2>

                {currentOptions.map((option, index) => (
                    <Option key={index} index={index} option={option} selectOption={selectOption} isCorrect={showAnswer ? (index === correctAnswerIndex ? true : false) : null} isSelected={index === optionSelected}/>
                ))}
            </>
        )}

        {optionSelected !== null && (
            <button onClick={nextQuestion} className='nextButton'>Suivant</button>
        )}

        {quizFinished && (
            <div className='inputContainer'>
              <div>
                <input type="text" placeholder="Entrez votre pseudo" value={username} onChange={handleUsernameChange} />
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              </div>
                <button onClick={submitScore} className='nextButton'>Envoyer</button>
            </div>
        )}
    </div>
  )
}

export default Quiz