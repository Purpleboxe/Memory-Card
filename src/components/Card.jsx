function Card(props) {
  const { image } = props;

  return (
    <div className="card">
      <img src={image} alt="card" />
    </div>
  );
}

export default Card;
