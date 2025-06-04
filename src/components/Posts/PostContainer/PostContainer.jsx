import './PostContainer.scss';
import PostNavbar from '../PostsNavbar/PostNavbar';
import { useParams } from 'react-router';
import PostCreator from '../PostCreator/PostCreator';
import Post from '../PostComponent/Post';
import useFetch from '../../../utils/useFetch';
import { useEffect } from 'react';

const PostContainer = () => {
    //const access = useSelector((state) => state.user.accessToken);
    const { resData, sendRequest, isLoading } = useFetch();
    const { filter } = useParams();

    useEffect(() => {
        switch (filter) {
            case 'liked':
                sendRequest('/social/posts/likes/', 'get');
                break;
            case 'friends':
                sendRequest('/social/posts/friends/', 'get');
                break;
            case 'following':
                sendRequest('/social/posts/likes/', 'get');
                break;
            default:
                sendRequest('/social/posts/', 'get');
        }
    }, [filter]);

    useEffect(() => {
        console.log(resData);
    }, [resData]);
    return (
        <div className="post-master-container">
            <PostNavbar />
            <div className="post-columns-container">
                <PostCreator />
                {isLoading && <>Loading...</>}
                {resData['/social/posts/']?.results.map((post) => {
                    return <Post key={post.id} postData={post} />;
                })}
            </div>
        </div>
    );
};

export default PostContainer;
