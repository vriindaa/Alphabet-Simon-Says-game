let user = [];
let game = [];
let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let level = 0;
let started = false;
let score = 0;
let timeLimit = 0;
let currentTimer;
document.addEventListener("keypress",function(event){
    if(started==false){
        levelUp();
        return;
    }
    let id = event.key.toUpperCase();
    let box = document.querySelector(`#${id}`);
    user.push(id);
    flashUser(box);
    check(user,user.length-1);
})

function flashUser(box){
    box.classList.add("user");
    setTimeout(function(){
        box.classList.remove("user");
    },250);
}

function check(user,idx){
    if(user[idx]===game[idx]){
        if(user.length==game.length){
            setTimeout(levelUp,260);
        }
    }else{
        gameOver();
    }
}

function levelUp(){
    level++;
    user = [];
    if(started==false){
        started = true;
    }

    //checking if previous timer exists due to async nature of js and if yes then clearing it
    if(currentTimer){
        clearInterval(currentTimer);
    }
    let p = document.querySelector("p");
    p.innerText = `Level : ${level}`;
    let num = Math.floor(Math.random()*25);
    let box = document.querySelector(`#${arr[num]}`);
    game.push(arr[num]);
    flashGame(box);
    timeLimit = level*5;
    let time = timeLimit;
    currentTimer = setInterval(function(){
        let timer = document.querySelector(".timer");
        timer.innerText = `Time Limit : ${time}`;
        time--;
    },1000);

    setTimeout(function(){
        clearInterval(id);
        if(time==-1){
            gameOver();
        }
    },(timeLimit+1)*1000);
   
}

function flashGame(box){
    box.classList.add("game");
    setTimeout(function(){
        box.classList.remove("game");
    },250);
}

function gameOver(){
    //clearing the timer
    if(currentTimer){
        let timer = document.querySelector(".timer");
        timer.innerText = `Time Limit : 0`;
        clearInterval(currentTimer);
    }


    //setting higest score
    score = Math.max(score,level-1);
    let highScore = document.querySelector("#highScore");
    highScore.innerText = `Highest Score : ${score}`;

    //setting user's score
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(function(){
        body.style.backgroundColor = "rgb(0, 55, 128)";
    },250);
    let p = document.querySelector("p");
    p.innerHTML = `Game Over!<br> <span class="score">Your Score : ${level-1}</span><br> Press any key to start again!`;


    //Resetting game
    started = false;
    user = [];
    game = [];
    level = 0;
}
