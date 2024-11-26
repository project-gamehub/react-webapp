import axios from "axios";
import { USER_SERVICE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSearchUserList, setSearchValue } from "../../config/exploreSlice";
import { useState, useEffect } from "react";

const SearchUserSearchBar = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.exploreSlice.searchValue);
    const [debouncedValue, setDebouncedValue] = useState("");

    const handleChange = async (event) => {
        const value = event.target.value.trim().toLowerCase();
        dispatch(setSearchValue(value));
        setDebouncedValue(value);
    };

    useEffect(() => {
        if (debouncedValue === "") {
            dispatch(setSearchUserList([]));
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                const response = await axios.get(
                    `${USER_SERVICE_URL}/autocomplete-username/${debouncedValue}`
                );
                dispatch(setSearchUserList(response?.data?.data || []));
            } catch (error) {}
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [debouncedValue, dispatch]);

    return (
        <div className="disp-flx explore-page-search-bar-container">
            <input
                className="explore-page-search-bar-input-div"
                type="text"
                placeholder="Search User"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={searchValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchUserSearchBar;
