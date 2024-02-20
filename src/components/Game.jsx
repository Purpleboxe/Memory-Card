/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/game.css";
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import Confetti from "./Confetti.js";
import { useState, useEffect } from "react";

function Game({ numCards, menu, highScore, updateHighScore }) {
  const [cards, setCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(false);

  const overlay = document.querySelector(".overlay");
  const winPopup = document.querySelector(".win");

  async function shuffleCards() {
    setIsShuffling(true);

    setTimeout(() => {
      const shuffledCards = [...cards];

      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [
          shuffledCards[j],
          shuffledCards[i],
        ];
      }

      setCards(shuffledCards);

      setIsShuffling(false);
    }, 1000);
  }

  const win = () => {
    overlay.classList.add("active");
    winPopup.classList.add("active");
    Confetti();

    setWon(true);
  };

  const handleCardClick = (id) => {
    if (!clickedCards.includes(id)) {
      setScore((prev) => prev + 1);
      setClickedCards((prev) => [...prev, id]);
    } else {
      setScore(0);
      setClickedCards([]);
    }

    shuffleCards();
  };

  async function fetchRandomGif(i) {
    const apiKey = import.meta.env.VITE_GIPHY_API;
    const url = `https://api.giphy.com/v1/stickers/search?q=emoji&api_key=${apiKey}`;

    try {
      const response = await fetch(url, { mode: "cors" });
      const data = await response.json();
      setLoading(true);
      return data.data[i].images.fixed_height.url;
    } catch (error) {
      console.error("Error fetching GIF:", error);
      return null;
    }
  }

  async function initializeCards(numCards) {
    const newCards = [];
    for (let i = 0; i < numCards; i++) {
      const url = await fetchRandomGif(i);
      newCards.push({ id: i, image: url });
    }
    setCards(newCards);
    setLoading(false);
  }

  useEffect(() => {
    initializeCards(numCards);
  }, []);

  useEffect(() => {
    if (score >= highScore) {
      updateHighScore(score);
    }

    if (clickedCards.length === numCards) {
      win();
    }
  }, [score, highScore, clickedCards]);

  const playAgain = () => {
    setScore(0);
    setClickedCards([]);
    setWon(false);
    initializeCards(numCards);
    overlay.classList.remove("active");
    winPopup.classList.remove("active");
  };

  return (
    <>
      <Header score={score} highScore={highScore} menu={menu} />
      <div className="cardGrid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            onClick={handleCardClick}
            className={isShuffling || won ? "disabled" : ""}
            flip={isShuffling ? "flip" : ""}
          />
        ))}

        {loading ? <div className="loading">Loading...</div> : null}
      </div>
      <div className="popup">
        <div className="win">
          <h2>You Win!</h2>
          <button onClick={menu}>Menu</button>
          <button onClick={playAgain}>Play Again</button>
        </div>
        <div className="overlay"></div>
        <div className="canvas-confetti"></div>
      </div>
    </>
  );
}

export default Game;
