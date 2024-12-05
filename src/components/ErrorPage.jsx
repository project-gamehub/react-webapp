import { Link } from "react-router-dom";
import "../styles/errorPage.css";

const ErrorPage = () => {
    return (
        <div className="error-page disp-flx">
            <h2>Looks like you landed on a wrong page</h2>
            <Link to={"/"}>Go to home page</Link>
        </div>
    );
};

export default ErrorPage;
