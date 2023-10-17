'use client';

import "./style.scss";
import React, { useEffect } from 'react';
import { useState } from 'react';

const Ranking = () => {

  const [ranking, setRanking] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch("https://quiz-blockchain.onrender.com/api/participants/ranking");
        const jsonData = await response.json();
        setRanking(jsonData);
        console.log(jsonData)
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [])
  const returnHome = () => {
    window.location.href = "/"
  }
  return (
    <div className="ranking">
        <h1 className="text-center">Classement</h1>
        <button onClick={returnHome}>Home</button>

        <table className="ranking-table">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Nom</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((participant, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{participant.name}</td>
                <td>{participant.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Ranking