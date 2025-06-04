import { useEffect, useState } from 'react';
import share from '../../../assets/svgs/share.svg';
import heart from '../../../assets/svgs/heart.svg';
import './Post.scss';
import userAvatar from '../../../assets/images/users/jennifer.png';
import kebabMenu from '../../../assets/svgs/menu.svg';
import { formatDistanceToNow } from 'date-fns';
import ImageGallery from '../ImageGallery/ImageGallery';

const Post = ({ postData }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publishedAt, setPublishedAt] = useState('2023-10-01T12:00:00Z');
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        console.log(postData);
        setFirstName(postData.user.first_name);
        setLastName(postData.user.last_name);
        setPublishedAt(postData.created);
        setContent(postData.content);
        setLikes(postData.amount_of_likes);
        console.log(postData.images);
    }, []);

    function handleKebabButton() {
        console.log('Kebab!');
    }

    return (
        <div className="post-item-container">
            <header className="post-header">
                <img className="user-avatar" src={userAvatar}></img>
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
                <div className="like-button">
                    <img className="heart" src={heart}></img>
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
