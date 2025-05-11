// Initialize level, maxscore, game/user sequence 
let level = 0;
let maxScore = 0;
let gameSeq = [];
let userSeq = [];
let started = false;
let btnArray = ["red","blue","green","yellow"];
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");

document.addEventListener("keypress",function(event){
    if(started == false){
        console.log("Game Begun");
        started = true;
        levelUp();
    }
})

function levelUp(){
    userSeq = []; //Re initialize
    level++;
    h2.innerText = `level ${level}`;
    let randomIdx = Math.floor(Math.random()*3);
    let element = btnArray[randomIdx];
    let btn = document.querySelector(`.${element}`);
    gameSeq.push(element);
    gameButtonFlash(btn);
    console.log(gameSeq);
}

function gameButtonFlash(btn){
    btn.classList.add("flashButton");
    setTimeout(function(){
        btn.classList.remove("flashButton");
    },200);
}

function userButtonFlash(btn){
    btn.classList.add("userFlashButton");
    setTimeout(function(){
        btn.classList.remove("userFlashButton");
    },200);
}

for(btn of btns){
    btn.addEventListener("click", function(){
        let btn = this;
        userButtonFlash(btn);
        userSeq.push(btn.getAttribute("id"));
        console.log(userSeq);
        checkAns(userSeq.length-1);
    })
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 500);
        }
    }
    else{
        maxScore = Math.max(maxScore, level);
        h2.innerText = `Game Over! Press any key to start. Your Score ${level}. Your highest score achieved is ${maxScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },100);
        reset();
    }
}

function reset(){
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
}