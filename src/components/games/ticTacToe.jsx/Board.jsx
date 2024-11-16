import makeMove from "./utils/makeMove";

const Board = ({
    board,
    gameId,
    currentPlayer,
    currentUserId,
    accessToken
}) => {
    const renderSquare = (index) => (
        <button
            className="square"
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
        <div className="board">
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
