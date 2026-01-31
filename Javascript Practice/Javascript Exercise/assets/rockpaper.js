var p1;
var p2;
var count=0;
var round = 1;

//Function Returns 0 if opponent won, 1 otherwise the user won
function checkMove(){
}

function rockClick(){
    if(count==0 && count != 2 && !(count>2)){
        var userMove = document.getElementById("YourMove");
        userMove.innerHTML = "Your move: Rock";
        count++;
        p1 = "rock";
    }
    else if(count != 2 && !(count>2)){ 
        var oppMove = document.getElementById("OpponentMove");
        oppMove.innerHTML = "Your Opponent's move: Rock";
        count++;
        p2 = "rock"
    }
//algo: check what is the player, if count = 0
//that means 1st player mean
    if(count == 2){
        result();
    }
}

function paperClick(){
    if(count==0 && count != 2 && !(count>2)){
        var userMove = document.getElementById("YourMove");
        userMove.innerHTML = "Your move: Paper";
        count++;
        p1 = "paper";
    }
    else if(count != 2 && !(count>2)){ 
        var oppMove = document.getElementById("OpponentMove");
        oppMove.innerHTML = "Your Opponent's move: Paper";
        count++;
        p2 = "paper";
    }

    if(count == 2){
        result();
    }
}

function scissorsClick(){
    if(count==0 && count != 2 && !(count>2)){
        var userMove = document.getElementById("YourMove");
        userMove.innerHTML = "Your move: Scissors";
        count++;
        p1 = "Scissors";
    }
    else if(count != 2 && !(count>2)){ 
        var oppMove = document.getElementById("OpponentMove");
        oppMove.innerHTML = "Your Opponent's move: Scissors";
        count++;
        p2 = "Scissors";
    }

    if(count == 2){
        result();
    }
}
//false if p1 loses and tru if p1 won
function winner(){
    if(p1 == "Scissors"){
        if(p2 == "rock"){
            return false;
        }
        else{
            return true;
        }
    }
    else if(p1 == "paper"){
        if(p2 == "Scissors"){
            return false;
        }
        else {
            return true;
        }
    }
    else if(p1 == "rock"){
        if(p2 == "paper"){
            return false;
        }
        else{
            return true;
        }
    }
    //////
    else if(p2 == "Scissors"){
        if(p1 == "rock"){
            return flase;
        }
        else{
            return true;
        }
    }
    else if(p2 == "paper"){
        if(p1 == "Scissors"){
            return false;
        }
        else {
            return true;
        }
    }
    else if(p2 == "rock"){
        if(p1 == "paper"){
            return false;
        }
        else{
            return true;
        }
    }
}

async function result() {
    const verdict = document.getElementById("Verdict");
    cRound = document.getElementById("round");
        cRound.innerHTML = "Round: " + round++;

    //to show actual winner
    if (winner()) {
        verdict.innerHTML = "Player 1 Wins";
    } else {
        verdict.innerHTML = "Player 2 Wins";
    }
   

    count = 0; // Reset the game
}
