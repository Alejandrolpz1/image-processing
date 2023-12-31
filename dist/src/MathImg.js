var MathImg = /** @class */ (function () {
    function MathImg() {
    }
    MathImg.initArray = function (width, height) {
        var arrImage = new Array(3);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        arrImage[2] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
            arrImage[2][i] = new Array(width);
        }
        return arrImage;
    };
    MathImg.initArray2D = function (width, height) {
        var arrImage = new Array(2);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
        }
        return arrImage;
    };
    MathImg.toGray = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                //0.299 + 0.587G + 0.114B.
                prom = (0.299 * arrImage[0][i][j] + 0.587 * arrImage[1][i][j] + 0.114 * arrImage[2][i][j]);
                sal[0][i][j] = prom;
                sal[1][i][j] = prom;
                sal[2][i][j] = prom;
            }
        }
        return sal;
    };
    MathImg.toNegative = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 255 - arrImage[0][i][j];
                sal[1][i][j] = 255 - arrImage[1][i][j];
                sal[2][i][j] = 255 - arrImage[2][i][j];
            }
        }
        return sal;
    };
    MathImg.toNegativeGrises = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var prom;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (0.299 * arrImage[0][i][j] + 0.587 * arrImage[1][i][j] + 0.114 * arrImage[2][i][j]);
                sal[0][i][j] = 255 - prom;
                sal[1][i][j] = 255 - prom;
                sal[2][i][j] = 255 - prom;
            }
        }
        return sal;
    };
    MathImg.toRed = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    MathImg.toGreen = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    MathImg.toBlue = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        return sal;
    };
    //este codigose agrego el 4 de abril de 2022
    MathImg.toTricolor = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var inicio = 0, termino = img.getWidth() / 3;
        console.log(inicio, termino);
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = inicio; j < termino; j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = 0;
            }
        }
        inicio = termino;
        termino = 2 * img.getWidth() / 3;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = inicio; j < termino; j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = arrImage[0][i][j];
                sal[2][i][j] = arrImage[0][i][j];
            }
        }
        inicio = termino;
        termino = img.getWidth();
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = inicio; j < termino; j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    MathImg.correctionGamma = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = this.funcionGamma(arrImage[0][i][j], factores[0]);
                sal[1][i][j] = this.funcionGamma(arrImage[1][i][j], factores[1]);
                sal[2][i][j] = this.funcionGamma(arrImage[2][i][j], factores[2]);
            }
        }
        return sal;
    };
    MathImg.funcionGamma = function (pixel, factor) {
        return Math.min(255 * Math.pow(pixel / 250, factor), 255);
    };
    MathImg.toUmbral = function (img, umbral) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                if (prom > umbral) {
                    sal[0][i][j] = arrImage[0][i][j];
                    sal[1][i][j] = arrImage[1][i][j];
                    sal[2][i][j] = arrImage[2][i][j];
                }
                /*sal[0][i][j] = prom > umbral ? 255 : 0;
                sal[1][i][j] = sal[0][i][j];
                sal[2][i][j] = sal[0][i][j];*/
            }
        }
        return sal;
    };
    MathImg.toDesfaceX = function (img, des) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                sal[1][i][j] = arrImage[1][i][j];
                if ((j - des) >= 0) {
                    sal[0][i][j] = arrImage[0][i][j - des];
                }
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                if ((j + des) < cols) {
                    sal[2][i][j] = arrImage[2][i][j + des];
                }
                else {
                    sal[2][i][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.toDesfaceY = function (img, desy) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                sal[1][i][j] = arrImage[1][i][j];
                if ((i - desy) >= 0) {
                    sal[0][i][j] = arrImage[0][i - desy][j];
                }
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                if ((i + desy) < fila) {
                    sal[2][i][j] = arrImage[2][i + desy][j];
                }
                else {
                    sal[2][i][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.toDesfaceD = function (img, des, ang) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        var desx = Math.floor(des * Math.cos(ang * Math.PI / 180));
        var desy = Math.floor(des * Math.sin(ang * Math.PI / 180));
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                sal[1][i][j] = arrImage[1][i][j];
                if ((i - desy) >= 0 && (j - desx) >= 0) {
                    sal[0][i][j] = arrImage[0][i - desy][j - desx];
                }
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                if ((i + desy) < fila && (j + desx) < cols) {
                    sal[2][i][j] = arrImage[2][i + desy][j + desx];
                }
                else {
                    sal[2][i][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.toUmbral2limites = function (img, rangos) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var rangoMin = rangos[0];
        var rangoMax = rangos[1];
        var prome;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                prome = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                if (prome >= rangoMin && prome <= rangoMax) {
                    sal[0][i][j] = 250;
                }
                else
                    sal[0][i][j] = 0;
                sal[1][i][j] = sal[0][i][j];
                sal[2][i][j] = sal[0][i][j];
            }
        }
        return sal;
    };
    MathImg.changeBrightness = function (img, factor) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + factor;
                sal[1][i][j] = arrImage[1][i][j] + factor;
                sal[2][i][j] = arrImage[2][i][j] + factor;
                /*sal[0][i][j] = arrImage[0][i][j] * factor > 255.0 ? 255.0 : arrImage[0][i][j] * factor;
                sal[1][i][j] = arrImage[1][i][j] * factor > 255.0 ? 255.0 : arrImage[1][i][j] * factor;
                sal[2][i][j] = arrImage[2][i][j] * factor > 255.0 ? 255.0 : arrImage[2][i][j] * factor;
              */
            }
        }
        return sal;
    };
    MathImg.cambioFTransferencia = function (img, factores) {
        var arrImage = img.getArrayImg();
        factores.unshift(0, 0);
        var tamFact = factores.length;
        var I1, I2, O1, O2;
        var factor;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var k = 2; k < tamFact; k += 2) {
            I1 = factores[k - 2];
            O1 = factores[k - 1];
            I2 = factores[k];
            O2 = factores[k + 1];
            factor = (O2 - O1) / (I2 - I1);
            //console.log(factor)
            for (var i = 0; i < img.getHeight(); i++) {
                for (var j = 0; j < img.getWidth(); j++) {
                    if (arrImage[0][i][j] >= I1 && arrImage[0][i][j] < I2)
                        sal[0][i][j] = factor * (arrImage[0][i][j] - I1) + O1;
                    if (arrImage[1][i][j] >= I1 && arrImage[1][i][j] < I2)
                        sal[1][i][j] = factor * (arrImage[1][i][j] - I1) + O1;
                    if (arrImage[2][i][j] >= I1 && arrImage[2][i][j] < I2)
                        sal[2][i][j] = factor * (arrImage[2][i][j] - I1) + O1;
                }
            }
        }
        return sal;
    };
    MathImg.relativeBrightness = function (img) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray2D(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                //si el valor del pixel > umbral, entoncesa calculo el brillo
                //si no el brillo =0
                sal[0][i][j] = Math.sqrt(Math.pow(arrImage[0][i][j], 2) * 0.299 +
                    Math.pow(arrImage[1][i][j], 2) * 0.587 +
                    Math.pow(arrImage[2][i][j], 2) * 0.114) / 100.0;
                sal[1][i][j] = 'rgb(' + arrImage[0][i][j] + ',' + arrImage[1][i][j] + ',' + arrImage[2][i][j] + ')';
            }
        }
        return sal;
    };
    /**
     * Metodo para Generar el contraste de una Imagen
     * @img  ImageType tipo de imagen donde se guarda una matriz tridimencional
     * @return number[][][] es la imagen de salida con contraste
     */
    MathImg.changeContraste = function (img, valor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        //
        var cR, cG, cB;
        var contraste;
        contraste = (valor + 100) / 100;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                cR = ((((arrImage[0][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cR > 255)
                    cR = 255;
                if (cR < 0)
                    cR = 0;
                sal[0][i][j] = cR;
                cG = ((((arrImage[1][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cG > 255)
                    cG = 255;
                if (cG < 0)
                    cG = 0;
                sal[1][i][j] = cG;
                cB = ((((arrImage[2][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cB > 255)
                    cB = 255;
                if (cB < 0)
                    cB = 0;
                sal[2][i][j] = cB;
            }
        }
        return sal;
    };
    MathImg.colorGradienteX = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        var r1, r2, b1, b2, g1, g2;
        var dr, dg, db, dir;
        r1 = factores[0];
        g1 = factores[1];
        b1 = factores[2];
        r2 = factores[3];
        g2 = factores[4];
        b2 = factores[5];
        dr = (r2 - r1) / img.getWidth();
        dg = (g2 - g1) / img.getWidth();
        db = (b2 - b1) / img.getWidth();
        for (var j = 0; j < img.getWidth(); j++) {
            for (var i = 0; i < img.getHeight(); i++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = Math.floor(prom * r1 / 255);
                sal[1][i][j] = Math.floor(prom * g1 / 255);
                sal[2][i][j] = Math.floor(prom * b1 / 255);
            }
            r1 += dr;
            g1 += dg;
            b1 += db;
        }
        return sal;
    };
    MathImg.colorGradientY = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        var r1, r2, b1, b2, g1, g2;
        var dr, dg, db;
        r1 = factores[0];
        g1 = factores[1];
        b1 = factores[2];
        r2 = factores[3];
        g2 = factores[4];
        b2 = factores[5];
        dr = (r2 - r1) / img.getHeight();
        dg = (g2 - g1) / img.getHeight();
        db = (b2 - b1) / img.getHeight();
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = Math.floor(prom * r1 / 255);
                sal[1][i][j] = Math.floor(prom * g1 / 255);
                sal[2][i][j] = Math.floor(prom * b1 / 255);
            }
            r1 += dr;
            g1 += dg;
            b1 += db;
        }
        return sal;
    };
    MathImg.pow = function (img, power) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.pow(arrImage[0][i][j], power);
                sal[1][i][j] = Math.pow(arrImage[1][i][j], power);
                sal[2][i][j] = Math.pow(arrImage[2][i][j], power);
            }
        }
        return sal;
    };
    MathImg.toCos = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.cos(arrImage[0][i][j]);
                sal[1][i][j] = Math.cos(arrImage[1][i][j]);
                sal[2][i][j] = Math.cos(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toSubtract = function (img, escalar) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] - escalar;
                sal[1][i][j] = arrImage[1][i][j] - escalar;
                sal[2][i][j] = arrImage[2][i][j] - escalar;
            }
        }
        return sal;
    };
    MathImg.toMultiplication = function (img, valor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = valor * arrImage[0][i][j];
                sal[1][i][j] = valor * arrImage[1][i][j];
                sal[2][i][j] = valor * arrImage[2][i][j];
            }
        }
        return sal;
    };
    MathImg.toSine = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.sin(arrImage[0][i][j]);
                sal[1][i][j] = Math.sin(arrImage[1][i][j]);
                sal[2][i][j] = Math.sin(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toAdd = function (img, sumar) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + sumar;
                sal[1][i][j] = arrImage[1][i][j] + sumar;
                sal[2][i][j] = arrImage[2][i][j] + sumar;
            }
        }
        return sal;
    };
    MathImg.toDividir = function (img, dividir) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] / dividir;
                sal[1][i][j] = arrImage[1][i][j] / dividir;
                sal[2][i][j] = arrImage[2][i][j] / dividir;
            }
        }
        return sal;
    };
    MathImg.toSqrt = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.sqrt(arrImage[0][i][j]);
                sal[1][i][j] = Math.sqrt(arrImage[1][i][j]);
                sal[2][i][j] = Math.sqrt(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toTan = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.tan(arrImage[0][i][j]);
                sal[1][i][j] = Math.tan(arrImage[1][i][j]);
                sal[2][i][j] = Math.tan(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.addImg = function (img, img2) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        var arrImage2 = img2.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + 0.2 * arrImage2[0][i][j];
                sal[1][i][j] = arrImage[1][i][j] + 0.2 * arrImage2[1][i][j];
                sal[2][i][j] = arrImage[2][i][j] + 0.2 * arrImage2[2][i][j];
            }
        }
        return sal;
    };
    MathImg.marcaAguaCentro = function (img, img2, porc) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage;
        var arrImage2;
        var width;
        var height;
        var sal;
        var midW, midH;
        var midsmallW, midsmallH;
        var widthsmall, heightsmall;
        if (img.getWidth() > img2.getWidth()) {
            arrImage = img.getArrayImg();
            arrImage2 = img2.getArrayImg();
            width = img.getWidth();
            height = img.getHeight();
            widthsmall = img2.getWidth();
            heightsmall = img2.getHeight();
            sal = this.initArray(img.getWidth(), img.getHeight());
        }
        else {
            arrImage2 = img.getArrayImg();
            arrImage = img2.getArrayImg();
            width = img2.getWidth();
            height = img2.getHeight();
            widthsmall = img.getWidth();
            heightsmall = img.getHeight();
            sal = this.initArray(img2.getWidth(), img2.getHeight());
        }
        midW = Math.floor(width / 2);
        midH = Math.floor(height / 2);
        midsmallW = Math.floor(widthsmall / 2);
        midsmallH = Math.floor(heightsmall / 2);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        for (var i = 0; i < heightsmall; i++) {
            for (var j = 0; j < widthsmall; j++) {
                sal[0][midH - midsmallH + i][midW - midsmallW + j] += arrImage2[0][i][j] * porc;
                sal[1][midH - midsmallH + i][midW - midsmallW + j] += arrImage2[1][i][j] * porc;
                sal[2][midH - midsmallH + i][midW - midsmallW + j] += arrImage2[2][i][j] * porc;
            }
        }
        return sal;
    };
    MathImg.marcaAguaArray = function (img, img2, porc) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage;
        var arrImage2;
        var width;
        var height;
        var sal;
        var widthsmall, heightsmall;
        var noVecesAncho, noVecesAlto;
        if (img.getWidth() > img2.getWidth()) {
            arrImage = img.getArrayImg();
            arrImage2 = img2.getArrayImg();
            width = img.getWidth();
            height = img.getHeight();
            widthsmall = img2.getWidth();
            heightsmall = img2.getHeight();
            sal = this.initArray(img.getWidth(), img.getHeight());
        }
        else {
            arrImage2 = img.getArrayImg();
            arrImage = img2.getArrayImg();
            width = img2.getWidth();
            height = img2.getHeight();
            widthsmall = img.getWidth();
            heightsmall = img.getHeight();
            sal = this.initArray(img2.getWidth(), img2.getHeight());
        }
        noVecesAncho = Math.floor(width / widthsmall);
        noVecesAlto = Math.floor(height / heightsmall);
        for (var w = 0; w <= noVecesAlto; w++) {
            for (var v = 0; v <= noVecesAncho; v++) {
                for (var i = 0; i < heightsmall; i++) {
                    for (var j = 0; j < widthsmall; j++) {
                        if ((i + w * heightsmall) < height && (j + v * widthsmall) < width) {
                            sal[0][i + w * heightsmall][j + v * widthsmall] = arrImage[0][i + w * heightsmall][j + v * widthsmall] + arrImage2[0][i][j] * porc;
                            sal[1][i + w * heightsmall][j + v * widthsmall] = arrImage[1][i + w * heightsmall][j + v * widthsmall] + arrImage2[1][i][j] * porc;
                            sal[2][i + w * heightsmall][j + v * widthsmall] = arrImage[2][i + w * heightsmall][j + v * widthsmall] + arrImage2[2][i][j] * porc;
                        }
                        //else
                        // break;
                    }
                }
            }
        }
        return sal;
    };
    MathImg.hist = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = new Array(3);
        sal[0] = new Array(256);
        sal[1] = new Array(256);
        sal[2] = new Array(256);
        for (var i = 0; i < 256; i++) {
            sal[0][i] = 0;
            sal[1][i] = 0;
            sal[2][i] = 0;
        }
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                //console.log(arrImage[0][i][j], i,j )
                sal[0][arrImage[0][i][j]]++;
                sal[1][arrImage[1][i][j]]++;
                sal[2][arrImage[2][i][j]]++;
            }
        }
        //console.log(sal[0])
        return sal;
    };
    MathImg.histAcum = function (h) {
        //variable donde guardamos la salida
        var hist = new Array(3);
        hist[0] = new Array(256);
        hist[1] = new Array(256);
        hist[2] = new Array(256);
        hist[0][0] = h[0][0];
        hist[1][0] = h[1][0];
        hist[2][0] = h[2][0];
        for (var i = 1; i < h[0].length; i++) {
            hist[0][i] = hist[0][i - 1] + h[0][i];
            hist[1][i] = hist[1][i - 1] + h[1][i];
            hist[2][i] = hist[2][i - 1] + h[2][i];
            //if(i==255)
        }
        return hist;
    };
    MathImg.ecualizar = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var h = this.hist(img);
        var hA = this.histAcum(h);
        var fT;
        fT = new Array(3);
        fT[0] = new Array(256);
        fT[2] = new Array(256);
        fT[1] = new Array(256);
        for (var i = 0; i < 256; i++) {
            fT[0][i] = Math.floor(hA[0][i] * 255.0 / hA[0][255]);
            fT[1][i] = Math.floor(hA[1][i] * 255.0 / hA[1][255]);
            fT[2][i] = Math.floor(hA[2][i] * 255.0 / hA[2][254]);
        }
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = fT[0][arrImage[0][i][j]];
                sal[1][i][j] = fT[1][arrImage[1][i][j]];
                sal[2][i][j] = fT[2][arrImage[2][i][j]];
            }
        }
        return sal;
    };
    MathImg.erosionar = function (img, vec8) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        var vecinos, valorComp = 4;
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos == valorComp) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.dilatar = function (img, vec8) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        var vecinos, valorComp = 4;
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.apertura = function (img, vec8) {
        var arrImage = this.erosionar(img, vec8);
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var vecinos, valorComp = 4;
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.cierre = function (img, vec8) {
        var arrImage = this.dilatar(img, vec8);
        var vecinos, valorComp = 4;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos == valorComp) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.fromRGBtoHSI = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var hue;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                arrImage[0][i][j] /= 255.0;
                arrImage[1][i][j] /= 255.0;
                arrImage[2][i][j] /= 255.0;
                hue = 180 / Math.PI * Math.acos(0.5 * ((arrImage[0][i][j] - arrImage[1][i][j]) + (arrImage[0][i][j] - arrImage[2][i][j])) /
                    Math.sqrt(Math.pow(arrImage[0][i][j] - arrImage[1][i][j], 2) + (arrImage[0][i][j] - arrImage[2][i][j]) * (arrImage[1][i][j] - arrImage[2][i][j])));
                sal[0][i][j] = arrImage[2][i][j] > arrImage[1][i][j] ? 360 - hue : hue;
                sal[1][i][j] = 1 - (3 * Math.min(arrImage[0][i][j], arrImage[1][i][j], arrImage[2][i][j])) / (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]);
                sal[2][i][j] = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
            }
        }
        return sal;
    };
    MathImg.fromHSItoRGB = function (arrImage) {
        //variable que guarda el arreglo 3d de la imagen de color
        var width;
        var height;
        height = arrImage[0].length;
        width = arrImage[0][0].length;
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        var hue;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                //H de 0 - 120
                if (arrImage[0][i][j] >= 0 && arrImage[0][i][j] < 120) {
                    sal[0][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j]))) /
                        (Math.cos(this.toRad(60 - arrImage[0][i][j]))));
                    sal[2][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
                    sal[1][i][j] = 3 * arrImage[2][i][j] - sal[0][i][j] - sal[2][i][j];
                }
                else if (arrImage[0][i][j] >= 120 && arrImage[0][i][j] < 240) {
                    sal[0][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
                    sal[1][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j] - 120))) /
                        (Math.cos(this.toRad(180 - arrImage[0][i][j]))));
                    sal[2][i][j] = 3 * arrImage[2][i][j] - sal[0][i][j] - sal[1][i][j];
                }
                else if (arrImage[0][i][j] >= 240 && arrImage[0][i][j] < 360) {
                    sal[1][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
                    sal[2][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j] - 240))) /
                        (Math.cos(this.toRad(300 - arrImage[0][i][j]))));
                    sal[0][i][j] = 3 * arrImage[2][i][j] - sal[1][i][j] - sal[2][i][j];
                }
                sal[0][i][j] *= 255.0;
                sal[1][i][j] *= 255.0;
                sal[2][i][j] *= 255.0;
            }
        }
        return sal;
    };
    MathImg.toRad = function (grados) {
        return (grados * Math.PI / 180);
    };
    MathImg.falseColorByHue = function (arrImage, hue, newHue) {
        var width;
        var height;
        height = arrImage[0].length;
        width = arrImage[0][0].length;
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        var range = 25;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                //si hue es menor a cero estamos en el rango de 360 bajos, por lo que hay que revisar esos valores
                if ((hue - range) < 0) {
                    if (Math.abs(hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else if ((360 + hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else {
                        sal[0][i][j] = arrImage[0][i][j];
                    }
                }
                else if ((hue + range) > 360) {
                    if (Math.abs(hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else if ((-360 + hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else {
                        sal[0][i][j] = arrImage[0][i][j];
                    }
                } // si no se rebasa del cero
                else if (Math.abs(hue - arrImage[0][i][j]) < range) {
                    sal[0][i][j] = newHue;
                } // si no se rebasa del rango
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        return sal;
    };
    //aqui va ir el codigo de la trasnformacion bilineal  
    MathImg.bilineal = function () {
        return 0;
    };
    MathImg.pulso = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        sal[0][Math.floor(height / 2)][Math.floor(width / 2)] = 255;
        sal[1][Math.floor(height / 2)][Math.floor(width / 2)] = 255;
        sal[2][Math.floor(height / 2)][Math.floor(width / 2)] = 255;
        return sal;
    };
    MathImg.ruido = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = (Math.random() * 256) > 128 ? 255 : 0;
                sal[1][i][j] = sal[0][i][j];
                sal[2][i][j] = sal[0][i][j];
            }
        }
        return sal;
    };
    MathImg.rampaX = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = j;
                sal[1][i][j] = j;
                sal[2][i][j] = j;
            }
        }
        return sal;
    };
    MathImg.rampaY = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = i;
                sal[1][i][j] = i;
                sal[2][i][j] = i;
            }
        }
        return sal;
    };
    MathImg.escalar = function (img, factor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = Math.floor(img.getHeight() * factor), newWitdh = Math.floor(img.getWidth() * factor);
        var sal = this.initArray(newWitdh, newHeight);
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newWitdh; j++) {
                sal[0][i][j] = arrImage[0][Math.floor(i / factor)][Math.floor(j / factor)];
                sal[1][i][j] = arrImage[1][Math.floor(i / factor)][Math.floor(j / factor)];
                sal[2][i][j] = arrImage[2][Math.floor(i / factor)][Math.floor(j / factor)];
            }
        }
        /*
        for (let i = 0; i < img.getHeight(); i++) {
          for (let j = 0; j < img.getWidth(); j++) {
            sal[0][Math.floor(i*factor)][Math.floor(j*factor)] = arrImage[0][i][j] ;
            sal[1][Math.floor(i*factor)][Math.floor(j*factor)] = arrImage[1][i][j] ;
            sal[2][Math.floor(i*factor)][Math.floor(j*factor)] = arrImage[2][i][j] ;
          }
        }*/
        return sal;
    };
    MathImg.rotar = function (img, angulo) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = img.getHeight(), newWitdh = img.getWidth();
        var sal = this.initArray(newWitdh, newHeight);
        var xP = newWitdh / 2, yP = newHeight / 2;
        var phi = (angulo * Math.PI / 180), c = Math.cos(phi), s = Math.sin(phi), r11 = c, r12 = s, r21 = -s, r22 = c, r31 = -xP * c + yP * s + xP, r32 = -xP * s - yP * c + yP;
        var nX, nY;
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newWitdh; j++) {
                nX = Math.floor(j * r11 + i * r21 + r31);
                nY = Math.floor(j * r12 + i * r22 + r32);
                debugger;
                if ((nX >= 0 && nX < newWitdh) && (nY >= 0 && nY < newHeight)) {
                    sal[0][i][j] = arrImage[0][nY][nX];
                    sal[1][i][j] = arrImage[1][nY][nX];
                    sal[2][i][j] = arrImage[2][nY][nX];
                }
            }
        }
        return sal;
    };
    MathImg.shearingX = function (img, factor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = img.getHeight(), newWitdh = img.getWidth();
        var sal = this.initArray(newWitdh, newHeight);
        console.log(newWitdh, newHeight);
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newWitdh; j++) {
                if ((j + Math.floor(factor * i)) < newWitdh) {
                    sal[0][i][j + Math.floor(factor * i)] = arrImage[0][i][j];
                    sal[1][i][j + Math.floor(factor * i)] = arrImage[1][i][j];
                    sal[2][i][j + Math.floor(factor * i)] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.shearingY = function (img, factor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = img.getHeight(), newWitdh = img.getWidth();
        var sal = this.initArray(newWitdh, newHeight);
        console.log(newWitdh, newHeight);
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newHeight; j++) {
                if ((i + Math.floor(factor * j)) < newWitdh) {
                    sal[0][i + Math.floor(factor * j)][j] = arrImage[0][i][j];
                    sal[1][i + Math.floor(factor * j)][j] = arrImage[1][i][j];
                    sal[2][i + Math.floor(factor * j)][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.tAfin = function (img, factores) {
        var x1a = 0, x2a = img.getWidth(), x3a = 0;
        var y1a = 0, y2a = 0, y3a = img.getHeight();
        var x1r = factores[0], x2r = factores[2], x3r = factores[4];
        var y1r = factores[1], y2r = factores[3], y3r = factores[5];
        var x4r = x2r - x1r;
        var y4r = y1r + y2r + y3r;
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = y4r - y1r, newWitdh = x2r - x3r;
        var sal = this.initArray(newWitdh, newHeight);
        /*
        for (let i = 0; i < newHeight; i++) {
          for (let j = 0; j < newHeight; j++) {
            if ((i+ Math.floor(factor*j)) < newWitdh) {
              sal[0][i+ Math.floor(factor*j)][j] = arrImage[0][i][j];
              sal[1][i+ Math.floor(factor*j)][j] = arrImage[1][i][j];
              sal[2][i+ Math.floor(factor*j)][j] = arrImage[2][i][j];
            }
          }
        }
      */
        return sal;
    };
    MathImg.superponerRuidoBordes = function (img, borderWidth) {
        // Obtiene el ancho y alto de la imagen original
        var width = img.getWidth();
        var height = img.getHeight();
        // Obtiene el arreglo 3D de la imagen original
        var arrImage = img.getArrayImg();
        // Inicializa el arreglo de salida con los colores originales
        var sal = this.initArray(width, height);
        // Aplica el ruido tipo estática de televisor en los píxeles del borde
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                if (i < borderWidth ||
                    i >= height - borderWidth ||
                    j < borderWidth ||
                    j >= width - borderWidth) {
                    // Estamos en el borde, aplica ruido tipo estática de televisor
                    var noise = Math.random() * 90 - 25;
                    sal[0][i][j] = this.clamp(arrImage[0][i][j] + noise);
                    sal[1][i][j] = this.clamp(arrImage[1][i][j] + noise);
                    sal[2][i][j] = this.clamp(arrImage[2][i][j] + noise);
                }
                else {
                    // Mantén los colores originales
                    sal[0][i][j] = arrImage[0][i][j];
                    sal[1][i][j] = arrImage[1][i][j];
                    sal[2][i][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.clamp = function (value) {
        return Math.max(0, Math.min(255, value));
    };
    MathImg.matrixCodeRain = function (img, codeSpeed) {
        var codeSymbols = ["0", "1", " ", " ", " ", " ", " ", " ", " ", " "]; // Símbolos para representar el código
        var codeIntensity = 200; // Intensidad del color verde para el código
        var width = img.getWidth();
        var height = img.getHeight();
        var arrImage = img.getArrayImg();
        var codeRain = this.initArray(width, height);
        // Copia la imagen original
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                codeRain[0][i][j] = arrImage[0][i][j];
                codeRain[1][i][j] = arrImage[1][i][j];
                codeRain[2][i][j] = arrImage[2][i][j];
            }
        }
        // Aplica el código cayendo
        for (var j = 0; j < width; j++) {
            var codeLength = Math.floor(Math.random() * 15) + 5; // Longitud aleatoria del código
            var startRow = Math.floor(Math.random() * (height - codeLength));
            for (var i = 0; i < codeLength; i++) {
                var symbolIndex = Math.floor(Math.random() * codeSymbols.length);
                var symbol = codeSymbols[symbolIndex];
                // Superpone el código verde sobre la imagen original
                codeRain[0][startRow + i][j] = 0;
                codeRain[1][startRow + i][j] = codeIntensity;
                codeRain[2][startRow + i][j] = 0;
            }
        }
        return codeRain;
    };
    MathImg.mosaico = function (img, blockSize) {
        var width = img.getWidth();
        var height = img.getHeight();
        var arrImage = img.getArrayImg();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i += blockSize) {
            for (var j = 0; j < width; j += blockSize) {
                var avgColor = this.getAverageColor(arrImage, j, i, blockSize, width, height);
                this.fillBlock(sal, j, i, blockSize, avgColor, width, height);
            }
        }
        return sal;
    };
    MathImg.getAverageColor = function (arrImage, startX, startY, blockSize, width, height) {
        var totalPixels = Math.min(blockSize, width - startX) * Math.min(blockSize, height - startY);
        var sumR = 0, sumG = 0, sumB = 0;
        for (var y = startY; y < Math.min(startY + blockSize, height); y++) {
            for (var x = startX; x < Math.min(startX + blockSize, width); x++) {
                sumR += arrImage[0][y][x];
                sumG += arrImage[1][y][x];
                sumB += arrImage[2][y][x];
            }
        }
        return [sumR / totalPixels, sumG / totalPixels, sumB / totalPixels];
    };
    MathImg.fillBlock = function (arr, startX, startY, blockSize, color, width, height) {
        for (var y = startY; y < Math.min(startY + blockSize, height); y++) {
            for (var x = startX; x < Math.min(startX + blockSize, width); x++) {
                arr[0][y][x] = color[0];
                arr[1][y][x] = color[1];
                arr[2][y][x] = color[2];
            }
        }
    };
    MathImg.efectoAcuarela = function (arrImage) {
        var width = arrImage[0][0].length;
        var height = arrImage[0].length;
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                // Modifica los valores de cada canal de color según el efecto de acuarela
                sal[0][i][j] = arrImage[0][i][j] * 0.7 + arrImage[1][i][j] * 0.2;
                sal[1][i][j] = arrImage[0][i][j] * 0.3 + arrImage[1][i][j] * 0.8;
                sal[2][i][j] = arrImage[0][i][j] * 0.1 + arrImage[1][i][j] * 0.1 + arrImage[2][i][j] * 0.8;
            }
        }
        return sal;
    };
    MathImg.efectoPinturaDePuntos = function (arrImage) {
        var width = arrImage[0][0].length;
        var height = arrImage[0].length;
        var sal = this.initArray(width, height);
        var umbralLaplaciano = 50;
        var umbralDiferencia = 30;
        for (var i = 1; i < height - 1; i++) {
            for (var j = 1; j < width - 1; j++) {
                var laplacianoR = -arrImage[0][i - 1][j] - arrImage[0][i][j - 1] + 4 * arrImage[0][i][j] - arrImage[0][i][j + 1] - arrImage[0][i + 1][j];
                var laplacianoG = -arrImage[1][i - 1][j] - arrImage[1][i][j - 1] + 4 * arrImage[1][i][j] - arrImage[1][i][j + 1] - arrImage[1][i + 1][j];
                var laplacianoB = -arrImage[2][i - 1][j] - arrImage[2][i][j - 1] + 4 * arrImage[2][i][j] - arrImage[2][i][j + 1] - arrImage[2][i + 1][j];
                var diferenciaR = Math.abs(arrImage[0][i][j] - laplacianoR);
                var diferenciaG = Math.abs(arrImage[1][i][j] - laplacianoG);
                var diferenciaB = Math.abs(arrImage[2][i][j] - laplacianoB);
                var resaltoR = diferenciaR > umbralDiferencia && laplacianoR > umbralLaplaciano ? 255 : 0;
                var resaltoG = diferenciaG > umbralDiferencia && laplacianoG > umbralLaplaciano ? 255 : 0;
                var resaltoB = diferenciaB > umbralDiferencia && laplacianoB > umbralLaplaciano ? 255 : 0;
                sal[0][i][j] = resaltoR;
                sal[1][i][j] = resaltoG;
                sal[2][i][j] = resaltoB;
            }
        }
        return sal;
    };
    MathImg.efectoCaricatura = function (arrImage) {
        var width = arrImage[0][0].length;
        var height = arrImage[0].length;
        var sal = this.initArray(width, height);
        // Ajusta las proporciones y resalta características faciales
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var r = arrImage[0][i][j];
                var g = arrImage[1][i][j];
                var b = arrImage[2][i][j];
                // Ajusta las proporciones (puedes experimentar con estos valores)
                var nuevaR = r + 0.2 * (r - g);
                var nuevaG = g + 0.2 * (g - r);
                var nuevaB = b + 0.2 * (b - r);
                // Resalta características faciales (puedes ajustar estos umbrales)
                var umbral = 50;
                var media = (r + g + b) / 3;
                var caricaturaR = r > media + umbral ? 255 : nuevaR;
                var caricaturaG = g > media + umbral ? 255 : nuevaG;
                var caricaturaB = b > media + umbral ? 255 : nuevaB;
                sal[0][i][j] = caricaturaR;
                sal[1][i][j] = caricaturaG;
                sal[2][i][j] = caricaturaB;
            }
        }
        return sal;
    };
    MathImg.efectocamaratermica = function (arrImage) {
        var width = arrImage[0][0].length;
        var height = arrImage[0].length;
        var sal = this.initArray(width, height);
        var intensidadNiebla = 30; // Ajusta la intensidad de la niebla según tus preferencias
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                // Calcula el valor promedio de los canales de color
                var promedioColor = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = arrImage[0][i][j] + intensidadNiebla * (promedioColor - arrImage[0][i][j]);
                sal[1][i][j] = arrImage[1][i][j] + intensidadNiebla * (promedioColor - arrImage[1][i][j]);
                sal[2][i][j] = arrImage[2][i][j] + intensidadNiebla * (promedioColor - arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.Cuadricula = function (arrImage) {
        var width = arrImage[0][0].length;
        var height = arrImage[0].length;
        var sal = this.initArray(width, height);
        // Parámetros ajustables para controlar el efecto Off Grid Suave
        var tamañoCuadrado = 20;
        var desplazamientoX = 10;
        var desplazamientoY = 10;
        var intensidad = 0.5; // Intensidad del efecto, 0 significa sin cambios, 1 significa máximo cambio
        // Aplica el efecto
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var cuadroX = Math.floor(j / tamañoCuadrado) * tamañoCuadrado + desplazamientoX;
                var cuadroY = Math.floor(i / tamañoCuadrado) * tamañoCuadrado + desplazamientoY;
                // Calcula las coordenadas en la imagen original
                var xOriginal = Math.floor((cuadroX + width) % width);
                var yOriginal = Math.floor((cuadroY + height) % height);
                // Mezcla los colores originales con los colores del cuadro actual
                sal[0][i][j] = arrImage[0][i][j] * (1 - intensidad) + arrImage[0][yOriginal][xOriginal] * intensidad;
                sal[1][i][j] = arrImage[1][i][j] * (1 - intensidad) + arrImage[1][yOriginal][xOriginal] * intensidad;
                sal[2][i][j] = arrImage[2][i][j] * (1 - intensidad) + arrImage[2][yOriginal][xOriginal] * intensidad;
            }
        }
        return sal;
    };
    MathImg.blancoNegroUmbralDinamico = function (arrImage, umbralUsuario) {
        var width = arrImage[0][0].length;
        var height = arrImage[0].length;
        var sal = this.initArray(width, height);
        // Aplica el umbral dinámico proporcionado por el usuario
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var intensity = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = intensity > umbralUsuario ? 255 : 0;
                sal[1][i][j] = sal[0][i][j];
                sal[2][i][j] = sal[0][i][j];
            }
        }
        return sal;
    };
    MathImg.aplicarZoom = function (img, porcentajeZoom) {
        if (porcentajeZoom <= 0) {
            console.error('El porcentaje de zoom debe ser mayor que cero.');
            return img.getArrayImg(); // Devuelve la imagen original si el porcentaje de zoom no es válido
        }
        var factorZoom = 1 + porcentajeZoom / 100;
        var width = img.getWidth();
        var height = img.getHeight();
        var arrImage = img.getArrayImg();
        var newWidth = Math.floor(width * factorZoom);
        var newHeight = Math.floor(height * factorZoom);
        var sal = this.initArray(newWidth, newHeight);
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newWidth; j++) {
                var originalX = Math.floor(j / factorZoom);
                var originalY = Math.floor(i / factorZoom);
                sal[0][i][j] = arrImage[0][originalY][originalX];
                sal[1][i][j] = arrImage[1][originalY][originalX];
                sal[2][i][j] = arrImage[2][originalY][originalX];
            }
        }
        return sal;
    };
    return MathImg;
}());
export { MathImg };
