import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

// Pages Import
import Home from "../pages/Home";
import About from "../pages/About";
import Reels from "../pages/Reels";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";
import GamePage from "../pages/GamePage";
import Root from "../layout/LayoutRoot";
import Chat from "../pages/Chat";
import PlayGame from "../pages/PlayGame";
import Friends from "../pages/Friends";
import NearMe from "../components/explorePageComponents/NearMe";
import SearchUser from "../components/explorePageComponents/SearchUser";
import User from "../pages/User";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="auth/:purpose" element={<Auth />} />
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="reels" element={<Reels />} />
                <Route path="about" element={<About />} />
                <Route path="explore" element={<Explore />}>
                    <Route path="near-me" element={<NearMe />} />
                    <Route path="search-user" element={<SearchUser />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="friends" element={<Friends />} />
                <Route path="chat">
                    <Route index element={<Chat />} />
                    <Route path=":otherUserId" element={<Chat />} />
                </Route>
                <Route path="game/:gameslug" element={<GamePage />} />
                <Route path="play/:gameslug" element={<PlayGame />} />
                <Route path="user/:userId" element={<User />} />
            </Route>
        </>
    )
);

export default router;
