import { useDispatch, useSelector } from "react-redux";
import { setSearchBarValue } from "../../config/friendsDataSlice";

const FriendSearchBar = () => {
    const dispatch = useDispatch();
    const searchBarValue = useSelector(
        (state) => state.friendsDataSlice.searchBarValue
    );

    const handleChange = (event) => {
        dispatch(setSearchBarValue(event.target.value));
    };

    return (
        <div className="disp-flx friend-search-bar-container">
            <input
                className="friend-search-bar-input-div"
                type="text"
                placeholder="Search Friend"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                onChange={handleChange}
                value={searchBarValue}
            />
        </div>
    );
};

export default FriendSearchBar;
