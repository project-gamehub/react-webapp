import React from "react";
import SingleUserTile from "./SingleUserTile";
import { useSelector } from "react-redux";

const SearchUserList = () => {
    const searchValue = useSelector((state) => state.exploreSlice.searchValue);
    const searchUserList = useSelector(
        (state) => state.exploreSlice.searchUserList
    );

    if (searchValue === "") {
        return;
    }

    if (searchUserList && searchUserList.length === 0) {
        return <div>No User Found!</div>;
    }

    return (
        <div>
            {searchUserList.map((singleUserData) => {
                return (
                    <SingleUserTile
                        key={singleUserData._id}
                        userData={singleUserData}
                    />
                );
            })}
        </div>
    );
};

export default SearchUserList;
