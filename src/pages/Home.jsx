import { useEffect } from "react";
import GameCardContainer from "../components/gamePageComponents/GameCardsContainer";

// TODO - When Logging out, clear some slices

const Home = () => {
    useEffect(() => {
        document.title = "GameHub";
    }, []);

    return (
        <>
            <GameCardContainer />
        </>
    );
};

export default Home;
