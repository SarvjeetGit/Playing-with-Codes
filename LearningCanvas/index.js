var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");
c.fillStyle = "red";
// c.fillRect(50,50,100,100);

// c.beginPath();
// c.moveTo(200,200);
// c.lineTo(500,500);
// c.stroke();

// for (let i = 0; i < 100; i++) {
//   var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//   x = Math.random() * window.innerWidth;
//   y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 40, 0, Math.PI * 2, false);
//   c.stroke();
//   c.strokeStyle = randomColor;
// }
// let x = Math.random() * innerWidth;
// let dx = (Math.random() - 0.5) * 4;
// let y = Math.random() * innerHeight;
// let dy = (Math.random() - 0.5) * 4;
// let radius = 40;
// function animate() {
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, window.innerWidth, window.innerHeight);
//   c.beginPath();
//   c.arc(x, y, radius, 0, Math.PI * 2, false);
//   c.stroke();
//   if (x + radius == innerWidth || x - radius == 0) {
//     dx = -dx;
//   }
//   if (y + radius == innerHeight || y - radius == 0) {
//     dy = -dy;
//   }
//   x += dx;
//   y += dy;
// }
// animate();
let mouse = [(x = undefined), (y = undefined)];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", (e) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

class Circle {
  constructor(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = r;
    this.minRadius = r;
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fill();
      c.fillStyle = this.color;
    };
    this.update = () => {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < 40) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
      this.draw();
    };
  }
}
circleArray = [];
for (let i = 0; i < 1000; i++) {
  let r = Math.random() * 3 + 1;
  let x = Math.random() * (innerWidth - r * 2) + r;
  let dx = (Math.random() - 0.5) * 2;
  let y = Math.random() * (innerHeight - r * 2) + r;
  let dy = (Math.random() - 0.5) * 2;
  circleArray.push(new Circle(x, y, dx, dy, r));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
