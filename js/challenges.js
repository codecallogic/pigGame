/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying, winninScore;

init();

var lastDice;

document.getElementById('winningScore').addEventListener('input', function() {
    winningScore = document.getElementById('winningScore').value;
});

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
    // 1. Generate random number

    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    
    // 2. Display dice

    let diceDOM = document.querySelector('.dice');
    let diceDOM2 = document.querySelector('.dice2');

    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // 3. Add score if dice number is NOT equal to 1

    if (dice !== 1 && dice2 !== 1) {
        //Add score
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        //Next player
        nextPlayer();
    }

    }

    // if (dice === 6 && lastDice === 6) {
    //     //Player looses score
    //     scores[activePlayer] = 0;
    //     document.querySelector('#score-' + activePlayer).textContent = '0';
    //     nextPlayer();
    // } else if (dice !== 1) {
    //     //Add score
    //     roundScore += dice;
    //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
    // } else {
    //     //Next player
    //     nextPlayer();
    // }
    // lastDice = dice;

    // }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    //Add current score to Global score
    
    scores[activePlayer] += roundScore;

    //Update UI

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // var input = document.querySelector('#winningScore').value;
    // var winningScore;

    // if(input){
    //     winningScore = input;
    // }else{
    //     winningScore = 100;
    // }

    //Check if player won the game

    if(scores[activePlayer] >= winningScore){

        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
        
    }else{
        nextPlayer();
    }
    }
})

function nextPlayer(){

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');

    document.querySelector(".dice").style.display = 'none';
    document.querySelector(".dice2").style.display = 'none';

    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    winningScore = 100;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('winningScore').value = '';

}