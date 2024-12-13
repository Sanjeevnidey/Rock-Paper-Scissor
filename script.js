let score = JSON.parse(localStorage.getItem('score')) || {  //if left side is false then right side will execute
    wins :0,
    losses:0,
    ties:0
};

/*if(score === null){
score = {
    wins :0,
    losses:0,
    ties:0
};
}*/

updateScoreElem();

function playgame(playerMove) {
    sysMove = picksysmove();
    result = '';

    if (playerMove == 'paper') {
        if (sysMove == 'rock') {
            result = 'You win';
        } else if (sysMove == 'paper') {
            result = 'Tie';
        } else if (sysMove == 'scissors') {
            result = 'You lose';
        }
    }

    else if (playerMove == 'scissors') {
        if (sysMove == 'rock') {
            result = 'You lose';
        } else if (sysMove == 'paper') {
            result = 'You win';
        } else if (sysMove == 'scissors') {
            result = 'Tie';
        }
    }

    else {
        if (sysMove == 'rock') {
            result = 'Tie';
        } else if (sysMove == 'paper') {
            result = 'You lose';
        } else if (sysMove == 'scissors') {
            result = 'You win';
        }
    }

    if (result === 'You win') {
        score.wins++;
    } else if (result === 'You lose') {
        score.losses++;
    } else {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElem();

    document.querySelector('.js-result').innerHTML = `${result}.`;

    document.querySelector('.js-moves').innerHTML = `You <img src="image/${playerMove}-emoji.png" class="move-icon">
    <img src="image/${sysMove}-emoji.png" class="move-icon"> Computer`;

    //alert(`You picked ${playerMove}. Computer picked ${sysMove}. ${result}\nWins : ${score.wins},  Losses : ${score.losses},  ties : ${score.ties}`);
}

function updateScoreElem(){
    document.querySelector('.js-score').innerHTML = `Wins : ${score.wins},  Losses : ${score.losses},  Ties : ${score.ties}`;
}

function picksysmove() {
    let sysMove = '';
    const randomNo = Math.random();    //computer generates random no--> 0 >= no < 1

    if (randomNo >= 0 && randomNo < 1 / 3) {
        sysMove = 'rock';
    } else if (randomNo >= 1 / 3 && randomNo < 2 / 3) {
        sysMove = 'paper';
    } else if (randomNo >= 2 / 3 && randomNo < 1) {
        sysMove = 'scissors';
    }
    return sysMove;
}



//AUTO PLAY FUNCITON

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        document.querySelector('.auto-button').innerHTML = 'Stop Auto Playing';
        intervalId = setInterval(function(){
            const playerMove = picksysmove();
            playgame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else{
        document.querySelector('.auto-button').innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}


//EVENT LISTENER IN PLACE OF ONCLICK --> in rock button
document.querySelector('.js-rock-button').addEventListener('click', ()=>{
    playgame('rock');
})


//EVENT LISTENER ONKEYDOWN FUNCTION
document.body.addEventListener('keydown', (event)=>{
    // if(event.key >= 'A' && event.key <='Z'){
    //     alert('do not use capital letters');
    // }
    if(event.key === 'r'){
        playgame('rock');
    }
    else if(event.key === 'p'){
        playgame('paper');
    }
    else if(event.key === 's'){
        playgame('scissors');
    }
    else if(event.key === 'a'){
        autoPlay();
    }
    else if(event.key === "Backspace"){
        confirmReset();
        // resetScore();
    }
       
})


//EVENT LISTENER --> FOR AUTOPLAY
document.querySelector('.auto-button').addEventListener('click', ()=>{
    autoPlay();
})

//EVENT LISTENER --> RESET BUTTON
function resetScore(){
    score.wins =0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');   
    updateScoreElem();
}
document.querySelector('.reset-button').addEventListener('click', ()=>{
    confirmReset();
})


const resetElem = document.querySelector('.reset-confirmation'); //scope - global
function confirmReset(){
    // const resetElem = document.querySelector('.reset-confirmation');   //this will give error

    resetElem.innerHTML = `Do you want to reset score: 

                            <button class="confirmation-button" 
                            onclick="
                            resetScore();
                            console.log(resetElem);
                            resetElem.innerHTML = '';
                            ">yes</button>

                            <button class="confirmation-button"
                            onclick = "
                            resetElem.innerHTML = '';
                            ">no</button>`;
}

