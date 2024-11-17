import makeMove from "./utils/makeMove";

const Board = ({
    board,
    gameId,
    currentPlayer,
    currentUserId,
    accessToken,
    currentUserTurn,
    winner
}) => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningPattern =
        winner && winner !== "Draw"
            ? winPatterns.find((pattern) =>
                  pattern.every((index) => board[index] === board[pattern[0]])
              )
            : null;

    const getSquareStyle = (index) => {
        if (winningPattern && winningPattern.includes(index)) {
            return winner === currentUserId
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" };
        }
        return {};
    };

    const renderSquare = (index) => (
        <button
            className={
                "square" +
                (!winner && currentUserTurn
                    ? " tic-tac-toe-current-user-turn-board"
                    : "")
            }
            style={getSquareStyle(index)}
            onClick={() =>
                makeMove(
                    index,
                    board,
                    gameId,
                    currentPlayer,
                    currentUserId,
                    accessToken
                )
            }
        >
            {board[index]}
        </button>
    );

    return (
        <div className={"board"}>
            <div className="row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

export default Board;
