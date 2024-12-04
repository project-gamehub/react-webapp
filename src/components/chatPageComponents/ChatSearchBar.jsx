import "../../styles/chatPageStyles/chatSearchBar.css";

const ChatSearchBar = ({ searchBarValue, setSearchBarValue }) => {
    return (
        <div className="chat-search-bar-container">
            <input
                className="chat-search-bar-input-div"
                type="text"
                placeholder="Search"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={searchBarValue}
                onChange={(e) => {
                    setSearchBarValue(e.target.value);
                }}
            />
        </div>
    );
};

export default ChatSearchBar;
