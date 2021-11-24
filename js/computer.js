
let newBoard = Gameboard.makeboard();

let copyBoard = function (gameboard){
    gameboard.forEach((box, i) => box.forEach((element, j) => newBoard[i][j].innerText = element.innerText));

}



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

function evaluation(gameboard){

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
    //checking if winning condition is satisfied
    for(element of winStates){
        if (checkloop(element) == 10){
            return 10;
        }
        else if (checkloop(element) == -10){
            return -10;
    }};
    return 0; 


}

const findbestMove = function(gameboard){
    let bestScore = 1000;
    let bestMove = {"row":-1,"column":-1};

    gameboard.forEach((array, i) => array.forEach((element, j) => {

        if(element.innerText == ""){
            //make move
            
            element.innerText = player2.sign;

            //evaluate the value of the move
            let moveVal = minimax(gameboard, 0, true);
            console.log(moveVal);

            //undo the move
            element.innerText = "";

            //if the value obtained is better than value exists update bestscore
            if(moveVal < bestScore){
                bestMove["row"] = i;
                bestMove["column"] = j;
                bestScore = moveVal;
            }
        ;

        }

    } ));

    return bestMove;

}

let makeMove = function (board, array ){

    i = array["row"];
    j = array["column"];

    player2.mark(board[i][j]);


}

function isempty(board){
    for (array of board) 
    {
        for (let element of array){
            if(element.innerText == "")
                return true;
        }
    }
    return false;
}

let minimax = function (board, depth , isMax){


    let score = evaluation(board);

    //win or loss
    if(score == 10){
        return score;
    }
    if(score == -10){
        return score;
    }

    //tie
   if (!isempty(board)){
       return 0;
   }
    
    if(isMax){
        let best = -1000;

        for(let array of board){
            for(let element of array){
                if(element.innerText == ""){
                
                    element.innerText = player1.sign;
    
                    best = Math.max(best, minimax(board, depth +1, !isMax));
    
    
                    element.innerText = "";
                }
            }
        }
    return best;
    }


    else{

        let best = 1000;

        for(let array of board){
            for(let element of array){
                if(element.innerText == ""){
                
                    element.innerText = player2.sign;
    
                    best = Math.min(best, minimax(board, depth +1, !isMax));
    
    
                    element.innerText = "";
                }
            }
        }
    return best;
    }
}



//Gameboard.gameboard.forEach((box) => box.forEach((element) => element.addEventListener('click', copyBoard)));