// script.js

// Enable confetti on hover for the winner row
document.addEventListener("DOMContentLoaded", () => {
  const winnerRow = document.getElementById("krynet-row");
  const confettiPieces = winnerRow.querySelectorAll(".confetti-piece");

  winnerRow.addEventListener("mouseenter", () => {
    confettiPieces.forEach(piece => {
      piece.style.opacity = "1";
      piece.style.animationPlayState = "running";
    });
  });

  winnerRow.addEventListener("mouseleave", () => {
    confettiPieces.forEach(piece => {
      piece.style.opacity = "0";
      piece.style.animationPlayState = "paused";
    });
  });
});
