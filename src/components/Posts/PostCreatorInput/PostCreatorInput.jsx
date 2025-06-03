import './PostCreatorInput.scss';
import jennifer_avatar from '../../../assets/images//users/jennifer.png';
import send_button from '../../../assets/svgs/send_button.svg';
import photo_upload_button from '../../../assets/misc/photo_upload_button.png';
import useFetch from '../../../utils/useFetch';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const PostCreatorInput = ({ isShown, showModalFunc }) => {
    const inputString = `Today I want to write a post about...`;
    const [userInfo, setUserInfo] = useState({});
    const access = useSelector((state) => state.user.accessToken);
    const getUserMe = '/users/me/';

    const { sendRequest, resData, isLoading, error } = useFetch();
    // const { sendRequest, postData: resData, isLoading, error } = useFetch();

    useEffect(() => {
        console.log('do again');
        sendRequest(getUserMe);
    }, [access]);

    useEffect(() => {
        console.log(resData[getUserMe]);
        if (resData[getUserMe]) {
            setUserInfo(resData[getUserMe]);
        }
        console.log(userInfo);
    }, [resData]);

    function handleModal(e) {
        e.stopPropagation();
        showModalFunc(false);
    }

    function handleCreatePost(e) {
        e.stopPropagation();
        sendRequest('');
    }

    return (
        <div
            className={isShown ? 'post-modal-overlay' : 'invisible'}
            onClick={handleModal}
        >
            <div
                className="post-input-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="avatar-and-input">
                    <img className="user-avatar" src={jennifer_avatar}></img>
                    <textarea placeholder={inputString}></textarea>
                </div>
                <footer>
                    <img
                        className="photo-upload-button"
                        src={photo_upload_button}
                    ></img>
                    <div className="create-post-bgr" onClick={handleCreatePost}>
                        <img className="create-post" src={send_button}></img>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PostCreatorInput;
