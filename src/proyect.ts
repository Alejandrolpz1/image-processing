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
  

  
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
  
  export class ElectromagneticWave {
    protected x: number;
    protected y: number;
    protected amplitude: number;
    protected frequency: number;
    protected speed: number;
    protected ctx: CanvasRenderingContext2D;
    protected color: string;
  
    constructor(x: number, y: number, amplitude: number, frequency: number, speed: number, ctx: CanvasRenderingContext2D) {
      this.x = x;
      this.y = y;
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.speed = speed;
      this.ctx = ctx;
      this.color = getRandomColor();
    }
  
    public update() {
      this.x += this.speed;
      // Reinicia la posición si llega al final del lienzo
      if (this.x > this.ctx.canvas.width) {
        this.x = 0;
      }
    }
  
    public draw() {
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 2;
  
      this.ctx.beginPath();
      for (let i = 0; i < this.ctx.canvas.width; i++) {
        const waveHeight = this.amplitude * Math.sin((i + this.x) * (Math.PI * 2) / this.frequency);
        this.ctx.lineTo(i, this.y + waveHeight);
      }
      this.ctx.stroke();
    }  }
  

























export class Brick {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected ctx: CanvasRenderingContext2D;
  protected isBroken: boolean;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.isBroken = false;
  }

  public draw() {
    if (!this.isBroken) {
      this.ctx.fillStyle = 'orange'; // Color del ladrillo
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  public checkCollision(ball: BreakoutBall) {
    // Verifica la colisión con la bola
    if (!this.isBroken && ball.x < this.x + this.width && ball.x + ball.radius > this.x &&
        ball.y < this.y + this.height && ball.y + ball.radius > this.y) {
      this.isBroken = true;
      ball.reverseY(); // Invierte la dirección de la bola al romper un ladrillo
    }
  }
}

export class BreakoutBall {
  public x: number;
  public y: number;
  public radius: number;
  protected ctx: CanvasRenderingContext2D;
  protected speedX: number;
  protected speedY: number;

  constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.speedX = 3;
    this.speedY = 3;
  }

  public draw() {
    this.ctx.fillStyle = 'white'; // Color de la bola
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  public update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebote en los bordes
    if (this.x - this.radius < 0 || this.x + this.radius > this.ctx.canvas.width) {
      this.reverseX();
    }

    if (this.y - this.radius < 0 || this.y + this.radius > this.ctx.canvas.height) {
      this.reverseY();
    }
  }

  public reverseX() {
    this.speedX *= -1;
  }

  public reverseY() {
    this.speedY *= -1;
  }
}

