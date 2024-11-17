import { useParams } from "react-router-dom";
import TicTacToe from "../components/games/ticTacToe.jsx/TicTacToe";

const PlayGame = () => {
    const { gameslug } = useParams();

    if (gameslug === "tic-tac-toe") {
        return (
            <>
                <TicTacToe />
            </>
        );
    }
    return <div>Game Not Found</div>;
};

export default PlayGame;
