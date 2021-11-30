let aiplayer = (() => {

//with array
let bestMove ={"row":-1,"column":-1};


function isMovesLeft(board)
{
	for(let i = 0; i < 3; i++)
		for(let j = 0; j < 3; j++)
			if (board[i][j] == '_')
				return true;
				
	return false;
}


function evaluate(b)
{
	

	for(let row = 0; row < 3; row++)
	{
		if (b[row][0] == b[row][1] &&
			b[row][1] == b[row][2])
		{
			if (b[row][0] == player1.sign)
				return +10;
				
			else if (b[row][0] == player2.sign)
				return -10;
		}
	}


	for(let col = 0; col < 3; col++)
	{
		if (b[0][col] == b[1][col] &&
			b[1][col] == b[2][col])
		{
			if (b[0][col] == player1.sign)
				return +10;

			else if (b[0][col] == player2.sign)
				return -10;
		}
	}


	if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
	{
		if (b[0][0] == player1.sign)
			return +10;
			
		else if (b[0][0] == player2.sign)
			return -10;
	}

	if (b[0][2] == b[1][1] &&
		b[1][1] == b[2][0])
	{
		if (b[0][2] == player1.sign)
			return +10;
			
		else if (b[0][2] == player2.sign)
			return -10;
	}


	return 0;
}


function minimax(board, depth, alpha, beta, isMax)
{
	let score = evaluate(board);


	if (score == 10)
		return score;


	if (score == -10)
		return score;

	if (isMovesLeft(board) == false)
		return 0;


	if (isMax)
	{
		let best = -1000;

		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				
				if (board[i][j]=='_')
				{
					
					// Make the move
					board[i][j] = player1.sign;

					best = Math.max(best, minimax(board,
									depth + 1,alpha, beta, !isMax));


					board[i][j] = '_';

                     alpha = Math.max(alpha, best);
                        
                        if(beta<=alpha){
                            break;
                        }

				}
			}
		}
		return best - depth;
	}


	else
	{
		let best = 1000;


		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				

				if (board[i][j] == '_')
				{
					
					// Make the move
					board[i][j] = player2.sign;


					best = Math.min(best, minimax(board,
									depth + 1, alpha, beta, !isMax));

					// Undo the move
					board[i][j] = '_';
                    beta = Math.min(beta, best);
                        
                    if(beta<=alpha){
                        break;
                    }
				}
			}
		}
		return best + depth;
	}
}

function findBestMove(board)
{
	let bestVal = 1000;

	for(let i = 0; i < 3; i++)
	{
		for(let j = 0; j < 3; j++)
		{
			
			// Check if cell is empty
			if (board[i][j] == '_')
			{
				
				// Make the move
				board[i][j] = player2.sign;

				let moveVal = minimax(board, 0, -1000, 1000, true);

				// Undo the move
				board[i][j] = '_';

				if (moveVal < bestVal)
				{
					bestMove["row"] = i;
					bestMove["col"] = j;
					bestVal = moveVal;
				}
			}
		}
	}

	console.log("The value of the best Move " +
				"is : ", bestVal);

	return bestMove;
}


let makeMove = function (board, array ){

    i = array["row"];
    j = array["col"];

    player2.mark(board[i][j]);


}

return {makeMove, findBestMove}
})();
