import './PostContainer.scss';
import PostNavbar from '../PostsNavbar/PostNavbar';
import { useParams } from 'react-router';
import PostCreator from '../PostCreator/PostCreator';
import Post from '../PostComponent/Post';
import useFetch from '../../../utils/useFetch';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

const PostContainer = () => {
    const [endpoint, setEndpoint] = useState();
    const { resData, sendRequest, isLoading } = useFetch('/social/posts/');
    const { filter } = useParams();

    const breakpointColumnsObj = {
        default: 2,
        768: 1,
    };

    useEffect(() => {
        switch (filter) {
            case 'liked':
                setEndpoint('/social/posts/likes/');
                sendRequest('/social/posts/likes/', 'get');
                break;
            case 'friends':
                setEndpoint('/social/posts/friends/');
                sendRequest('/social/posts/friends/', 'get');
                break;
            case 'following':
                setEndpoint('/social/posts/following/');
                sendRequest('/social/posts/following/', 'get');
                break;
            default:
                setEndpoint('/social/posts/');
                sendRequest('/social/posts/', 'get');
        }
    }, [filter]);

    useEffect(() => {}, [resData]);

    return (
        <div className="post-master-container">
            <PostNavbar />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="post-columns-container"
                columnClassName="post-column"
            >
                <PostCreator />
                {isLoading && <>Loading...</>}
                {resData[endpoint]?.results.map((post) => {
                    return <Post key={post.id} postData={post} />;
                })}
            </Masonry>
        </div>
    );
};

export default PostContainer;
