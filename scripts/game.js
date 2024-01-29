// координаты персонажа
let timonX = 0;

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

// прыжок гл. персонажа (переменные)
let left = 0;
let isJumping = false;

// результат пользователя
let userResult = 0
let eatenCaterpillars = 1

// объекты игры
const Timon = document.querySelector("#timon");
const Giena = document.querySelector(".giena");
const Box = document.querySelector(".box");
const Caterpillar1 = document.querySelector("#caterpillar1")
const Caterpillar2 = document.querySelector("#caterpillar2")

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
            document.body.appendChild(Box);
            for (let i = 0; i < 10; i++) {
                Box[i].style.left =  boxX + 'px';
            }
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
            userResult = 1000 - (minutes * 60 + seconds) + eatenCaterpillars * 10;
        }
        hp.textContent = `Кол-во здоровья: ${actualHp}`;
        Result.textContent = `Ваш результат: ${userResult}`;
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

