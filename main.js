"use strict"
const button = document.querySelector(".play");
const timeText = document.querySelector(".showTimeBox__time");
const img =  document.querySelector(".background");
const back =  document.querySelector(".back");
const pointCountCircle = document.querySelector(".carrot_count_circle");
let replayStatus = false;
let playTime = 10;
let bugCount = 7;
let CarrotCount = 10;
let remainCarrot = CarrotCount;
let displayTime = playTime;
let timerId;
let onPlay = true;
let bug_pull = new Audio('sound/bug_pull.mp3');
let carrot_pull = new Audio('sound/carrot_pull.mp3');
let bg = new Audio('sound/bg.mp3');
let alert = new Audio('sound/alert.wav');
let game_win = new Audio('sound/game_win.mp3');


button.addEventListener("click", (event) => {
    if (onPlay) {
        if (button.getAttribute('src') === "img/play.png") {
            bg.play();
            button.setAttribute('src','img/stop_1.png');
            if (replayStatus == false) {
                play();
            } else {
                setTimer();
                replayStatus = false;
    
            }
            
    
        } else {
            button.setAttribute('src','img/play.png');
            replayStatus = true;
            clearInterval(timerId);
        }
    }
    
    
});

function drawItem(itemNum, itemName, clickEffect) {
    const imgWidth = img.getBoundingClientRect().width;
    const imgHeight = img.getBoundingClientRect().height;
    for (let i = 0; i <itemNum; i++) {
        const item = document.createElement('img');
        item.setAttribute('class','carrot');
        let xloc = Math.floor(Math.random() * (imgWidth-70));
        item.style.left= `${xloc}px`;
        item.setAttribute('src', `img/${itemName}.png`);
        console.log(`bottom: ${imgWidth} top : ${imgHeight}`);
        let yloc = Math.floor(Math.random() * (imgHeight-imgHeight/2-70) + imgHeight/2);
        item.style.top= `${yloc}px`;
        back.append(item);
        item.addEventListener("click", (event)=> {
            clickEffect(event, item);
        })
        
    };
}


function setTimer() {
    timerId = setInterval(()=>{
        displayTime--;
        if (displayTime >= 10) {
            timeText.innerHTML = `00:${displayTime}`;
        } else if (displayTime > 0) {
            timeText.innerHTML = `00:0${displayTime}`;
        } else if (displayTime == 0) {
            timeText.innerHTML = `00:0${displayTime}`;
            clearInterval(timerId);
            if (remainCarrot === 0) {
                userEnd("win")
            } else {
                userEnd("lose")
            }
            
        }
        
    },1000);
}

function play() {
    setTimer();
    drawItem(CarrotCount, 'carrot', (event, item) => {
        back.removeChild(item);
        remainCarrot--;
        carrot_pull.play();
        pointCountCircle.innerHTML = remainCarrot;
        if (remainCarrot === 0) {
            clearInterval(timerId);
            userEnd("win")
        }

    });
    drawItem(bugCount, 'bug', (event, item) => {
        bug_pull.play();
        clearInterval(timerId);
        userEnd('lose');
    });
};

function userEnd(response) {
    onPlay = false;
    const buglist = document.querySelectorAll('.bug');
    const carrotlist = document.querySelectorAll('.carrot');
    buglist.forEach(bug => back.removeChild(bug));
    carrotlist.forEach(carrot => back.removeChild(carrot));
    remainCarrot = CarrotCount;
    const loseBox = document.createElement('div');
    loseBox.setAttribute('class', 'lose_box');
    
    const restartBtn = document.createElement('img');
    restartBtn.setAttribute('class', 'restartBtn');
    restartBtn.setAttribute('src', `img/restart.png`);
    loseBox.appendChild(restartBtn);
    const lose_box_title= document.createElement('span');
    lose_box_title.setAttribute('class', 'lose_box_title');
    if (response === 'win') {
        game_win.play();
        lose_box_title.innerHTML = "You win!";
    } else {
        alert.play();
        lose_box_title.innerHTML = "You lose!";
    }
    loseBox.appendChild(lose_box_title);
    back.append(loseBox);
    button.setAttribute('src','img/play.png');
    replayStatus = false;
    restartBtn.addEventListener('click', (event) => {
        back.removeChild(loseBox);
        button.setAttribute('src','img/stop_1.png');
        displayTime = playTime;
        onPlay = true;
        play()
    })


}











