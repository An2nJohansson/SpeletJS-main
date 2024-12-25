const selectTime = document.getElementById("select-time");
const timerDisplay = document.getElementById("timer-display");
const allCards = document.querySelectorAll(".card");
const restartButton = document.getElementById("restart");
const attemptsCounter = document.querySelector(".flips b");
const cardsContainer = document.querySelector(".cards");

//kort
const imgArray = [
    "img/img1.jpg", "img/img1.jpg",
    "img/img2.jpg", "img/img2.jpg",
    "img/img3.jpg", "img/img3.jpg",
    "img/img4.jpg", "img/img4.jpg",
    "img/img5.jpg", "img/img5.jpg",
    "img/img6.jpg", "img/img6.jpg",
];

let flippedCards = [];
let matchedCards = [];
let attempts = 0

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function cardGenerator() {
    const shuffledCards = shuffle([...imgArray]);
    cardsContainer.innerHTML = "";

    shuffledCards.forEach((img) => {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `
            <div class="view front-view">
                <img class="img-front" src="img/qmark.png" alt="icon">
            </div>
            <div class="view back-view">
                <img class="img-back" src="${img}" alt="card-img">
            </div>
        `;
        cardsContainer.appendChild(card);
    });
    clickCard();
}


function clickCard() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.addEventListener("click", () => {
            flipCard(card);
        });
    });
}

function flipCard(card) {
    if (flippedCards.length === 0) {
        countdownStart();
    }
    
    if (flippedCards.length < 2 && !card.classList.contains("flip") && !matchedCards.includes(card)) {
        card.classList.add("flip");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.querySelector(".back-view img").src === card2.querySelector(".back-view img").src) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        attempts++;
        usedAttempts();

        if (matchedCards.length === imgArray.length) {
            alert("Du vann!");
        }
    }

    else {
        setTimeout(() => {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
            flippedCards = [];
            attempts++;
            usedAttempts();
        }, 1000);
    }
}

function usedAttempts() {
    attemptsCounter.textContent = attempts;
}

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

//restart button
restart.addEventListener("click", () => {
    cardGenerator();
    allCards.forEach((card) => {
        card.classList.remove("flip");
    });

    cardGenerator();
    matchedCards = [];
    flippedCards = [];
    attempts = 0;
    usedAttempts();
    clearInterval(countDown);
    timerRunning = false;
    selectTime.disabled = false;
    selectTime.style.display = "block";
    const resetTime = parseInt(selectTime.value);
    timerDisplay.textContent = `Tid:`;
});

cardGenerator();