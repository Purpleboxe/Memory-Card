function Card({ id, image, onClick, className, flip }) {
  const isDisabled = className.includes("disabled");

  const click = () => {
    onClick(id);
  };

  return (
    <button
      className={`card ${className} ${flip ? "flip" : ""}`}
      onClick={click}
      disabled={isDisabled}
    >
      <img
        className={`${className} ${flip ? "flip" : ""}`}
        src={image}
        alt="card"
      />
    </button>
  );
}

export default Card;
