const home = document.querySelector(".home");
const play = document.querySelector(".play"); 
const replay = document.querySelector(".replay");


const human = document.querySelector(".button.player"); 
const computer = document.querySelector(".button.computer");
let opponent = "human";

human.onclick = function (){
    play.style.display = "block";
    home.style.display = "none";
}
computer.onclick = function (){
    opponent = "computer";
    play.style.display = "block";
    home.style.display = "none";
}

replay.onclick = function(){
        Gameplay.count = 1;
        Gameplay.window.style.display = "none";
        Gameboard.gameboard.forEach((array) => array.forEach((element) =>
                    element.innerText = ""));
    }

