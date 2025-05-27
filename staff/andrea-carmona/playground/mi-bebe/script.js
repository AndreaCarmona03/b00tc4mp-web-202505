
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let loves = [];
let hearts = [];
let petals = [];
let fireworks = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Love {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height + random(0, canvas.height);
    this.size = random(16, 32);
    this.alpha = 1;
    this.speed = random(0.5, 1.2);
  }

  update() {
    this.y -= this.speed * 1.2;
    this.alpha -= 0.001;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 100, 100, ${this.alpha})`;
    ctx.font = `${this.size}px Arial`;
    ctx.fillText("LOVE", this.x, this.y);
  }
}

class Heart {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height + random(0, canvas.height / 2);
    this.size = random(10, 20);
    this.alpha = 1;
    this.speed = random(0.5, 1.2);
  }

  update() {
    this.y -= this.speed * 1.2;
    this.alpha -= 0.001;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 100, 100, ${this.alpha})`;
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2,
                      this.x - this.size, this.y + this.size / 3,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3,
                      this.x + this.size / 2, this.y - this.size / 2,
                      this.x, this.y);
    ctx.fill();
  }
}

class Petal {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = random(-canvas.height, 0);
    this.size = random(8, 16);
    this.speed = random(1, 2);
    this.wind = random(-0.5, 0.5);
  }

  update() {
    this.y += this.speed;
    this.x += this.wind;
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = random(0, canvas.width);
    }
  }

  draw() {
    ctx.fillStyle = "rgba(255,182,193,0.8)";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size / 2, this.size, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = "rgba(200, 0, 0, 1)";
    this.alpha = 1;
    this.speed = random(2, 5);
    this.angle = random(0, Math.PI * 2);
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,100,100,${this.alpha})`;
    ctx.fill();
  }
}

function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = random(50, canvas.height / 2);
  for (let i = 0; i < 30; i++) {
    fireworks.push(new Particle(x, y));
  }
}

for (let i = 0; i < 60; i++) {
  petals.push(new Petal());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.3) loves.push(new Love());
  if (Math.random() < 0.2) hearts.push(new Heart());
  if (Math.random() < 0.02) createFirework();

  petals.forEach(petal => {
    petal.update();
    petal.draw();
  });

  loves.forEach((love, i) => {
    love.update();
    love.draw();
    if (love.alpha <= 0) loves.splice(i, 1);
  });

  hearts.forEach((heart, i) => {
    heart.update();
    heart.draw();
    if (heart.alpha <= 0) hearts.splice(i, 1);
  });

  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.alpha <= 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
