import './PostEdit.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../../../utils/useFetch';
import send_button from '../../../assets/svgs/send_button.svg';
import photo_upload_button from '../../../assets/misc/photo_upload_button.png';
import white_x_rounded from '../../../assets/misc/white_x_rounded.png';
import { formatDistanceToNow } from 'date-fns';

const PostEdit = ({ isShown, showModalFunc, postData, postID }) => {
    const loadingString = `Loading...`;
    const [userInfo, setUserInfo] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publishedAt, setPublishedAt] = useState('2023-10-01T12:00:00Z');
    const [postText, setPostText] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [postEditPhotos, setPostEditPhotos] = useState([]);
    const [photoEditPreviews, setPhotoEditPreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [removedImageIds, setRemovedImageIds] = useState([]);

    const access = useSelector((state) => state.user.accessToken);
    const getUserMe = '/users/me/';
    const editPostUrl = `/social/posts/${postID}/`;

    const { sendRequest, resData, isLoading, error } = useFetch();

    useEffect(() => {
        if (postData) {
            setPostText(postData.content || '');
            setFirstName(postData.user.first_name);
            setLastName(postData.user.last_name);
            setPublishedAt(postData.created);
            setUserAvatar(postData.user.avatar || '');

            // Only keep image URLs in existingImages, not postEditPhotos
            setExistingImages(
                postData.images.map((img) => ({
                    id: img.id,
                    url: img.image,
                }))
            );

            setPostEditPhotos([]); // Clear any stale new uploads
            setPhotoEditPreviews([]);
        }
    }, [isShown]);

    // Fetch user images when postData is available
    useEffect(() => {
        if (postData && postData.images) {
            setExistingImages(
                postData.images.map((img) => ({
                    id: img.id,
                    url: img.image,
                }))
            );
        }
    }, [postData]);

    // Fetch user data when access token is available
    useEffect(() => {
        if (access) {
            sendRequest(getUserMe);
        }
        console.log('Access token:', access);
        console.log('postID: ', postID);
    }, [access]);

    // Update user info from the "/users/me/" endpoint
    useEffect(() => {
        if (resData && resData[getUserMe]) {
            setUserInfo(resData[getUserMe]);
            console.log(resData[getUserMe]);
        }
    }, [resData]);

    useEffect(() => {
        return () => {
            photoEditPreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [photoEditPreviews]);

    function handleModal(e) {
        e.stopPropagation();
        resetAllData();
        showModalFunc(false);
    }

    function handleEditPost(e) {
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

        postEditPhotos.forEach((file) => {
            formData.append('images', file);
        });

        sendRequest(`/social/posts/${postID}/`, formData, 'patch');
        resetAllData();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    function handlePostText(e) {
        setPostText(e.currentTarget.value);
    }

    function handleAddPhoto(e) {
        const files = Array.from(e.currentTarget.files);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPostEditPhotos((prev) => [...prev, ...files]);
        setPhotoEditPreviews((prev) => [...prev, ...newPreviews]);
        e.target.value = null;
    }

    useEffect(() => {
        console.log('postEditPhotos:', postEditPhotos);
        console.log('photoEditPreviews:', photoEditPreviews);
        console.log('existingImages:', existingImages);
        console.log('removedImageIDs:', removedImageIds);
    }, [postEditPhotos, photoEditPreviews, existingImages, removedImageIds]);

    function handleRemovePhoto(idx) {
        setPostEditPhotos((prev) => prev.filter((_, i) => i !== idx));
        setPhotoEditPreviews((prev) => {
            URL.revokeObjectURL(prev[idx]);
            return prev.filter((_, i) => i !== idx);
        });
    }

    function handleRemoveExistingImage(id) {
        setExistingImages((prev) => prev.filter((img) => img.id !== id));
        setRemovedImageIds((prev) => [...prev, id]);
    }

    function resetAllData() {
        setPostText('');
        setPostEditPhotos([]);
        setPhotoEditPreviews([]);
        showModalFunc(false);
        setExistingImages([]);
        setRemovedImageIds([]);
        setFirstName('');
        setLastName('');
        setPublishedAt('2023-10-01T12:00:00Z');
        setUserInfo({});
    }

    return (
        <div
            className={isShown ? 'post-edit-overlay' : 'invisible'}
            onClick={handleModal}
        >
            <div
                className="post-edit-container"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal-close-btn"
                    onClick={handleModal}
                    aria-label="Close modal"
                >
                    ×
                </button>
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
                </header>
                <div className="post-columns-container">
                    <div className="edit-column-left">
                        {(existingImages.length > 0 ||
                            photoEditPreviews.length > 0) && (
                            <div className="image-preview-container-edit">
                                {existingImages.map((img, idx) => (
                                    <div
                                        className="image-preview-wrapper-edit"
                                        key={`existing-${img.id}`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Existing image ${idx + 1}`}
                                            className="image-preview-edit"
                                        />
                                        <img
                                            className="remove-photo-btn-edit"
                                            src={white_x_rounded}
                                            onClick={() =>
                                                handleRemoveExistingImage(
                                                    img.id
                                                )
                                            }
                                            alt="Remove"
                                        />
                                        <div className="image-preview-text-edit">
                                            {img.url.split('/').pop()}
                                        </div>
                                    </div>
                                ))}
                                {photoEditPreviews.map((preview, idx) => (
                                    <div
                                        className="image-preview-wrapper-edit"
                                        key={`new-${idx}`}
                                    >
                                        <img
                                            src={preview}
                                            alt={postEditPhotos[idx]?.name}
                                            className="image-preview-edit"
                                        />
                                        <img
                                            className="remove-photo-btn-edit"
                                            src={white_x_rounded}
                                            onClick={() =>
                                                handleRemovePhoto(idx)
                                            }
                                            alt="Remove"
                                        />
                                        <div className="image-preview-text-edit">
                                            {postEditPhotos[idx]?.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="edit-column-right">
                        <div className="avatar-and-input-edit">
                            <textarea
                                defaultValue={postText || loadingString}
                                onChange={handlePostText}
                                value={postText}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <footer>
                    <input
                        type="file"
                        className="photo-upload-button-edit"
                        style={{ display: 'none' }}
                        id={`photo-upload-edit-${postID}`}
                        onChange={handleAddPhoto}
                        multiple
                    />
                    <label htmlFor={`photo-upload-edit-${postID}`}>
                        <img
                            className="photo-upload-button-edit"
                            src={photo_upload_button}
                            alt="Upload"
                        />
                    </label>
                    <div
                        className="create-post-bgr-edit"
                        onClick={handleEditPost}
                    >
                        <img
                            className="create-post-edit"
                            src={send_button}
                            alt="Send"
                        />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PostEdit;
