let aiplayer = (() => {

//with array
let bestMove ={"row":-1,"column":-1};

// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
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
	
	// Checking for Rows for X or O victory.
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

	// Checking for Columns for X or O victory.
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

	// Checking for Diagonals for X or O victory.
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

	// Else if none of them have
	// won then return 0
	return 0;
}

// This is the minimax function. It
// considers all the possible ways
// the game can go and returns the
// value of the board
function minimax(board, depth, alpha, beta, isMax)
{
	let score = evaluate(board);

	// If Maximizer has won the game
	// return his/her evaluated score
	if (score == 10)
		return score;

	// If Minimizer has won the game
	// return his/her evaluated score
	if (score == -10)
		return score;

	// If there are no more moves and
	// no winner then it is a tie
	if (isMovesLeft(board) == false)
		return 0;

	// If this maximizer's move
	if (isMax)
	{
		let best = -1000;

		// Traverse all cells
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				
				// Check if cell is empty
				if (board[i][j]=='_')
				{
					
					// Make the move
					board[i][j] = player1.sign;

					// Call minimax recursively
					// and choose the maximum value
					best = Math.max(best, minimax(board,
									depth + 1,alpha, beta, !isMax));

					// Undo the move
					board[i][j] = '_';

                    //  alpha = Math.max(alpha, best);
                        
                    //     if(beta<=alpha){
                    //         break;
                    //     }

				}
			}
		}
		return best - depth;
	}

	// If this minimizer's move
	else
	{
		let best = 1000;

		// Traverse all cells
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				
				// Check if cell is empty
				if (board[i][j] == '_')
				{
					
					// Make the move
					board[i][j] = player2.sign;

					// Call minimax recursively and
					// choose the minimum value
					best = Math.min(best, minimax(board,
									depth + 1, alpha, beta, !isMax));

					// Undo the move
					board[i][j] = '_';
                    // beta = Math.min(beta, best);
                        
                    // if(beta<=alpha){
                    //     break;
                    // }
				}
			}
		}
		return best + depth;
	}
}

// This will return the best possible
// move for the player
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

				// compute evaluation function
				// for this move.
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
