import './PostCreator.scss';
import jennifer_avatar from '../../../assets/images//users/jennifer.png';
import { useState } from 'react';
import send_button from '../../../assets/svgs/send_button.svg';

const PostCreator = () => {
    const [userAvatar, setUserAvatar] = useState('Jennifer');
    const inputString = `What's on your mind ${userAvatar}?`;

    function handleCreatePost() {
        // Logic to handle post creation
        console.log('Post created!');
    }

    return (
        <div className="post-creator-container">
            <div className="avatar-and-input">
                <img className="user-avatar" src={jennifer_avatar}></img>
                <input defaultValue={inputString} />
            </div>
            <div className="create-post-bgr" onClick={handleCreatePost}>
                <img className="create-post" src={send_button}></img>
            </div>
        </div>
    );
};

export default PostCreator;
