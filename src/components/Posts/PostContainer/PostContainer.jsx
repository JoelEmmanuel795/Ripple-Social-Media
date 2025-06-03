import './PostContainer.scss';
import PostNavbar from '../PostsNavbar/PostNavbar';
import { useParams } from 'react-router';
import PostCreator from '../PostCreator/PostCreator';
import Post from '../PostComponent/Post';

const PostContainer = () => {
    const { filter } = useParams();

    return (
        <div className="post-master-container">
            <PostNavbar />
            <div className="post-columns-container">
                <PostCreator />
                <Post />
                <div className="boxy">Likey smikey</div>
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
