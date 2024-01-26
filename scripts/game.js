// координаты персонажа
let timonX = 0;
let timonY = 0;

// координаты, количество, ограничение спавна для гиен
let gienaX = 0;
let gienaCount = 0;
let minX = 300;
let maxX = 1700;

// координаты и кол-во гусениц
let caterpillarX1 = 0;
let caterpillarY1 = 198;
let caterpillarX2 = 0;
let caterpillarY2 = 198;

// координаты и кол-во препятствий
let boxX = 0;
let boxCount = 0;

// объекты игры
const Timon = document.querySelector("#timon");
const Giena = document.querySelector(".giena");
const Box = document.querySelector(".box");
const Caterpillar1 = document.querySelector("#caterpillar1")
const Caterpillar2 = document.querySelector("#caterpillar2")


function generatedCordes() {
    // Генерация координат
    function generateCord(minX, maxX) {
        let rand = minX + Math.random() * (maxX + 1 - minX);
        return Math.floor(rand);
    }

// рандомные координаты объектов
    function randomCord() {
        // спавн препятствий
        boxX = generateCord(minX, maxX);
        Box.style.left = boxX + 'px';
        // спавн гиен по оси X
        gienaX = generateCord(minX, maxX);
        Giena.style.left = gienaX + 'px';
    }
// координаты гусеницы относительно препятствий
    function spawnCaterpillar(caterpillarX1, caterpillarY1, caterpillarX2, caterpillarY2){
        caterpillarX1 = boxX - 17;
        Caterpillar1.style.left = caterpillarX1 + 'px';
        Caterpillar1.style.bottom = caterpillarY1 + 'px';
        caterpillarX2 = boxX - 150;
        Caterpillar2.style.left = caterpillarX2 + 'px';
        Caterpillar2.style.bottom = caterpillarY2 + 'px';
    }

    randomCord();
    spawnCaterpillar(caterpillarX1, caterpillarY1, caterpillarX2, caterpillarY2);
}




// движение гл. персонажа
window.onkeydown = function move(ev) {
    if (ev.key === 'ArrowLeft' && !pause && startFlag) {
        if (Timon.classList.contains('hide')){
            return
        }
        if (timonX > 0) {
            timonX = timonX - 25;
            Timon.style.left = timonX + 'px';
            Timon.classList.add('mirror');
        }
    }

    if (ev.key === 'ArrowRight' && !pause && startFlag) {
        if (Timon.classList.contains('hide')){
            return
        }
         if (timonX < 1800 && !pause) {
            timonX = timonX + 25;
            Timon.style.left = timonX + 'px';
            Timon.classList.remove('mirror');
        }
    }

    if (ev.key === 'ArrowDown' && !pause && startFlag) {
        if (timonY <= 0 && timonY > -200) {
            timonY = timonY - 200;
            Timon.style.bottom = timonY + 'px';
            Timon.classList.add('hide');
            Timon.classList.remove('nothide');
        }
        if (timonY > 0) {
            timonY = timonY - 200;
            Timon.style.bottom = timonY + 'px';
            Timon.classList.add('nothide');
            Timon.classList.remove('hide');
        }
    }

    if (ev.key === 'ArrowUp' && !pause && startFlag) {
        if (timonY >= 0 && timonY < 200) {
            timonY = timonY + 200;
            Timon.style.bottom = timonY + 'px';
            Timon.classList.add('hide');
            Timon.classList.remove('nothide');
            Timon.classList.add('nothide');
            Timon.classList.remove('hide')
        }
        if (timonY < 0) {
            timonY = timonY + 200;
            Timon.style.bottom = timonY + 'px';
            Timon.classList.toggle('nothide');
        }
    }

}

