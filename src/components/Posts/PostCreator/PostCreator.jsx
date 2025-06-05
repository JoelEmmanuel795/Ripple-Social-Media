import './PostCreator.scss';
import defaultAvatar from '../../../assets/images//users/default.png';
import { useState } from 'react';
import send_button from '../../../assets/svgs/send_button.svg';
import PostCreatorInput from '../PostCreatorInput/PostCreatorInput.jsx';
import useFetch from '../../../utils/useFetch.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PostCreator = () => {
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const inputString = `What's on your mind ${userName}?`;
    const [userInfo, setUserInfo] = useState({});
    const access = useSelector((state) => state.user.accessToken);
    const userMeEndpoint = '/users/me/';

    const { sendRequest, resData } = useFetch();

    useEffect(() => {
        if (access) {
            sendRequest(userMeEndpoint);
        }
    }, [access]);

    useEffect(() => {
        if (resData && resData[userMeEndpoint]) {
            setUserInfo(resData[userMeEndpoint]);
            setUserAvatar(resData[userMeEndpoint].avatar);
            setUserName(resData[userMeEndpoint].first_name);
            console.log(resData[userMeEndpoint]);
        }
    }, [resData]);

    function handleCreatePost(e) {
        e.stopPropagation();
        setShowModal(true);
    }

    return (
        <>
            <div className="post-creator-container" onClick={handleCreatePost}>
                <div className="avatar-and-input">
                    <img className="user-avatar" src={userAvatar}></img>
                    <p>{inputString}</p>
                </div>
                <div className="create-post-bgr">
                    <img className="create-post" src={send_button}></img>
                </div>
            </div>
            <PostCreatorInput
                isShown={showModal}
                showModalFunc={setShowModal}
                userAvatar={userAvatar}
            />
        </>
    );
};

export default PostCreator;
