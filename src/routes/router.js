import { lazy } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

// Pages Import
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Reels = lazy(() => import("../pages/Reels"));
const Explore = lazy(() => import("../pages/Explore"));
const Profile = lazy(() => import("../pages/Profile"));
const Auth = lazy(() => import("../pages/Auth"));
const GamePage = lazy(() => import("../pages/GamePage"));
const Root = lazy(() => import("../layout/LayoutRoot"));
const Chat = lazy(() => import("../pages/Chat"));
const PlayGame = lazy(() => import("../pages/PlayGame"));
const Friends = lazy(() => import("../pages/Friends"));
const NearMe = lazy(() => import("../components/explorePageComponents/NearMe"));
const SearchUser = lazy(
    () => import("../components/explorePageComponents/SearchUser")
);
const User = lazy(() => import("../pages/User"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="auth/:purpose" element={<Auth />} />
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
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

export default router;
