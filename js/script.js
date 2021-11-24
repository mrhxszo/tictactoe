const Gameboard = ((board) =>{

    const makeboard = function () {
        let gameboard = [];
        for( let i = 0; i < 3; i++){

            let arr = [];
    
            for( let j = 0; j < 3; j++){
                const box = document.createElement('div');
                box.classList.add("box");
                box.classList.add(`${i},${j}`);
                // board.appendChild(box);
                arr.push(box);
            }
            gameboard.splice([i], 0 , arr);
    
        }
        return gameboard;

    } 
    
    let gameboard = makeboard();
    gameboard.forEach((boxes) => boxes.forEach((box) => board.appendChild(box)) );

return {
    gameboard,
    makeboard
}
})(document.querySelector(".gameboard"));


const Player = (computer) => {
    
    let sign = null;
    computer = computer;
    const mark = function(a){
        if (a.innerText == "" ){
            a.innerText = this.sign;
        }
        
    }
    let turn = null;

    return {mark, sign, turn, computer};
}

let Computer = () => {
    const prototype = Player();
    let computer = true;


    return Object.assign({},prototype,{computer});

}

const displaybuttons = ((cross,zero)=>{

    const choosesign = function (e){
        document.querySelector(".warning").style.display = "none";
        let a = e.srcElement.classList;
        if(a.contains('x')){
            player1.sign = (cross.innerText);
            player2.sign = (zero.innerText);
        }
        else{
            player1.sign = (zero.innerText);
            player2.sign = (cross.innerText);
        }

    }


    cross.addEventListener("click", choosesign);
    zero.addEventListener("click", choosesign);

    
   


})(document.querySelector(".button.x"),document.querySelector(".button.o"));



let player1 = Player(false);
let player2 = Computer(true); //if vs player is choosen player2=Player() if vs computer player2 = Computer;


const Gameplay = ((player1, player2) => {

    count = 1;
    warning = document.querySelector(".warning");

    const checkloop = function(array) {
        if(!(array[0].innerText == '') && !(array[1].innerText == '') && !(array[2].innerText == '')){
            
            if(array[0].innerText == array[1].innerText && array[1].innerText == array[2].innerText){
                if(array[0].innerText == player1.sign){
                    return 10;

                }
                else{
                    return -10;
                }
            } 
        }
    }

    const checkwinner = function (gameboard) {

        let diagonals = [];
        let antiDiagonals = [];
        let column0 = [];
        let column1 = [];
        let column2 = [];
        let row0 = [];
        let row1 = [];
        let row2 = [];

        for( let i = 0; i < 3; i++){ 

            for( let j = 0; j < 3; j++){ 
                if (i == j){
                    diagonals.push(gameboard[i][j]);
                }
                if (i == 2-j){
                    antiDiagonals.push(gameboard[i][j]);
                }

                if (i == 0){
                    column0.push(gameboard[i][j]);
                }
                if (i == 1){
                    column1.push(gameboard[i][j]);
                }
                if (i == 2){
                    column2.push(gameboard[i][j]);
                }
 
                if (j == 0){
                    row0.push(gameboard[i][j]);
                }
                if (j == 1){
                    row1.push(gameboard[i][j]);
                }
                if (j == 2){
                    row2.push(gameboard[i][j]); 
                }

            }
        }
        

        let winStates = [diagonals, antiDiagonals, column0, column1, column2, row0, row1, row2];
        // console.log(winStates);
        //checking if winning condition is satisfied
        winStates.forEach(element => { 
            if (checkloop(element) == 10){
                warning.innerText = "Player 1 wins!";
                warning.style.display = "block";
                return 10;
            }
            else if (checkloop(element) == -10){
                warning.innerText = "Player 2 wins!";
                warning.style.display = "block";
                return -10;
            }
            else if (count > 9){
                warning.innerText = "It's a tie!";
                warning.style.display = "block";
            };
            
        });
        return 0; 
    };

    const turnDecider = function (e) {
        if (!(player1.sign == null && player2.sign == null)){
            if (count % 2 == 0 && !(player2.computer == true)){
                player2.mark(e.srcElement);
                player2.turn = true;
                player1.turn = false;
            }
            else{
                player1.mark(e.srcElement);
                player1.turn = true;
                player2.turn = false;
            }
            count++;

            checkwinner(Gameboard.gameboard);
            
            if (count > 9 ){
                count = 1;
            }
            else if (count < 9){
                //aistuff
                copyBoard(Gameboard.gameboard);
                makeMove(Gameboard.gameboard, findbestMove(Gameboard.gameboard));
            }
        }
        else{
            warning.style.display = "block";
        }
        
        
    }
    return {turnDecider, checkwinner, count};


 


})(player1, player2);




// let gameplay = Gameplay(player1, player2);


for( let i = 0; i < 3; i++){    
    Gameboard.gameboard[i].forEach((element, j) => {
        element.addEventListener('click', Gameplay.turnDecider);

    })
};