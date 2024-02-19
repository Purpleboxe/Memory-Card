import "../styles/menu.css";

function Menu({ start }) {
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
        num = 22;
        break;
      case "expert":
        num = 35;
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
      </div>
    </>
  );
}

export default Menu;
