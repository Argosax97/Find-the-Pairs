"use strickt"
const winnerBord = document.querySelector(".winner");
const replayBtn = document.querySelector(".again");

const moves = document.querySelector('.count');
const score = document.querySelector('#score');
let count = 0;
let Winner = 0;

const cards = document.querySelectorAll(".cards");

cards.forEach(card => card.addEventListener("click", flipCard));

let fliped = false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard() {
    if (this === firstCard) return;
    if (lockBoard) return;
    this.classList.add('flip');
    if (!fliped) {
        // first click
        fliped = true;
        firstCard = this;
        return;
    } else {
        // second click
        secondCard = this;
        fliped = false;
    }

    checkMatch();
    displayWinnerBord(Winner);

}

function checkMatch() {

    let isMatch = firstCard.dataset.id === secondCard.dataset.id;
    lockBoard = true;

    if (isMatch) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        Winner++;
        count++;
        moves.innerHTML = count;
        lockBoard = false;
    } else {
        count++;
        moves.innerHTML = count;

        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            //have no idea why it have to be null in order to owrk
            lockBoard = false;
            firstCard = null;
            secondCard = null;
        }, 800);
    }
};

function displayWinnerBord(Winner) {
    if (Winner === 6) {
        score.innerHTML = count;
        winnerBord.style.display = "flex"
        replayBtn.addEventListener("click", () => {
            location.reload();
            winnerBord.style.display = "none"
        })
    }
}

(function shuffle() {
    cards.forEach(card=>{
        random = Math.floor(Math.random()*12);
        card.style.order = random;
    })
})();
