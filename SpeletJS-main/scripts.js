const selectTime = document.getElementById("select-time");
const timerDisplay = document.getElementById("timer-display");
const allCards = document.querySelectorAll(".card");
const restartButton = document.getElementById("restart");
const attemptsCounter = document.querySelector(".flips b");

//tid
selectTime.addEventListener("change", () => {
    console.log(`Vald tid: ${selectTime.value}s`);
});

let countDown;
let timerRunning = false;

function countdownStart() {
    if (timerRunning) return;
    timerRunning = true;

    let timeLeft = parseInt(selectTime.value);
    selectTime.style.display = "none";
    timerDisplay.textContent = `Tid: ${timeLeft}s`;

    countDown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tid: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countDown);
            timerDisplay.textContent = "Game Over!";
            timerRunning = false;
        }
    }, 1000);
}

//antal försök
let attempts = 0;
function usedAttempts() {
    attempts++;
    attemptsCounter.textContent = attempts;
}

//klicka på kort
allCards.forEach((card) => {
    card.addEventListener("click", () => {
        countdownStart();
        card.classList.toggle("flip");
        console.log("Kort vänds:", card);

        const flippedCards = document.querySelectorAll(".card.flip");
        if (flippedCards.length === 2) {
            usedAttempts();
        }
    });
});

//restart button
restart.addEventListener("click", () => {
    allCards.forEach((card) => {
        card.classList.remove("flip");
    });

    clearInterval(countDown);
    timerRunning = false;
    selectTime.disabled = false;
    selectTime.style.display = "block";
    
    const resetTime = parseInt(selectTime.value);
    timerDisplay.textContent = `Tid:`;

    attempts = 0;
    attemptsCounter.textContent = attempts;

    document.querySelector(".flips span b").textContent = 0;
});