import './PostContainer.scss';
import PostNavbar from '../PostsNavbar/PostNavbar';
import PostCreator from '../PostCreator/PostCreator';
import Post from '../PostComponent/Post';
import Masonry from 'react-masonry-css';
import { useParams } from 'react-router';
import { usePaginatedPosts } from '../../../utils/usePaginatedPosts';

const PostContainer = () => {
    const { filter } = useParams();
    const { posts, isLoading, loadMore } = usePaginatedPosts(filter);

    const breakpointColumnsObj = {
        default: 2,
        768: 1,
    };

    return (
        <div className="post-master-container">
            <PostNavbar />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="post-columns-container"
                columnClassName="post-column"
            >
                <PostCreator />
                {isLoading && <p>Loading...</p>}
                {posts.map((post) => (
                    <Post key={post.id} postData={post} />
                ))}
            </Masonry>
            <button onClick={loadMore} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load more'}
            </button>
        </div>
    );
};

export default PostContainer;
