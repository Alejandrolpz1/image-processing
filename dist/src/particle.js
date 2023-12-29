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
var CodeRain = /** @class */ (function () {
    function CodeRain(width, height, ctx, mapImg) {
        this.particles = [];
        this.particleTexts = [];
        // Crear un conjunto de partículas
        for (var i = 0; i < 100; i++) {
            this.particles.push(new Particle(width, height, ctx, mapImg));
        }
        // Crear un conjunto de partículas de texto
        for (var i = 0; i < 30; i++) {
            this.particleTexts.push(new ParticleText(Math.random() * width, Math.random() * height, ctx));
        }
    }
    CodeRain.prototype.update = function () {
        // Actualizar todas las partículas
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            particle.update();
        }
        // Actualizar todas las partículas de texto
        for (var _b = 0, _c = this.particleTexts; _b < _c.length; _b++) {
            var particleText = _c[_b];
            particleText.update({ x: 0, y: 0, radius: 0 }); // Puedes proporcionar la información del ratón si es necesario
        }
    };
    CodeRain.prototype.draw = function () {
        // Dibujar todas las partículas
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            particle.draw();
        }
        // Dibujar todas las partículas de texto
        for (var _b = 0, _c = this.particleTexts; _b < _c.length; _b++) {
            var particleText = _c[_b];
            particleText.draw();
        }
    };
    return CodeRain;
}());
export { CodeRain };
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function changeColor(currentColor, factor) {
    // Aquí implementarías la lógica para cambiar el color
    // Puedes utilizar bibliotecas como tinycolor para facilitar esto
    // Ejemplo: tinycolor(currentColor).darken(factor).toString();
    return currentColor; // Devuelve el color modificado
}
