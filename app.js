const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
const colors = ["#2c3e50", "#e74c3c", "#ecf0f1", "#3498db", "#2980b9"];
let colorIndex;
let friction = 0.05;
let gravity = 0.3;
let circles =[];
let x, y, radius, dx, dy;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle{
  constructor(x, y, radius, dx, dy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = randomColor();
    this.velocity = {
      x: dx,
      y: dy
    }
  }
  draw(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
  }
  update(){
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if(this.x+this.radius>=canvas.width || this.x-this.radius<=0) this.velocity.x = -this.velocity.x*(1-friction);
    if(this.y+this.radius>=canvas.height || this.y-this.radius<=0) this.velocity.y = -this.velocity.y*(1-friction);
    else this.velocity.y += gravity;
    this.draw();
  }
}

function randomColor(){
  colorIndex = randomNumber(0, 4);
  return colors[colorIndex];
}

function randomNumber(min, max, isInteger = true){
  if(isInteger){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  return Math.random()*(max-min)+min;
}

for(let i=0; i<200; i++){
  radius = randomNumber(10, 50);
  x = randomNumber(radius, canvas.width-radius);
  y = randomNumber(radius, canvas.height-radius);
  dx = randomNumber(1, 4, 0);
  dy = randomNumber(1, 4, 0);
  circles.push(new Circle(x, y, radius, dx, dy));
}

function running(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(running);
  circles.forEach(circle => {
    circle.update();
  })
}

running();