import "../styles/menu.css";

function Menu({ start, highScore }) {
  const handleStart = (difficulty) => {
    let num;
    switch (difficulty) {
      case "easy":
        num = 5;
        break;
      case "normal":
        num = 12;
        break;
      case "hard":
        num = 26;
        break;
      case "expert":
        num = 40;
        break;
    }

    start(num);
  };

  return (
    <>
      <div className="menu">
        <h1>Memory Card</h1>
        <div>Choose your difficulty!</div>
        <div className="menu-btns">
          <button className="easy" onClick={() => handleStart("easy")}>
            Easy
          </button>
          <button className="normal" onClick={() => handleStart("normal")}>
            Normal
          </button>
          <button className="hard" onClick={() => handleStart("hard")}>
            Hard
          </button>
          <button className="expert" onClick={() => handleStart("expert")}>
            Expert
          </button>
        </div>
        <strong>High Score: {highScore}</strong>
      </div>
    </>
  );
}

export default Menu;
