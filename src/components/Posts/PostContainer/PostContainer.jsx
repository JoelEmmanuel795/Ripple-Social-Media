import './PostContainer.scss';
import PostNavbar from '../PostsNavbar/PostNavbar';

const PostContainer = () => {
    return (
        <div className="post-master-container">
            <PostNavbar />
            <div className="post-columns-container">
                <div className="boxy">Hi this is a post</div>
                <div className="boxy">You are a post too</div>
                <div className="rectangley">I am a post too</div>
                <div className="boxy">Noooo</div>
                <div className="rectangley">Whyy!!!!</div>
                <div className="boxy"></div>
            </div>
        </div>
    );
};

export default PostContainer;
