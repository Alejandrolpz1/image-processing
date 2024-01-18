var BinaryRain = /** @class */ (function () {
    function BinaryRain(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.velocityY = Math.random() * 5 + 2; // Velocidad vertical aleatoria
        this.binaryValue = Math.random() < 0.5 ? '0' : '1'; // Inicializa con 0 o 1 aleatorio
    }
    BinaryRain.prototype.update = function () {
        this.y += this.velocityY;
        // Reinicia la posición si llega al fondo del lienzo
        if (this.y > this.ctx.canvas.height) {
            this.y = 0;
            this.binaryValue = Math.random() < 0.5 ? '0' : '1'; // Cambia a 0 o 1 aleatorio
        }
    };
    BinaryRain.prototype.draw = function () {
        this.ctx.fillStyle = 'green';
        this.ctx.font = "".concat(this.size, "px monospace");
        this.ctx.fillText(this.binaryValue, this.x, this.y);
    };
    return BinaryRain;
}());
export { BinaryRain };
var SnakeSegment = /** @class */ (function () {
    function SnakeSegment(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
    }
    SnakeSegment.prototype.draw = function (isHead) {
        this.ctx.fillStyle = isHead ? 'green' : 'darkgreen'; // Color de la cabeza y el cuerpo
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        // Dibujar ojitos en la cabeza
        if (isHead && this.size >= 20) {
            var eyeSize = 4;
            var eyeOffsetX = this.size / 4;
            var eyeOffsetY = this.size / 4;
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(this.x + eyeOffsetX, this.y + eyeOffsetY, eyeSize, eyeSize);
            this.ctx.fillRect(this.x + this.size - eyeOffsetX - eyeSize, this.y + eyeOffsetY, eyeSize, eyeSize);
        }
    };
    return SnakeSegment;
}());
export { SnakeSegment };
var Snake = /** @class */ (function () {
    function Snake(ctx, numGhosts) {
        this.segments = [];
        this.direction = 'right'; // Dirección inicial
        this.ctx = ctx;
        this.changeDirectionProbability = 0.03; // Probabilidad de cambiar de dirección en cada fotograma
        this.numGhosts = numGhosts;
        for (var i = 0; i < numGhosts; i++) {
            var ghostSize = Math.floor(Math.random() * 20) + 10;
            var ghostX = Math.random() * ctx.canvas.width;
            var ghostY = Math.random() * ctx.canvas.height;
            this.segments.push(new SnakeSegment(ghostX, ghostY, ghostSize, ctx));
        }
    }
    Snake.prototype.move = function () {
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var head = _a[_i];
            var newX = head.x;
            var newY = head.y;
            // Cambiar de dirección aleatoriamente
            if (Math.random() < this.changeDirectionProbability) {
                var possibleDirections = ['up', 'down', 'left', 'right'];
                var newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                this.direction = newDirection;
            }
            // Ajusta la dirección para que las cabezas se muevan por toda la imagen
            if (newX < 0) {
                newX = this.ctx.canvas.width - head.size;
            }
            else if (newX + head.size > this.ctx.canvas.width) {
                newX = 0;
            }
            if (newY < 0) {
                newY = this.ctx.canvas.height - head.size;
            }
            else if (newY + head.size > this.ctx.canvas.height) {
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
    };
    Snake.prototype.draw = function () {
        // Dibuja todas las cabezas de la serpiente
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var head = _a[_i];
            head.draw(true);
        }
    };
    return Snake;
}());
export { Snake };
// Clase PacMan
var PacMan = /** @class */ (function () {
    function PacMan(x, y, size, ctx, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.speed = speed;
        this.direction = 'right'; // Inicialmente, Pac-Man se mueve hacia la derecha
    }
    PacMan.prototype.changeDirection = function () {
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
    };
    PacMan.prototype.update = function () {
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
    };
    PacMan.prototype.draw = function () {
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
    };
    return PacMan;
}());
export { PacMan };
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Clase Pellet
var Pellet = /** @class */ (function () {
    function Pellet(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
    }
    Pellet.prototype.isEaten = function (pacmanX, pacmanY, pacmanSize) {
        var distance = Math.sqrt(Math.pow((this.x - pacmanX), 2) + Math.pow((this.y - pacmanY), 2));
        if (distance < (this.size + pacmanSize) / 2) {
            this.x = -1;
            this.y = -1;
            return true;
        }
        return false;
    };
    Pellet.prototype.draw = function () {
        if (this.x !== -1 && this.y !== -1) {
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fill();
        }
    };
    return Pellet;
}());
export { Pellet };
var ElectromagneticWave = /** @class */ (function () {
    function ElectromagneticWave(x, y, amplitude, frequency, speed, ctx) {
        this.x = x;
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.ctx = ctx;
        this.color = getRandomColor();
    }
    ElectromagneticWave.prototype.update = function () {
        this.x += this.speed;
        // Reinicia la posición si llega al final del lienzo
        if (this.x > this.ctx.canvas.width) {
            this.x = 0;
        }
    };
    ElectromagneticWave.prototype.draw = function () {
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (var i = 0; i < this.ctx.canvas.width; i++) {
            var waveHeight = this.amplitude * Math.sin((i + this.x) * (Math.PI * 2) / this.frequency);
            this.ctx.lineTo(i, this.y + waveHeight);
        }
        this.ctx.stroke();
    };
    return ElectromagneticWave;
}());
export { ElectromagneticWave };
var Brick = /** @class */ (function () {
    function Brick(x, y, width, height, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.isBroken = false;
    }
    Brick.prototype.draw = function () {
        if (!this.isBroken) {
            this.ctx.fillStyle = 'orange'; // Color del ladrillo
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    Brick.prototype.checkCollision = function (ball) {
        // Verifica la colisión con la bola
        if (!this.isBroken && ball.x < this.x + this.width && ball.x + ball.radius > this.x &&
            ball.y < this.y + this.height && ball.y + ball.radius > this.y) {
            this.isBroken = true;
            ball.reverseY(); // Invierte la dirección de la bola al romper un ladrillo
        }
    };
    return Brick;
}());
export { Brick };
var BreakoutBall = /** @class */ (function () {
    function BreakoutBall(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.speedX = 3;
        this.speedY = 3;
    }
    BreakoutBall.prototype.draw = function () {
        this.ctx.fillStyle = 'white'; // Color de la bola
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    };
    BreakoutBall.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        // Rebote en los bordes
        if (this.x - this.radius < 0 || this.x + this.radius > this.ctx.canvas.width) {
            this.reverseX();
        }
        if (this.y - this.radius < 0 || this.y + this.radius > this.ctx.canvas.height) {
            this.reverseY();
        }
    };
    BreakoutBall.prototype.reverseX = function () {
        this.speedX *= -1;
    };
    BreakoutBall.prototype.reverseY = function () {
        this.speedY *= -1;
    };
    return BreakoutBall;
}());
export { BreakoutBall };
