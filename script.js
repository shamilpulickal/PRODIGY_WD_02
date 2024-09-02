let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "00").slice(0, 2);

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 10);
    startStopBtn.innerHTML = "Pause";
    isRunning = true;
}

function pause() {
    clearInterval(timerInterval);
    startStopBtn.innerHTML = "Start";
    isRunning = false;
}

function reset() {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00";
    elapsedTime = 0;
    startStopBtn.innerHTML = "Start";
    isRunning = false;
    laps.innerHTML = ""; // Clear lap times
}

function lap() {
    if (isRunning) {
        const li = document.createElement("li");
        li.innerHTML = timeToString(elapsedTime);
        laps.appendChild(li);
    }
}

startStopBtn.addEventListener('click', function() {
    if (!isRunning) {
        start();
    } else {
        pause();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
