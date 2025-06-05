import './PostCreatorInput.scss';
import jennifer_avatar from '../../../assets/images//users/jennifer.png';
import send_button from '../../../assets/svgs/send_button.svg';
import photo_upload_button from '../../../assets/misc/photo_upload_button.png';
import white_x_rounded from '../../../assets/misc/white_x_rounded.png';
import useFetch from '../../../utils/useFetch';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PostCreatorInput = ({ isShown, showModalFunc, userAvatar }) => {
    const inputString = `Today I want to write a post about...`;

    const [userInfo, setUserInfo] = useState({});
    const [postText, setPostText] = useState('');
    const [postPhotos, setPostPhotos] = useState([]); // Array of File objects
    const [photoPreviews, setPhotoPreviews] = useState([]); // Array of preview URLs

    const access = useSelector((state) => state.user.accessToken);
    const getUserMe = '/users/me/';

    const { sendRequest, resData } = useFetch();

    useEffect(() => {
        if (access) {
            sendRequest(getUserMe);
        }
    }, [access]);

    useEffect(() => {
        if (resData && resData[getUserMe]) {
            setUserInfo(resData[getUserMe]);
            console.log(resData[getUserMe]);
        }
    }, [resData]);

    useEffect(() => {
        // Clean up object URLs when component unmounts or previews change
        return () => {
            photoPreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [photoPreviews]);

    function handleModal(e) {
        e.stopPropagation();
        showModalFunc(false);
    }

    function handleCreatePost(e) {
        e.stopPropagation();

        const userPayload = {
            email: userInfo.email,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            username: userInfo.username,
        };

        const formData = new FormData();
        formData.append('user', JSON.stringify(userPayload));
        formData.append('content', postText);

        postPhotos.forEach((file) => {
            formData.append('images', file);
        });

        sendRequest('/social/posts/', formData, 'post');
        resetAllData();
    }

    function handlePostText(e) {
        setPostText(e.currentTarget.value);
    }

    function handleAddPhoto(e) {
        const files = Array.from(e.currentTarget.files);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPostPhotos((prev) => [...prev, ...files]);
        setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }

    function handleRemovePhoto(idx) {
        setPostPhotos((prev) => prev.filter((_, i) => i !== idx));
        setPhotoPreviews((prev) => {
            // Clean up the object URL
            URL.revokeObjectURL(prev[idx]);
            return prev.filter((_, i) => i !== idx);
        });
    }

    function resetAllData() {
        setPostText('');
        setPostPhotos([]);
        setPhotoPreviews([]);
        showModalFunc(false);
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
                <button
                    className="modal-close-btn"
                    onClick={handleModal}
                    aria-label="Close modal"
                >
                    ×
                </button>
                <div className="avatar-and-input">
                    <img
                        className="user-avatar"
                        src={userAvatar}
                        alt="User avatar"
                    />
                    <textarea
                        placeholder={inputString}
                        onChange={handlePostText}
                        value={postText}
                    ></textarea>
                </div>
                {photoPreviews.length > 0 && (
                    <div className="image-preview-container">
                        {photoPreviews.map((preview, idx) => (
                            <div className="image-preview-wrapper" key={idx}>
                                <img
                                    src={preview}
                                    alt={postPhotos[idx]?.name}
                                    className="image-preview"
                                />
                                <img
                                    className="remove-photo-btn"
                                    src={white_x_rounded}
                                    onClick={() => handleRemovePhoto(idx)}
                                ></img>
                                <div className="image-preview-text">
                                    {postPhotos[idx]?.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <footer>
                    <input
                        type="file"
                        className="photo-upload-button"
                        style={{ display: 'none' }}
                        id="photo-upload"
                        onChange={handleAddPhoto}
                        multiple
                    />
                    <label htmlFor="photo-upload">
                        <img
                            className="photo-upload-button"
                            src={photo_upload_button}
                            alt="Upload"
                        />
                    </label>
                    <div className="create-post-bgr" onClick={handleCreatePost}>
                        <img
                            className="create-post"
                            src={send_button}
                            alt="Send"
                        />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PostCreatorInput;
