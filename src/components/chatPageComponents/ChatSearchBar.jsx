import React from "react";

const ChatSearchBar = () => {
    return (
        <div className="chat-search-bar-container">
            <input
                className="chat-search-bar-input-div"
                type="text"
                placeholder="Search"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
            <button className="chat-search-button-container">
                <span className="material-symbols-rounded chat-search-icon">
                    search
                </span>
            </button>
        </div>
    );
};

export default ChatSearchBar;
