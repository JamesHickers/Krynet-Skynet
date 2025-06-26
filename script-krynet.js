// script-krynet.js
document.addEventListener("DOMContentLoaded", () => {
  const winnerRow = document.getElementById("krynet-row");
  if (!winnerRow) return; // EXIT if no krynet-row on the page

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

  launchConfettiFromElement('tr.winner');

  winnerRow.addEventListener('click', () => {
    launchConfettiFromElement('tr.winner');
  });
});

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas?.getContext('2d') || null;

let confetti = [];
let animationFrameId = null;

let resizeTimeout = null;
function resizeCanvas() {
  if (!canvas) return;
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, 100);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = [
  '#f44336', '#e91e63', '#9c27b0', '#3f51b5',
  '#2196f3', '#00bcd4', '#009688', '#4caf50',
  '#cddc39', '#ffc107', '#ff9800', '#ff5722'
];
function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
function createConfettiPiece(x, y) {
  return {
    x, y,
    size: Math.random() * 8 + 4,
    color: randomColor(),
    velocity: {
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * -10 - 4
    },
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 10 - 5,
    gravity: 0.3,
    alpha: 1
  };
}
function updateConfetti() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti = confetti.filter(c => c.alpha > 0);
  confetti.forEach(c => {
    c.velocity.y += c.gravity;
    c.x += c.velocity.x;
    c.y += c.velocity.y;
    c.rotation += c.rotationSpeed;
    c.alpha -= 0.01;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotation * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.globalAlpha = Math.max(0, c.alpha);
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
    ctx.restore();
  });
  if (confetti.length > 0) {
    animationFrameId = requestAnimationFrame(updateConfetti);
  } else {
    animationFrameId = null;
  }
}
function launchConfettiFromElement(selector) {
  const el = document.querySelector(selector);
  if (!el || !canvas) return;
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  for (let i = 0; i < 150; i++) {
    confetti.push(createConfettiPiece(x, y));
  }
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  updateConfetti();
}
window.addEventListener('beforeunload', () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
});
