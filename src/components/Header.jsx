function Header({ score, highScore, menu }) {
  const keyPress = (event) => {
    if (event.key === "Enter") {
      menu();
    }
  };

  return (
    <header>
      <h1 onClick={menu} onKeyDown={keyPress} tabIndex={0}>
        Memory Card
      </h1>
      <div className="scores">
        <div className="score">
          Current Score
          <div id="currentScore">{score}</div>
        </div>
        <div className="score">
          High Score
          <div id="highScore">{highScore}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
