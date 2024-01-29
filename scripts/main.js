const form = document.getElementById("infoPlayer");
const nicknamePlayer = document.querySelector(".nicknamePlayer");
const putNickname = document.getElementById('putNickname');

const readyPlay = document.getElementById('readyPlay')
const video = document.querySelector(".video");
const formPlayer = document.querySelector(".formPlayer");
const timer = document.getElementById('timer');
const hp = document.querySelector('.hp');
const pauseMenu = document.querySelector('.pauseMenu');
const body = document.querySelector('.body');
const game = document.querySelector('.game');
const playAgainButton = document.getElementById('playAgainButton');
const endScreen = document.querySelector('.endScreen')
const videoIntro = document.querySelector("#videoIntro")
const activeInfo = document.querySelector('.activeInfo');
const Result = document.querySelector('.Result');
const eatenCaterpillars = document.querySelector('.eatenCaterpillars')

let startFlag = false;
let leftFlag = true
let pause = false;

let actualHp = 100;
let seconds = 0;
let minutes = 0;

// вывод имени игрока и активация поля ввода
form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const form = ev.target;
    nicknamePlayer.textContent = `Имя игрока: ${putNickname.value}`;
    videoIntro.classList.toggle('nothide');
    formPlayer.classList.toggle('hide');
    if (putNickname.value !== '')
        form.innerHTML = putNickname.value + '<br>' + form.innerHTML;
    putNickname.value = '';
    this.disabled = true;
    startFlag = true;
    generatedCordes();
    gienaInt = setInterval(moveGiena, 1500);
}, false)


// отключение кнопки "начать"
putNickname.addEventListener('input', function () {
    readyPlay.disabled = (putNickname.value === '');
});

// меню "Играть снова"
playAgainButton.addEventListener("click", function (ev) {
    ev.preventDefault();
    startFlag = true;
    endScreen.classList.remove('nothide');
    endScreen.classList.add('hide');
    formPlayer.classList.remove('nothide');
    formPlayer.classList.add('hide');
    actualHp = 100;
    seconds = 0;
    minutes = 0;
    numberCaterpillars = 0;
    Caterpillar1.classList.remove('hide');
    Caterpillar1.classList.add('nothide');
    Caterpillar2.classList.remove('hide');
    Caterpillar2.classList.add('nothide');
    timeInt = setInterval(updateTime, 1000);
    hpInt = setInterval(updateHp, 1000);
    clearInterval(Collision);
    activeInfo.classList.remove('hide');
    activeInfo.classList.add('nothide');
    game.classList.remove('hide');
    game.classList.add('nothide');
    generatedCordes();
    timonX = 0;
    Timon.style.bottom = 0 + 'px';
    Timon.style.left = 0 + 'px';
})

// пауза и пропуск видеоролика
window.onkeyup = function (ev) {
    let start = () => {
        if (formPlayer.classList.contains('hide')) {
            activeInfo.classList.add('nothide');
            game.classList.add('nothide');
            startFlag = true;
            timer.begin = new Date;
            timer.update = ms => timer.innerHTML = new Date(ms).toISOString().split(/T|\./)[1];
            timeInt = setInterval(updateTime, 1000);
            hpInt = setInterval(updateHp, 1000);
            setInterval(Collision,1000);
        }
        else {
            game.classList.add('hide');
        }
    }

    if (ev.code === 'Space' && startFlag) {
        video.classList.remove('nothide');
        video.classList.add('hide');
        start();
    }

    if (ev.key === 'Escape' && startFlag && endScreen.classList.contains('hide')) {
        pause = !pause;
        pauseMenu.classList.toggle('nothide');
    }
};

// скрытие блоков после окончания видео
document.querySelector("video").addEventListener('ended', function () {
    video.classList.remove('nothide');
    video.classList.add('hide');
    activeInfo.classList.add('nothide');
    game.classList.add('nothide');
});
