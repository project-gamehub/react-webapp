import { Link } from "react-router-dom";
import GameCardContainer from "../components/gamePageComponents/GameCardsContainer";

import useLogout from "../utils/useLogout";

const Home = () => {
    const logout = useLogout();

    return (
        <>
            <GameCardContainer />
        </>
    );
};

export default Home;
