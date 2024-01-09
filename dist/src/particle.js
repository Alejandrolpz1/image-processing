var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
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
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
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
    };
    Particle.prototype.draw = function () {
        this.ctx.fillStyle = "hsl(".concat(this.hue, ", 100%, 50%)");
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function changeColor(currentColor, factor) {
    return currentColor; // Devuelve el color modificado
}
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
