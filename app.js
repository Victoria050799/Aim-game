const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const reloadBtn = document.querySelector('#reloadBtn');

let time = 0; 
let score = 0;
const circle = document.createElement('div');

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        getColor();
        startGame();
    }
});

reloadBtn.addEventListener('click', (event) => {
    location.reload();
});

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
        event.target.classList.background = getColor();
    }
});

function startGame() {
    reloadBtn.style.display = 'none';
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreaseTime() {
    if(time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
};

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
};

function createRandomCircle() {
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function finishGame(params) {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score:<span class="primary"> ${score}</span></h1>`;
    reloadBtn.classList.add('reload');
    reloadBtn.style.fontSize = '20px';
    reloadBtn.style.display = 'block';
    board.append(reloadBtn);
};

const colors =[
  "#ADFF2F",
  "#FF1493",
  "#FFFF00",
  "#000080",
  "#22773b",
  "#FF0000",
  "#00FA9A",
  "#00FFFF",
  "#FF4500",
  "#0000FF",
  "#FF00FF",
  "#800000",
  "#00FF00",
]
function getRandomColor(){
  return colors[Math.floor(Math.random()* colors.length)];
}

function getColor() {
    const color = getRandomColor();
    circle.style.background = color;
    
};
