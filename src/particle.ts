
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


export class BinaryRain {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected velocityY: number;
  protected binaryValue: string;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.velocityY = Math.random() * 5 + 2; // Velocidad vertical aleatoria
    this.binaryValue = Math.random() < 0.5 ? '0' : '1'; // Inicializa con 0 o 1 aleatorio
  }

  public update() {
    this.y += this.velocityY;

    // Reinicia la posición si llega al fondo del lienzo
    if (this.y > this.ctx.canvas.height) {
      this.y = 0;
      this.binaryValue = Math.random() < 0.5 ? '0' : '1'; // Cambia a 0 o 1 aleatorio
    }
  }

  public draw() {
    this.ctx.fillStyle = 'green';
    this.ctx.font = `${this.size}px monospace`;
    this.ctx.fillText(this.binaryValue, this.x, this.y);
  }
}

export class SnakeSegment {
  public x: number;
  public y: number;
  public size: number;
  public ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
  }

  public draw(isHead: boolean) {
    this.ctx.fillStyle = isHead ? 'green' : 'darkgreen'; // Color de la cabeza y el cuerpo
    this.ctx.fillRect(this.x, this.y, this.size, this.size);

    // Dibujar ojitos en la cabeza
    if (isHead && this.size >= 20) {
      const eyeSize = 4;
      const eyeOffsetX = this.size / 4;
      const eyeOffsetY = this.size / 4;
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x + eyeOffsetX, this.y + eyeOffsetY, eyeSize, eyeSize);
      this.ctx.fillRect(this.x + this.size - eyeOffsetX - eyeSize, this.y + eyeOffsetY, eyeSize, eyeSize);
    }
  }
}

export class Snake {
  public segments: SnakeSegment[];
  public direction: string;
  public ctx: CanvasRenderingContext2D;
  private changeDirectionProbability: number;
  private numGhosts: number;

  constructor(ctx: CanvasRenderingContext2D, numGhosts: number) {
    this.segments = [];
    this.direction = 'right'; // Dirección inicial
    this.ctx = ctx;
    this.changeDirectionProbability = 0.03; // Probabilidad de cambiar de dirección en cada fotograma
    this.numGhosts = numGhosts;

    for (let i = 0; i < numGhosts; i++) {
      const ghostSize = Math.floor(Math.random() * 20) + 10;
      const ghostX = Math.random() * ctx.canvas.width;
      const ghostY = Math.random() * ctx.canvas.height;
      this.segments.push(new SnakeSegment(ghostX, ghostY, ghostSize, ctx));
    }
  }

  public move() {
    for (const head of this.segments) {
      let newX = head.x;
      let newY = head.y;

      // Cambiar de dirección aleatoriamente
      if (Math.random() < this.changeDirectionProbability) {
        const possibleDirections = ['up', 'down', 'left', 'right'];
        const newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        this.direction = newDirection;
      }

      // Ajusta la dirección para que las cabezas se muevan por toda la imagen
      if (newX < 0) {
        newX = this.ctx.canvas.width - head.size;
      } else if (newX + head.size > this.ctx.canvas.width) {
        newX = 0;
      }

      if (newY < 0) {
        newY = this.ctx.canvas.height - head.size;
      } else if (newY + head.size > this.ctx.canvas.height) {
        newY = 0;
      }

      // Aplica la dirección actual
      switch (this.direction) {
        case 'up':
          newY -= head.size;
          break;
        case 'down':
          newY += head.size;
          break;
        case 'left':
          newX -= head.size;
          break;
        case 'right':
          newX += head.size;
          break;
      }

      // Actualiza la posición de la cabeza
      head.x = newX;
      head.y = newY;
    }
  }

  public draw() {
    // Dibuja todas las cabezas de la serpiente
    for (const head of this.segments) {
      head.draw(true);
    }
  }
}

// Clase PacMan

export class PacMan {
  public x: number;
  public y: number;
  public size: number;
  protected ctx: CanvasRenderingContext2D;
  protected speed: number;
  protected direction: string; // Nueva propiedad para almacenar la dirección actual

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, speed: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.speed = speed;
    this.direction = 'right'; // Inicialmente, Pac-Man se mueve hacia la derecha
  }

  private changeDirection() {
    switch (this.direction) {
      case 'right':
        this.direction = 'down';
        break;
      case 'down':
        this.direction = 'left';
        break;
      case 'left':
        this.direction = 'up';
        break;
      case 'up':
        this.direction = 'right';
        break;
    }
  }

  public update() {
    switch (this.direction) {
      case 'right':
        this.x += this.speed;
        if (this.x + this.size / 2 > this.ctx.canvas.width) {
          this.changeDirection();
        }
        break;
      case 'down':
        this.y += this.speed;
        if (this.y + this.size / 2 > this.ctx.canvas.height) {
          this.changeDirection();
        }
        break;
      case 'left':
        this.x -= this.speed;
        if (this.x - this.size / 2 < 0) {
          this.changeDirection();
        }
        break;
      case 'up':
        this.y -= this.speed;
        if (this.y - this.size / 2 < 0) {
          this.changeDirection();
        }
        break;
    }
  }

  public draw() {
    this.ctx.fillStyle = 'yellow';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0.2, -0.2, false);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.size / 3, this.y - this.size / 4, this.size / 10, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

// Clase Pellet
export class Pellet {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
  }

  public isEaten(pacmanX: number, pacmanY: number, pacmanSize: number): boolean {
    const distance = Math.sqrt((this.x - pacmanX) ** 2 + (this.y - pacmanY) ** 2);

    if (distance < (this.size + pacmanSize) / 2) {
      this.x = -1;
      this.y = -1;
      return true;
    }

    return false;
  }

  public draw() {
    if (this.x !== -1 && this.y !== -1) {
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}