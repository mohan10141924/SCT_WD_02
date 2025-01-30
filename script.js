let timer; // To hold the timer interval
let isRunning = false;
let elapsedTime = 0; // Elapsed time in milliseconds
let startTime; // Timestamp of when the timer starts
let lapCount = 0;

// DOM elements
const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

// Update the stopwatch display
function updateDisplay() {
    const totalMilliseconds = elapsedTime % 1000;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    display.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(totalMilliseconds).padStart(3, '0')}`;
}

// Start or Pause the stopwatch
function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.innerText = "Start";
    } else {
        startTime = Date.now() - elapsedTime; // Account for elapsed time if resuming
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); // Update every 10 milliseconds for accuracy
        startPauseBtn.innerText = "Pause";
    }
    isRunning = !isRunning;
}

// Reset the stopwatch
function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;
    startPauseBtn.innerText = "Start";
    updateDisplay();
    laps.innerHTML = ""; // Clear laps
}

// Record a lap
function recordLap() {
    if (!isRunning) return;

    lapCount++;
    const lapTime = display.innerText;
    const lapElement = document.createElement("div");
    lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapElement);
}

// Event listeners
startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);

// Initialize display
updateDisplay();