export class Particle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected position1: number;
  protected position2: number;
  protected mappedImage: any[][][];
  protected hue: number;
  protected shape: string; 
 
  
  
  
  constructor(width: number, height: number, screenCanvas: CanvasRenderingContext2D, mapImg: number[][][]) {
    this.width = width;
    this.height = height;
    this.ctx = screenCanvas;
    this.x = Math.random() * width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 2.5;
    this.size = Math.random() * 1.5 + 1;
    this._2PI = Math.PI * 2;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.mappedImage = mapImg;
    this.hue = Math.random() * 360;
  }

  public update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 0;

    if (this.y < this.height) {
      this.speed = this.mappedImage[0][this.position1][this.position2];
      movement = (2.5 - this.speed) + this.velocity;
    }

    this.y += movement;
    this.hue = (this.hue + 0.5) % 360;

    if (this.y >= this.height) {
      this.y = 0;
      this.x = Math.random() * this.width;
    }
  }

  public draw() {
    this.ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fill();
  }

  public getSpeed(): number {
    return this.speed;
  }
}
 


export class ParticleText {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected baseX: number;
  protected baseY: number;
  protected density: number;
  protected mappedImage: any[][][];
  
  constructor(x: number, y: number, screenCanvas?: CanvasRenderingContext2D,
    mapImg?: number[][][]) {
    this.ctx = screenCanvas;
    this.x = x;// + 200;
    this.y = y;// - 100,
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = ((Math.random() * 30) + 1);
    this._2PI = Math.PI * 2;
    this.mappedImage = mapImg;
  }

  public update(mouse: any) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    var maxDistance = mouse.radius;
    var force = (maxDistance - distance) / maxDistance;

    let directionX = (forceDirectionX * force * this.density);
    let directionY = (forceDirectionY * force * this.density);
    
    if (distance < mouse.radius) {
      this.x -= directionX ;
      this.y -= directionY ;
    }
    else {
      if (this.x !== this.baseX ) {
          let dx = this.x - this.baseX;
          this.x -= dx/5;
      } if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy/5;
      }
    }
  }

  public draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

}



export class CodeRain {
  private particles: Particle[] = [];
  private particleTexts: ParticleText[] = [];

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D, mapImg: number[][][]) {
    // Crear un conjunto de partículas
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(width, height, ctx, mapImg));
    }

    // Crear un conjunto de partículas de texto
    for (let i = 0; i < 30; i++) {
      this.particleTexts.push(new ParticleText(Math.random() * width, Math.random() * height, ctx));
    }
  }

  public update() {
    // Actualizar todas las partículas
    for (const particle of this.particles) {
      particle.update();
    }

    // Actualizar todas las partículas de texto
    for (const particleText of this.particleTexts) {
      particleText.update({ x: 0, y: 0, radius: 0 }); // Puedes proporcionar la información del ratón si es necesario
    }
  }

  public draw() {
    // Dibujar todas las partículas
    for (const particle of this.particles) {
      particle.draw();
    }

    // Dibujar todas las partículas de texto
    for (const particleText of this.particleTexts) {
      particleText.draw();
    }
  }


  

   
  }



  
  

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function changeColor(currentColor: string, factor: number) {

  return currentColor; // Devuelve el color modificado
}

export class SmokeParticle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected color: string;

  constructor(width: number, height: number, screenCanvas: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = screenCanvas;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.speed = 0.5 + Math.random() * 1.5;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 3 + 1;
    this._2PI = Math.PI * 2;
    this.color = 'rgba(200, 200, 200, 0.5)';
  }

  public update() {
    this.x += this.velocity;
    this.y -= this.speed;

    if (this.size > 0.2) this.size -= 0.1;
    if (this.speed > 0.1) this.speed -= 0.05;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

export class SmokeEffect {
  private particles: SmokeParticle[] = [];

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    // Crear un conjunto de partículas de humo
    for (let i = 0; i < 100; i++) {
      this.particles.push(new SmokeParticle(width, height, ctx));
    }
  }

  public update() {
    // Actualizar todas las partículas de humo
    for (const particle of this.particles) {
      particle.update();
    }
  }

  public draw() {
    // Dibujar todas las partículas de humo
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}
