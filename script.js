//.........Variables ...........

const Start = document.getElementById("start");
const Pause = document.getElementById("pause");
const Reset = document.getElementById("reset");
const minutesInput = document.getElementById("minutes");
const timerDisplay = document.getElementById("timer");
const pauseBtn = document.getElementById("pause");
let minutesInputInNumber = parseInt(minutesInput.value);
let countdown;
let paused = false;

//..............Functions..........

function changeInput(val) {
  minutesInputInNumber = parseInt(val);
  pauseBtn.innerHTML = "pause";
  resetCountdown();
  startCountdown();
}

function startCountdown() {
  if (!minutesInputInNumber || minutesInputInNumber === 0) {
    alert("Plese Enter the minutes");
  } else if (minutesInputInNumber < 0) {
    alert("Plese write valid number");
    minutesInput.value = "";
  } else {
    if (countdown) {
      clearInterval(countdown);
    }
    let seconds = parseInt(minutesInput.value) * 60;
    function updateDisplay() {
      console.log(seconds);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      timerDisplay.innerHTML = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }
    updateDisplay();
    countdown = setInterval(function () {
      if (!paused) {
        if (seconds > 0) {
          seconds--;
          updateDisplay();
        } else {
          clearInterval(countdown);
        }
      }
    }, 1000);
  }
}

function pauseCountdown() {
  if (minutesInputInNumber > 0 && minutesInputInNumber) {
    if (!paused) {
      paused = true;
      pauseBtn.innerHTML = "resume";
    } else {
      paused = false;
      pauseBtn.innerHTML = "pause";
    }
  }
}

function resetCountdown() {
  clearInterval(countdown);
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerHTML = "00:00:00";
  paused = false;
}

//......... Events ...........

Start.addEventListener("click", startCountdown);
Pause.addEventListener("click", pauseCountdown);
Reset.addEventListener("click", resetCountdown);
