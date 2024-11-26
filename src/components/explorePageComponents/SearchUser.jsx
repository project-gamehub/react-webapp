import SearchUserSearchBar from "./SearchUserSearchBar";
import "../../styles/explorePageStyles/SearchPage.css";
import SearchUserList from "./SearchUserList";

const SearchUser = () => {
    return (
        <div className="search-user-page">
            <SearchUserSearchBar />
            <SearchUserList />
        </div>
    );
};

export default SearchUser;
