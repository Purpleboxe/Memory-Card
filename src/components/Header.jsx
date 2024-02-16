function Header() {
  return (
    <header>
      <h1>Memory Card</h1>
      <div className="scores">
        <div className="score">
          Current Score
          <div id="currentScore">0</div>
        </div>
        <div className="score">
          High Score
          <div id="highScore">0</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
