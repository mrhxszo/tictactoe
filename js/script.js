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


const Player = () => {
    
    let sign = null;
    const mark = function(a){
        if (a.innerText == "" ){
            a.innerText = this.sign;
        }
        
    }

    return {mark, sign};
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



let player1 = Player();
let player2 = Player();



const Gameplay = ((player1, player2) => {

    let count = 1;
    const warning = document.querySelector(".warning");
    let winStates = [];
    const play = document.querySelector(".play");
    const window = document.createElement("div");
    


    let copyboard = function(gameboard){

        let array =  [ [ '_', '_', '_' ],
        			[ '_', '_', '_'  ],
        			[ '_', '_', '_' ] ];
        // console.log(array);

        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                // console.log(array[i][j]);
                if(!(gameboard[i][j].innerText == '')){
                    array[i][j] = gameboard[i][j].innerText;
                }
                 
            }
        }
        return array;
    } 


    function win(){
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
                    diagonals.push(Gameboard.gameboard[i][j]);
                }
                if (i == 2-j){
                    antiDiagonals.push(Gameboard.gameboard[i][j]);
                }
    
                if (i == 0){
                    column0.push(Gameboard.gameboard[i][j]);
                }
                if (i == 1){
                    column1.push(Gameboard.gameboard[i][j]);
                }
                if (i == 2){
                    column2.push(Gameboard.gameboard[i][j]);
                }
    
                if (j == 0){
                    row0.push(Gameboard.gameboard[i][j]);
                }
                if (j == 1){
                    row1.push(Gameboard.gameboard[i][j]);
                }
                if (j == 2){
                    row2.push(Gameboard.gameboard[i][j]); 
                }
    
            }
        }

        winStates = [diagonals,antiDiagonals,column0,column1,column2,row0,row1,row2];
    }
    win();

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

    const restartf = function(){
        
        window.classList.add("window");
        play.appendChild(window);
        let restart = document.querySelector(".restart");
        restart.onclick = function(){
            console.log(Gameplay.window);
            Gameboard.gameboard.forEach((array) => array.forEach((element) =>
                                                element.innerText = ""));
            window.style.display = "none";
                
            }
    }
    const checkwinner = function (gameboard) {
        
        //checking if winning condition is satisfied
        winStates.forEach(element => { 
            if (checkloop(element) == 10){
                window.innerHTML = "<p class ='windowtext'>Player 1 wins!</p><div class = 'button replay restart'>Restart</div>";
                restartf();
                window.style.display = "block";
                count = 1;
            }
            else if (checkloop(element) == -10){
                window.innerHTML = "<p class ='windowtext'>Player 2 wins!</p><div class = 'button replay restart'>Restart</div>";
                restartf();
                window.style.display = "block";
                count = 1;
            }
            else if (count > 9){
                window.innerHTML = "<p class ='windowtext'>It's a tie!</p><div class = 'button replay restart'>Restart</div>";
                restartf();
                window.style.display = "block";
                count = 1;
            };
            
        });
        
        return 0; 
    };

    const turnDecider = function (e) {
        
        if (!(player1.sign == null && player2.sign == null)){
            if (count % 2 == 0 && opponent == "human"){
                player2.mark(e.srcElement);
            }
            else{
                player1.mark(e.srcElement);
            }
            
            
            if (count <= 9 && opponent == "computer"){
                //aistuff
                
                if(count<9){
                    let board = copyboard(Gameboard.gameboard);

                    let bestMove = aiplayer.findBestMove(board);
    
                    aiplayer.makeMove(Gameboard.gameboard, bestMove);
    
                    console.log("ROW: " + bestMove.row +
                    " COL: "+ bestMove.col);

                }

                count++;

            }
        }
        else{
            warning.style.display = "block";
        }

        checkwinner(Gameboard.gameboard);
        count++;


        
        
    }
    return {turnDecider, checkwinner, count, winStates, checkloop, window};


 


})(player1, player2);




// let gameplay = Gameplay(player1, player2);


for( let i = 0; i < 3; i++){    
    Gameboard.gameboard[i].forEach((element, j) => {
        element.addEventListener('click', Gameplay.turnDecider);

    })
};