let levelUpTimer; 

let gameSeq = [];
let userSeq = [];

let btns = ["red", "orange", "purple", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2"); 
let body = document.querySelector("body");

document.addEventListener("keypress", function() {
    if(!started) {
        started = true;
        levelUp();
    }
}); 

function flashButton(btn, flashClass) {
    btn.classList.add(flashClass);
    setTimeout(function () {
        btn.classList.remove(flashClass);
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    flashButton(randBtn, "gameflash");
}

function checkAns(idx) {
    return userSeq[idx] === gameSeq[idx];
}

function restartGame() {
    clearTimeout(levelUpTimer);
    
    body.classList.add("game-over");
    setTimeout(() => {
        body.classList.remove("game-over");
    }, 500);

    h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to restart.`;
    
    gameSeq = [];
    userSeq = [];
    started = false; 
    level = 0;
}

function btnPress() {
    if (!started) return;
    let btn = this;

    let userColor;
    for (let color of btns) {
        if (btn.classList.contains(color)) {
            userColor = color;
            break;
        }
    }

    userSeq.push(userColor);
    
    let lastIndex = userSeq.length - 1; 

    if (checkAns(lastIndex)) {
        flashButton(btn, "usercorrectflash");
        if (userSeq.length === gameSeq.length) {
            levelUpTimer = setTimeout(levelUp, 1000); 
        }
    } else {
        flashButton(btn, "userwrongflash");
        restartGame();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}