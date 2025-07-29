const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 4; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

document.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(e.clientX, e.clientY, true));
  }
});

class Particle {
  constructor(x, y, explode = false) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.life = 60;
    this.alpha = 1;
    const angle = Math.random() * 2 * Math.PI;
    const speed = explode ? Math.random() * 4 : Math.random() * 1.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.alpha = this.life / 60;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 202, 212, ${this.alpha})`;
    ctx.shadowColor = 'rgba(255, 202, 212, 0.6)';
    ctx.shadowBlur = 12;
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p, i) => {
    p.update();
    p.draw(ctx);
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();
