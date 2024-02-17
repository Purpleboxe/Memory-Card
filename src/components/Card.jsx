function Card({ id, image, onClick, className }) {
  const isDisabled = className.includes("disabled");

  const click = () => {
    onClick(id);
  };

  return (
    <button
      className={`card ${className}`}
      onClick={click}
      disabled={isDisabled}
    >
      <img className={className} src={image} alt="card" />
    </button>
  );
}

export default Card;
