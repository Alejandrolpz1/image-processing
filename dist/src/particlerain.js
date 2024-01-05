var RainParticle = /** @class */ (function () {
    function RainParticle(width, height, screenCanvas, mapImg) {
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
    RainParticle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
            // Actualizamos la posición de los números en lugar de dibujarlos directamente
            this.updateNumberPosition();
        }
        this.y += movement;
        this.hue = (this.hue + 0.5) % 360;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    RainParticle.prototype.draw = function () {
        this.ctx.fillStyle = "hsl(".concat(this.hue, ", 100%, 50%)");
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
        // Dibujar el número en el centro de la partícula
        this.drawNumber();
    };
    RainParticle.prototype.drawNumber = function () {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Hacer el número más visible
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText("".concat(Math.floor(Math.random() * 10)), this.x, this.y);
    };
    // Método para actualizar la posición de los números
    RainParticle.prototype.updateNumberPosition = function () {
        this.x = Math.random() * this.width;
    };
    RainParticle.prototype.getSpeed = function () {
        return this.speed;
    };
    return RainParticle;
}());
export { RainParticle };
