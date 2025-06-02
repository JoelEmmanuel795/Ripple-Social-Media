import search_icon from '../../../assets/svgs/search_icon.svg';
import './PostNavbar.scss';

const PostNavbar = () => {
    return (
        <>
            <nav>
                <div className="post-search-container">
                    <img src={search_icon}></img>
                    <input />
                </div>
            </nav>
        </>
    );
};

export default PostNavbar;
