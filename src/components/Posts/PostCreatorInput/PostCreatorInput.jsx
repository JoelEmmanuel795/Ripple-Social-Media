import './PostCreatorInput.scss';
import jennifer_avatar from '../../../assets/images//users/jennifer.png';
import send_button from '../../../assets/svgs/send_button.svg';
import photo_upload_button from '../../../assets/misc/photo_upload_button.png';
import useFetch from '../../../utils/useFetch';
import { useEffect } from 'react';

const PostCreator = ({ isShown, showModalFunc }) => {
    const inputString = `Today I want to write a post about...`;
    const { fetchData, resData, isLoading, error } = useFetch();

    useEffect(() => {
        //fetchData('/posts');
        console.log(resData);
    }, [fetchData, isLoading, resData, error]);

    function handleCreatePost(e) {
        e.stopPropagation();
        showModalFunc(false);
    }

    return (
        <div
            className={isShown ? 'post-modal-overlay' : 'invisible'}
            onClick={handleCreatePost}
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
                    <div className="create-post-bgr">
                        <img className="create-post" src={send_button}></img>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PostCreator;
