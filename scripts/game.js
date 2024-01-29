// координаты персонажа
let timonX = 0;

// координаты, количество, ограничение спавна для гиен, кол-во шагов
let gienaX = 0;
let gienaCount = 0;
let minX = 300;
let maxX = 1700;
let stepsGiena = 0;

// координаты и кол-во гусениц
let caterpillarX1 = 0;
let caterpillarY1 = 198;
let caterpillarX2 = 0;
let caterpillarY2 = 198;

// координаты и кол-во препятствий
let boxX = 0;
let boxCount = 0;

// прыжок гл. персонажа (переменные)
let left = 0;
let isJumping = false;

// результат пользователя
let userResult = 0
let numberCaterpillars = 0

// объекты игры
const Timon = document.querySelector("#timon");
const Giena = document.querySelector(".giena");
const Caterpillar1 = document.querySelector("#caterpillar1")
const Caterpillar2 = document.querySelector("#caterpillar2")
const Box = document.querySelector(".box");

// Генерация координат
function generatedCordes() {
    // генератор координат(отдельная ф-ия)
    function generateCord(minX, maxX) {
        let rand = minX + Math.random() * (maxX + 1 - minX);
        return Math.floor(rand);
    }

// рандомные координаты объектов
    function randomCord() {
        // спавн препятствий
            boxX = generateCord(minX, maxX);
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

// таймер
function updateTime() {
    if (!pause) {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// обновление хп
function updateHp() {
    if (!pause){
        actualHp--;
        if (actualHp <= 0 || timonX > 1790) {
            clearInterval(hpInt);
            clearInterval(timeInt);
            clearInterval(moveGiena);
            startFlag = false
            endScreen.classList.add('nothide');
            if (actualHp > 0){
                userResult = 1000 - (minutes * 60 + seconds) + numberCaterpillars * 10;
            }
            else {
                userResult = 0;
            }
        }
        hp.textContent = `Кол-во здоровья: ${actualHp}`;
        Result.textContent = `Ваш результат: ${userResult}`;
        eatenCaterpillars.textContent = `Съединных гусениц: ${numberCaterpillars}`
    }
}

// движение гиены
function moveGiena() {
    if (!pause && actualHp > 0 && timonX < 1790) {
        let currentPosition = parseInt(Giena.style.left) || 0;
        let maxWidth = window.innerWidth - Giena.clientWidth;
        if (currentPosition >= 0 && leftFlag) {
            Giena.style.left = Math.max(currentPosition - 100, 0) + 'px';
            stepsGiena += 1;
            if (stepsGiena === 5) {
                leftFlag = !leftFlag;
                Giena.classList.add('mirror');
                stepsGiena = 0;
            }
        }
        else if (!leftFlag && currentPosition < maxWidth) {
            Giena.style.left = Math.min(currentPosition + 100, maxWidth) + 'px';
            stepsGiena += 1;
            if (stepsGiena === 5) {
                leftFlag = !leftFlag;
                Giena.classList.remove('mirror');
                stepsGiena = 0;
            }
        }
    }
}

// прыжок гл. персонажа
function jump() {
    let jumpHeight = 250;
    let jumpDuration = 1700;
    const startTime = Date.now();

    function jumpStep() {
        const remainingTime = Date.now() - startTime;
        const progress = Math.min(remainingTime / jumpDuration, 1);
        const jumpValue = Math.sin(progress * Math.PI) * jumpHeight;

        Timon.style.bottom = jumpValue + 'px';
        if (progress < 1 && !pause) {
            requestAnimationFrame(jumpStep);
        }
        else {
            isJumping = false;
            Timon.style.bottom = 0 + 'px';
        }
    }
    requestAnimationFrame(jumpStep);
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
        if (parseInt(Timon.style.bottom) <= 0 && parseInt(Timon.style.bottom) > -200) {
            Timon.classList.add('hide');
            Timon.classList.remove('nothide');
        }
        if (parseInt(Timon.style.bottom) > 0) {
            Timon.style.bottom = Timon.style.bottom - 100 + 'px';
            Timon.classList.add('nothide');
            Timon.classList.remove('hide');
        }
    }

    if (ev.key === 'ArrowUp' && !pause && startFlag) {
        if (parseInt(Timon.style.bottom) >= 0 && parseInt(Timon.style.bottom) < 200) {
            Timon.classList.add('nothide');
            Timon.classList.remove('hide')
        }
        if (parseInt(Timon.style.bottom) < 0) {
            Timon.classList.toggle('nothide');
        }
        jump();
    }
}

// Реализация коллизии персонажей
function Collision() {
    let timonPosition = Timon.getBoundingClientRect()
    let caterpillar1Position = Caterpillar1.getBoundingClientRect()
    let caterpillar2Position = Caterpillar2.getBoundingClientRect()
    let gienaPosition = Giena.getBoundingClientRect()

    if (timonPosition.x + timonPosition.width >= caterpillar1Position.x &&
        caterpillar1Position.x + caterpillar1Position.width >= timonPosition.x &&
        timonPosition.y + timonPosition.height >= caterpillar1Position.y &&
        caterpillar1Position.y + caterpillar1Position.height >= timonPosition.y)
    {
        actualHp += 6
        numberCaterpillars += 1
        Caterpillar1.classList.remove('nothide');
        Caterpillar1.classList.add('hide');
        return false;
    }
    if (timonPosition.x + timonPosition.width >= caterpillar2Position.x &&
        caterpillar2Position.x + caterpillar2Position.width >= timonPosition.x &&
        timonPosition.y + timonPosition.height >= caterpillar2Position.y &&
        caterpillar2Position.y + caterpillar2Position.height >= timonPosition.y){
        actualHp += 6
        numberCaterpillars += 1
        Caterpillar2.classList.remove('nothide');
        Caterpillar2.classList.add('hide');
        return false;
    }

    if (timonPosition.x + timonPosition.width >= gienaPosition.x &&
        gienaPosition.x + gienaPosition.width >= timonPosition.x &&
        timonPosition.y + timonPosition.height >= gienaPosition.y &&
        gienaPosition.y + gienaPosition.height >= timonPosition.y) {
        actualHp -= 30;
    }
    return true;
}

