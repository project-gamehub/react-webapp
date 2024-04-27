import { Link } from "react-router-dom";
import GameCardContainer from "../components/gamePageComponents/GameCardsContainer";

export default function Home() {
    return (
        <>
            <GameCardContainer />
            <Link to={"/login"}>Login</Link>
        </>
    );
}
