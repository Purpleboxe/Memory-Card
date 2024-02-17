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

  const handleCardClick = (id) => {
    if (!clickedCards.includes(id)) {
      setScore((prev) => prev + 1);
      setClickedCards((prev) => [...prev, id]);
    } else {
      if (score >= highScore) {
        setHighScore(score);
      }
      setScore((prev) => prev - prev);
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
    const num = 12;
    initializeCards(num);
  }, []);

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
            className={isShuffling ? "flip disabled" : ""}
          />
        ))}
      </div>
    </>
  );
}

export default Game;
