import { useEffect, useState } from 'react';
import share from '../../../assets/svgs/share.svg';
import heart from '../../../assets/svgs/heart.svg';
import heartLiked from '../../../assets/svgs/heart_colored.svg';
import './Post.scss';
import userAvatar from '../../../assets/images/users/default.png';
import kebabMenu from '../../../assets/svgs/menu.svg';
import { formatDistanceToNow } from 'date-fns';
import ImageGallery from '../ImageGallery/ImageGallery';
import useFetch from '../../../utils/useFetch';
import { useNavigate } from 'react-router';

const Post = ({ postData }) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publishedAt, setPublishedAt] = useState('2023-10-01T12:00:00Z');
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const { sendRequest } = useFetch();

    useEffect(() => {
        //console.log(postData);
        setFirstName(postData.user.first_name);
        setLastName(postData.user.last_name);
        setPublishedAt(postData.created);
        setContent(postData.content);
        setLikes(postData.amount_of_likes);
        setLiked(postData.logged_in_user_liked);
        setAvatar(postData.user.avatar);
        //console.log(postData.images);
    }, []);

    function handleKebabButton() {
        console.log('Kebab!');
    }

    function handleToggleLikes() {
        sendRequest(`/social/posts/toggle-like/${postData.id}/`, null, 'post');
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
        setLiked((prev) => !prev);
    }

    return (
        <div className="post-item-container">
            <header className="post-header">
                <img
                    className="user-avatar"
                    src={avatar ? avatar : userAvatar}
                    onClick={() => navigate(`/profile/${postData.user.id}`)}
                />
                <div className="name-and-published">
                    {firstName} {lastName}
                    <br />
                    <p>
                        {formatDistanceToNow(new Date(publishedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
                {
                    <img
                        className="kebab-menu"
                        src={kebabMenu}
                        onClick={handleKebabButton}
                    ></img>
                }
            </header>
            <p className="post-text">{content}</p>
            <ImageGallery images={postData.images} />
            <footer className="post-footer">
                <div className="like-button" onClick={handleToggleLikes}>
                    <img
                        className="heart"
                        src={liked ? heartLiked : heart}
                    ></img>
                    <p>Like</p>
                </div>
                <div className="share-button">
                    <img className="share" src={share}></img>
                    <p>Share</p>
                </div>
                <p className="num-of-likes">{likes} likes</p>
            </footer>
        </div>
    );
};

export default Post;
