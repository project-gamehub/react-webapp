import GameCardContainer from "../components/gamePageComponents/GameCardsContainer";
import TicTacToe from "../components/games/ticTacToe.jsx/TicTacToe";

import useLogout from "../utils/useLogout";

const Home = () => {
    const logout = useLogout();

    return (
        <>
            {/* <GameCardContainer /> */}
            <TicTacToe />
        </>
    );
};

export default Home;
