const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const ulLetters = phrase.firstElementChild;
const startButton = document.querySelector('.start');
const overlay = document.querySelector('#overlay');
const winLoseText = document.querySelector('.winLoseText');
let heartLI = document.getElementsByClassName('tries');
let missedCounter = 0; //if player guesses wrong 5 times, they lose the game)

let arrPhrases = [   //PHRASES ARRAY
    'i love you',
    'speak of the devil',
    'a piece of cake',
    'once upon a time',
    'you cant judge a book by its cover',
    'no pain no gain',
    'good job',
    'thanks to my mentor'
];

//return random phrase from an array
function getRandomPhraseAsArray(arr){
    const num = Math.floor(Math.random() * arr.length);
    const randomPhraseArr = arr[num].split('');
    //Array(8) [ "g", "o", "o", "d", " ", "j", "o", "b" ]
    return randomPhraseArr;
}

//adds the letters of an arr to display as LI 
const addPhraseToDisplay = (arr) =>{
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');     
        if (!arr[i].trim()) { //check for whitespaces
            li.className = 'space';
            ulLetters.appendChild(li);
        } else {
            li.textContent = arr[i].toUpperCase();
            li.className = 'letter';
            ulLetters.appendChild(li);
        }
    }
}

//check if letter is in phrase
function checkLetter(button){
    const li = document.getElementsByClassName('letter');
    let isMatched = null;
    for (let i = 0; i < li.length; i++) { 
        if (li[i].textContent === button.target.textContent) {
            li[i].className = 'letter show'; //ДОПЪЛНИТЕЛЕН КЛАС
            isMatched = button.target.textContent;
        }
    }
    return isMatched;
}

//check if the game has been won or loss.
function checkWin(){
    const liLetter = document.getElementsByClassName('letter');
    const liShow = document.getElementsByClassName('letter show');
    const winOverlay = document.querySelector('.start')
    if (liLetter.length === liShow.length) {
        winOverlay.className = ('start win');
        winLoseText.textContent = 'YOU WIN !';
        overlay.style.display = 'flex';
    }else if (missedCounter >= 5){
        winOverlay.className = ('start lose');
        winLoseText.textContent = 'YOU LOSE !';
        overlay.style.display = 'flex';
    }
}

function reLoad(){
    while(ulLetters.firstChild) ulLetters.removeChild(ulLetters.firstChild);//remove old display letters
    addPhraseToDisplay( getRandomPhraseAsArray(arrPhrases) );
    missedCounter = 0;
    for (i = 0; i < heartLI.length; i++){ // reload hearts
       heartLI[i].firstElementChild.src = 'images/liveHeart.png'; 
    }
    const chosen = document.querySelectorAll('.chosen');//clean chosen buttons
    for (i in chosen){ 
       chosen[i].className = '';
    }
}

//listen for the onscreen keyboard to be clicked.
qwerty.addEventListener('click', (button) => {  
    if (button.target.className !== 'chosen' 
        && button.target.tagName === "BUTTON") {
        button.target.className = 'chosen'; 
        checkLetter(button)
        const letter = checkLetter(button); // Call checkLetter function and store the results in a variable.    
        if (!letter) { // If the checkLetter does not find a letter, 
            const heartImg = heartLI[missedCounter].firstElementChild
            heartImg.src = 'images/lostHeart.png' // remove one of the heart images
            missedCounter+=1;
        }
    } 
    checkWin()
});

//listen for the start game button to be pressed
startButton.addEventListener('click', (e) => {
   if(e.target.className === 'btn__reset'){
        overlay.style.display = 'none' //:flex
        addPhraseToDisplay( getRandomPhraseAsArray(arrPhrases) );
        const startBtn = document.querySelector('.btn__reset')
        overlay.removeChild(startBtn);

        const retryBtn = document.createElement("a"); //Create retry button
        retryBtn.textContent = 'Play again';
        retryBtn.className = 'btn__retry'
        overlay.insertBefore(retryBtn,winLoseText);

   }else if(e.target.className === 'btn__retry'){
        overlay.style.display = 'none' //:flex
        reLoad();
   }
});

