/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/game.css";
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import { useState, useEffect } from "react";

function Game() {
  const [cards, setCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [won, setWon] = useState(false);

  const num = 12;

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
    const apiKey = "cYHABlTemchmA3WrEL47d2bMx52muTvl";
    const url = `https://api.giphy.com/v1/stickers/search?q=emoji&api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data[i].images.fixed_height.url;
    } catch (error) {
      console.error("Error fetching GIF:", error);
      return null;
    }
  }

  async function initializeCards(num) {
    const newCards = [];
    for (let i = 0; i < num; i++) {
      const url = await fetchRandomGif(i);
      newCards.push({ id: i, image: url });
    }
    setCards(newCards);
  }

  useEffect(() => {
    initializeCards(num);
  }, []);

  useEffect(() => {
    if (score >= highScore) {
      setHighScore(score);
    }

    if (clickedCards.length === num) {
      win();
    }
  }, [score, highScore, clickedCards]);

  const playAgain = () => {
    setScore(0);
    setClickedCards([]);
    setWon(false);
    initializeCards(num);
    overlay.classList.remove("active");
    winPopup.classList.remove("active");
  };

  return (
    <>
      <Header score={score} highScore={highScore} />
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
      </div>
      <div className="popup">
        <div className="win">
          <h2>You Win!</h2>
          <button onClick={playAgain}>Play Again</button>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
}

export default Game;
