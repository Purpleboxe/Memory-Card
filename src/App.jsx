import { useState } from "react";
import Game from "./components/Game.jsx";
import Menu from "./components/Menu.jsx";

function App() {
  const [game, setGame] = useState(false);
  const [numCards, setNumCards] = useState(5);
  const [highScore, setHighScore] = useState(0);

  const start = (numCards) => {
    setNumCards(numCards);
    setGame(true);
  };

  const menu = () => {
    setGame(false);
  };

  const updateHighScore = (score) => {
    setHighScore(score);
  };

  return (
    <>
      {game ? (
        <Game
          numCards={numCards}
          menu={menu}
          highScore={highScore}
          updateHighScore={updateHighScore}
        />
      ) : (
        <Menu start={start} />
      )}
    </>
  );
}

export default App;
