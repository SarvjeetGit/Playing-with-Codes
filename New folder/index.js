var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

// c.beginPath();
// c.arc(200,200,5,0)
let mouse = [(x = undefined), (y = undefined)];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

let color=["#FF3F8E", "#04C2C9", "#2E55C1"]

class Particle{
    constructor(x,y,r,v){
        this.radius=r;
        this.velocity=v;
        this.radians=0;
        this.x=x;
        this.y=y;
        this.linewidth=0.2
        this.x1=100000;
        this.y1=-100000;
        this.h=0;
        this.color=color[Math.floor(Math.random()*3)]
        this.update = () =>{
            this.radians += this.velocity;
            this.x=x+Math.cos(this.radians)*300;
            this.y=y+Math.sin(this.radians)*100;
            this.draw();
            this.compute();
            if(this.h<30 && this.h>-30){
                this.linewidth=0.3
            }
            else{
                this.linewidth=0.1
            }
        }

        this.draw = () =>{
            c.beginPath();
            c.moveTo(this.x,this.y)
            c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
            c.stroke();
            c.fillStyle=this.color;
            c.fill();
            c.lineTo(this.x1,this.y1);
            c.lineWidth=this.linewidth;
            c.strokeStyle='white'
            c.stroke();
        }

        this.compute = () =>{
             //this.h=Math.sqrt((mouse.x-this.x)*(mouse.x-this.x) + (mouse.y-this.y)*(mouse.y-this.y))*Math.sin(Math.PI/4 - Math.atan((mouse.y-this.y)/(mouse.x-this.x)));
             let m= -(this.y-this.y1)/(this.x-this.x1)
             let c= (this.y1+m*this.x1)
             let a=-m
             let b=-1
             let val=Math.sqrt(a*a+b*b)
             this.h=Math.abs(a*mouse.x + b*mouse.y +c)/val
         }
    }
}

particleArray=[];

for (let i = 0; i < 50; i++) {
    x=Math.random()*innerWidth-300;
    y=Math.random()*innerHeight+20;
    r=1;
    v=Math.random()*0.002;
    particleArray.push(new Particle(x,y,r,v));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    particleArray.forEach(particle => {
        particle.update();
    });
}
animate();

