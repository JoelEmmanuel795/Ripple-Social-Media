import { useState } from 'react';
import share from '../../../assets/svgs/share.svg';
import heart from '../../../assets/svgs/heart.svg';
import './Post.scss';
import userAvatar from '../../../assets/images/users/jennifer.png';
import kebabMenu from '../../../assets/svgs/menu.svg';
import { formatDistanceToNow } from 'date-fns';

const Post = () => {
    const [firstName, setFirstName] = useState('Jennifer');
    const [lastName, setLastName] = useState('Smith');
    const [publishedAt, setPublishedAt] = useState('2023-10-01T12:00:00Z');
    const [content, setContent] = useState(
        'This is a sample post content. We like to write posts about random things when we are random people.'
    );
    const [likes, setLikes] = useState(0);

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
                <img
                    className="kebab-menu"
                    src={kebabMenu}
                    onClick={handleKebabButton}
                ></img>
            </header>
            <p className="post-text">{content}</p>
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
