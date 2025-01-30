let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let lapCount = 0;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateDisplay() {
    const totalMilliseconds = elapsedTime % 1000;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    display.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(totalMilliseconds).padStart(3, '0')}`;
}

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.innerText = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseBtn.innerText = "Pause";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;
    startPauseBtn.innerText = "Start";
    updateDisplay();
    laps.innerHTML = "";
}

function recordLap() {
    if (!isRunning) return;

    lapCount++;
    const lapTime = display.innerText;
    const lapElement = document.createElement("div");
    lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapElement);
}

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);

updateDisplay();