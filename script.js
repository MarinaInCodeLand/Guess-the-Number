// Random broj i inicijalizacija
let randomNumber = Math.ceil(Math.random() * 100);
console.log(`Secret number: ${randomNumber}`); // remove later
let attempts = 0;
const maxAttempts = 3;

function guessNumber() {
    const guessInput = document.getElementById("guessInput");
    const userGuess = parseInt(guessInput.value); // sigurnije parsiranje
    const message = document.getElementById("message");

    // Provera praznog inputa
    if (isNaN(userGuess)) {
        message.innerHTML = `⚠️ Please enter a number!`;
        message.classList.remove("blink");
        triggerShake(message);
        guessInput.value = "";
        guessInput.focus();
        return;
    }

    // Provera opsega
    if (userGuess < 1 || userGuess > 100) {
        message.innerHTML = `⚠️ Number must be between 1 and 100!`;
        message.classList.remove("blink");
        triggerShake(message);
        guessInput.value = "";
        guessInput.focus();
        return;
    }

    attempts++;

    // Pogodak
    if (userGuess === randomNumber) {
        message.innerHTML = `🎉 Congratulations! You guessed it in ${attempts} attempt(s)!`;
        message.classList.remove("shake");
        triggerBlink(message);
        setTimeout(newGame, 4000);
        return;
    } else {
        message.innerHTML = userGuess > randomNumber
            ? '⬇️ Try a smaller number!'
            : '⬆️ Try a larger number!';
        message.classList.remove("blink");
        triggerShake(message);
    }

    // Reset input i fokus
    guessInput.value = "";
    guessInput.focus();

    // Provera da li je kraj pokušaja
    if (attempts >= maxAttempts) {
        message.innerHTML = `❌ You lost! The correct number was ${randomNumber}.`;
        message.classList.remove("blink");
        setTimeout(newGame, 3000);
    }
}

// Funkcija za novu igru
function newGame() {
    location.reload();
}

// Enter key listener
const guessInput = document.getElementById("guessInput");
guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guessNumber();
    }
});

// Fokus na input kada se učita stranica
window.onload = () => {
    guessInput.focus();
};

// 🔹 Pomoćne funkcije za animacije
function triggerShake(element) {
    element.classList.remove("shake");
    void element.offsetWidth; // trigger reflow
    element.classList.add("shake");
}

function triggerBlink(element) {
    element.classList.remove("blink");
    void element.offsetWidth; // trigger reflow
    element.classList.add("blink");
}


