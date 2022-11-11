//getting the random word
const inputs = document.querySelector(".inputs"),
      resetBtn = document.querySelector(".reset-btn"),
      hint = document.querySelector(".hint span"),
      guessesLeft = document.querySelector(".guess-left span"),
      wrongLetter = document.querySelector(".wrong-letter span"),
      typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrects = [], corrects = [];

function randomWord(arr) {
    let ranObj = arr[Math.floor(Math.random() * arr.length)];
    word = ranObj.word;
    maxGuesses = 8;
    incorrects = []; 
    corrects = [];
    console.log(word);

    hint.innerText = ranObj.hint;
    guessesLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord(wordList);

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
        if(word.includes(key)) { //if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        guessesLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length) {
            alert(`Congrats! You found the word "${word.toUpperCase()}"`)
            randomWord(wordList);
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses!")
            for (let i = 0; i < word.length; i++) {
                //show all the letters in the input
                    inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}

resetBtn.addEventListener("click", () => randomWord(wordList));
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());