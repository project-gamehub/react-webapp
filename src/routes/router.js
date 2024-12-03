import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

// Pages Import
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Reels = React.lazy(() => import("../pages/Reels"));
const Explore = React.lazy(() => import("../pages/Explore"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Auth = React.lazy(() => import("../pages/Auth"));
const GamePage = React.lazy(() => import("../pages/GamePage"));
const Root = React.lazy(() => import("../layout/LayoutRoot"));
const Chat = React.lazy(() => import("../pages/Chat"));
const PlayGame = React.lazy(() => import("../pages/PlayGame"));
const Friends = React.lazy(() => import("../pages/Friends"));
const NearMe = React.lazy(
    () => import("../components/explorePageComponents/NearMe")
);
const SearchUser = React.lazy(
    () => import("../components/explorePageComponents/SearchUser")
);
const User = React.lazy(() => import("../pages/User"));

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
