/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/game.css";
import Card from "./Card.jsx";
import { useState, useEffect } from "react";

function Game() {
  const [cards, setCards] = useState([]);

  async function fetchRandomGif(i) {
    const apiKey = "cYHABlTemchmA3WrEL47d2bMx52muTvl";
    const url = `https://api.giphy.com/v1/stickers/search?q=emoji&api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data[i].images.fixed_height.url;
    } catch (e) {
      console.log("Error: " + e);
      return null;
    }
  }

  async function createCards(num) {
    const newCards = [];
    for (let i = 0; i < num; i++) {
      const url = await fetchRandomGif(i);
      newCards.push({ id: i, image: url });
    }
    setCards(newCards);
  }

  useEffect(() => {
    const num = 12;
    createCards(num);
  }, []);

  return (
    <div className="cardGrid">
      {cards.map((card) => (
        <Card key={card.id} image={card.image} />
      ))}
    </div>
  );
}

export default Game;
