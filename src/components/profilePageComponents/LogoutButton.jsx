import useLogout from "../../utils/useLogout";

const LogoutButton = () => {
    const logout = useLogout();
    return (
        <div className="logout-btn-container">
            <button className="logout-btn" onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
