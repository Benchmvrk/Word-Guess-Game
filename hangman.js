const word  = ["CENTAUR", "MEDUSA", "MINOTAUR", "CHIMERA"];
var cWord;
var lettersGuessed = [];
var dWord = [];
var guess = 1;
var wins = 0;
var lose = 0;
var gameOver = false;




function start(){
    var prevWord = cWord
    do {
        cWord = word[Math.floor(Math.random()*word.length)];
    } while (prevWord == cWord);
    lettersGuessed = [];
    dWord = [];
    for (var i = 0; i < cWord.length; i++) {
        dWord.push('_');
    }
    // dWord = Array(cWord.fill('_'));
    guess = Math.ceil(cWord.length * 1.5); 
    gameOver = false;
    $('#guesses-remain').html(guess);
    $('#display-word').html(dWord);
    $('#total-wins').html(wins);
    $('#total-losses').html(lose);
    $('#letters-guessed').html(lettersGuessed);
}

function isWin(){
    if (dWord.indexOf('_') == -1) {
        alert("You win!"); 
        wins++;
        $('#total-wins').html(wins);
        gameOver = true;
    }
}

function isLose(){
    if (guess == 0) {
        alert("You lose!");
        lose++;
        $('#total-losses').html(lose);
        gameOver = true;
    }
}

/*
apple
*/

document.onkeyup = function(event) {
    var letter = event.key;

    if (!gameOver) {
    // check if letter is a-z
        if (letter.charCodeAt(0) <= 122 && letter.charCodeAt(0) >= 97) {
            letter = letter.toUpperCase();
            // check if letter is already guessed
            if(lettersGuessed.indexOf(letter) == -1) {
                if(cWord.includes(letter)) {
                    for (var i =0; i < cWord.length; i++){
                        if (cWord[i] == letter) {
                            dWord[i] = letter;
                        }
                        $('#display-word').html(dWord);
                    }
                }
                else {      // if letter is not in the word
                    guess--;
                    $('#guesses-remain').html(guess);
                }
                lettersGuessed.push(letter);
                $('#letters-guessed').html(lettersGuessed + ", ")
            }
            else { // if letter is already guessed
                alert("Letter already guessed");
            }
        }
        else {  // if key is not a-z
            alert("Invalid key");
        }
        isWin();
        isLose();
    }
    else 
        start();
}

start();
