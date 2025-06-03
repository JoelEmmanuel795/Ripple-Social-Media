import search_icon from '../../../assets/svgs/search_icon.svg';
import './PostNavbar.scss';
import { NavLink } from 'react-router';

const PostNavbar = () => {
    return (
        <>
            <nav className="nav-posts">
                <div className="post-search-container">
                    <img src={search_icon}></img>
                    <input defaultValue={'Search posts...'} />
                </div>
                <div className="post-filters-container">
                    <NavLink to="/posts/all">All</NavLink>

                    <NavLink to="/posts/liked">Liked</NavLink>

                    <NavLink to="/posts/friends">Friends</NavLink>

                    <NavLink to="/posts/following">Follow</NavLink>
                </div>
            </nav>
        </>
    );
};

export default PostNavbar;
