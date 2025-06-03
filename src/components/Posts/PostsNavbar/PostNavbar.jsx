import search_icon from '../../../assets/svgs/search_icon.svg';
import './PostNavbar.scss';
import { NavLink } from 'react-router';

const PostNavbar = () => {
    function handleSearchPosts() {
        console.log('Search posts triggered!');
    }

    return (
        <>
            <nav className="nav-posts">
                <div className="post-search-container">
                    <img src={search_icon} onClick={handleSearchPosts}></img>
                    <input defaultValue={'Search posts...'} />
                </div>
                <div className="post-filters-container">
                    <NavLink
                        to="/posts/all"
                        className={({ isActive }) =>
                            isActive ? 'navLink active' : 'navLink'
                        }
                    >
                        All
                    </NavLink>

                    <NavLink
                        to="/posts/liked"
                        className={({ isActive }) =>
                            isActive ? 'navLink active' : 'navLink'
                        }
                    >
                        Liked
                    </NavLink>

                    <NavLink
                        to="/posts/friends"
                        className={({ isActive }) =>
                            isActive ? 'navLink active' : 'navLink'
                        }
                    >
                        Friends'
                    </NavLink>

                    <NavLink
                        to="/posts/following"
                        className={({ isActive }) =>
                            isActive ? 'navLink active' : 'navLink'
                        }
                    >
                        Following
                    </NavLink>
                </div>
            </nav>
        </>
    );
};

export default PostNavbar;
