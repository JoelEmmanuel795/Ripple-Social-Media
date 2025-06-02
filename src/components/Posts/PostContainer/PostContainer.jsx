import './PostContainer.scss';
import PostNavbar from '../PostsNavbar/PostNavbar';
import { Outlet } from 'react-router';

const PostContainer = () => {
    return (
        <div className="post-master-container">
            <PostNavbar />
            <div className="post-columns-container">
                <Outlet />
            </div>
        </div>
    );
};

export default PostContainer;
