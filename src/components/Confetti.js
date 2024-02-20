import confetti from "canvas-confetti";

function Confetti() {
  const canvas = document.createElement("canvas");
  const confettiCanvas = document.querySelector(".canvas-confetti");
  const createConfetti = confetti.create(canvas);

  canvas.classList.add("canvas");

  canvas.width = 900;
  canvas.height = 900;
  confettiCanvas.appendChild(canvas);
  createConfetti({
    particleCount: 600,
    spread: 200,
    gravity: 2,
  }).then(() => confettiCanvas.removeChild(canvas));
}

export default Confetti;
