const FriendSearchBar = () => {
    return (
        <div className="disp-flx friend-search-bar-container">
            <input
                className="friend-search-bar-input-div"
                type="text"
                placeholder="Search Friend"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
            <button className="friend-search-button-container disp-flx">
                <span className="material-symbols-rounded friend-search-icon">
                    search
                </span>
            </button>
        </div>
    );
};

export default FriendSearchBar;
