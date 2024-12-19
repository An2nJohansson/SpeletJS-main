let selectTime = document.getElementById("select-time");
selectTime.addEventListener("change", () => {
    console.log(`Vald tid: ${selectTime.value}s`);
});

const allCards = document.querySelectorAll(".card");

allCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("flip");
        console.log("Kort vänds:", card);
    });
});
