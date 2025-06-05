import './PostCreator.scss';
import defaultAvatar from '../../../assets/images//users/default.png';
import { useState } from 'react';
import send_button from '../../../assets/svgs/send_button.svg';
import PostCreatorInput from '../PostCreatorInput/PostCreatorInput.jsx';

const PostCreator = () => {
    const [userAvatar, setUserAvatar] = useState('Jennifer');
    const [showModal, setShowModal] = useState(false);
    const inputString = `What's on your mind ${userAvatar}?`;

    function handleCreatePost(e) {
        e.stopPropagation();
        setShowModal(true);
    }

    return (
        <>
            <div className="post-creator-container" onClick={handleCreatePost}>
                <div className="avatar-and-input">
                    <img className="user-avatar" src={defaultAvatar}></img>
                    <p>{inputString}</p>
                </div>
                <div className="create-post-bgr">
                    <img className="create-post" src={send_button}></img>
                </div>
            </div>
            <PostCreatorInput
                isShown={showModal}
                showModalFunc={setShowModal}
            />
        </>
    );
};

export default PostCreator;
