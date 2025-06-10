const CANVAS = document.getElementById("network");
const CTX = CANVAS.getContext("2d");
let WIDTH, HEIGHT;

function resizeCanvas() {
  WIDTH = CANVAS.width = window.innerWidth;
  HEIGHT = CANVAS.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const N_POINTS = 100;
const SPEED = 0.4;
const COLOR = "#f0720b";

const points = Array.from({ length: N_POINTS }, () => ({
  x: Math.random() * WIDTH,
  y: Math.random() * HEIGHT,
  vy: SPEED + Math.random() * 0.2
}));

const MAX_DISTANCE = 120; // distância máxima para conectar os pontos

function draw() {
  CTX.fillStyle = "black"; // fundo preto opaco
  CTX.fillRect(0, 0, WIDTH, HEIGHT);

  CTX.font = "bold 14px monospace";
  CTX.textAlign = "center";
  CTX.textBaseline = "middle";
  CTX.fillStyle = COLOR;

  // Desenha os cifrões
  points.forEach(p => {
    CTX.fillText("$", p.x, p.y);
    p.y += p.vy;
    if (p.y > HEIGHT) {
      p.y = 0;
      p.x = Math.random() * WIDTH;
    }
  });

  // Desenha as linhas (teia)
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DISTANCE) {
        // A opacidade é inversamente proporcional à distância
        const alpha = 1 - dist / MAX_DISTANCE;
        CTX.strokeStyle = `rgba(240, 114, 11, ${alpha.toFixed(2)})`; // mesma cor com transparência
        CTX.lineWidth = 1;
        CTX.beginPath();
        CTX.moveTo(p1.x, p1.y);
        CTX.lineTo(p2.x, p2.y);
        CTX.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
