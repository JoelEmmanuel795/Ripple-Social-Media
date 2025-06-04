import { useEffect, useState } from 'react';
import share from '../../../assets/svgs/share.svg';
import heart from '../../../assets/svgs/heart.svg';
import heartLiked from '../../../assets/svgs/heart_colored.svg';
import './Post.scss';
import userAvatar from '../../../assets/images/users/default.png';
import kebabMenu from '../../../assets/svgs/menu.svg';
import { formatDistanceToNow } from 'date-fns';
import ImageGallery from '../ImageGallery/ImageGallery';
import PostEdit from '../PostEdit/PostEdit';
import useFetch from '../../../utils/useFetch';

const Post = ({ postData }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publishedAt, setPublishedAt] = useState('2023-10-01T12:00:00Z');
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(0);
    const [postID, setPostID] = useState('');
    const [isMyPost, setIsMyPost] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // const [menuO, setMenu] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { sendRequest, resData, isLoading, error } = useFetch();

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteModal(true);
        setShowDropdown(false);
    };

    const handleDeleteConfirm = () => {
        sendRequest(`/social/posts/${postID}/`, { post_id: postID }, 'delete');
        setShowDeleteModal(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };
    const [liked, setLiked] = useState(false);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        //console.log(postData);
        setFirstName(postData.user.first_name);
        setLastName(postData.user.last_name);
        setPublishedAt(postData.created);
        setContent(postData.content);
        setLikes(postData.amount_of_likes);
        setPostID(postData.id);
        setIsMyPost(postData.is_from_logged_in_user);
        setLiked(postData.logged_in_user_liked);
        setAvatar(postData.user.avatar);
        //console.log(postData.images);
    }, []);

    function handleEditButton() {
        setShowModal(true);
    }

    function handleDropdownToggle(e) {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
    }

    useEffect(() => {
        function handleClickOutside() {
            setShowDropdown(false);
        }
        if (showDropdown) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showDropdown]);

    function handleToggleLikes() {
        sendRequest(`/social/posts/toggle-like/${postData.id}/`, null, 'post');
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
        setLiked((prev) => !prev);
    }

    return (
        <>
            <div className="post-item-container">
                <header className="post-header">
                    <img
                        className="user-avatar"
                        src={avatar ? avatar : userAvatar}
                    ></img>
                    <div className="name-and-published">
                        {firstName} {lastName}
                        <br />
                        <p>
                            {formatDistanceToNow(new Date(publishedAt), {
                                addSuffix: true,
                            })}
                        </p>
                    </div>
                    {isMyPost && (
                        <div
                            className="dropdown-wrapper"
                            style={{ position: 'relative' }}
                        >
                            <button
                                className="func-buttons"
                                onClick={handleDropdownToggle}
                                style={{ background: 'none', border: 'none' }}
                            >
                                <img
                                    className="kebab-menu"
                                    src={kebabMenu}
                                    alt="menu"
                                />
                            </button>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <button
                                        className="dropdown-item"
                                        onClick={handleEditButton}
                                    >
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onClick={handleDeleteClick}
                                    >
                                        <span>Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
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
            {isMyPost && (
                <PostEdit
                    postData={postData}
                    isShown={showModal}
                    showModalFunc={setShowModal}
                    postID={postID}
                />
            )}
            {showDeleteModal && (
                <div
                    className="delete-modal-overlay"
                    onClick={handleDeleteCancel}
                >
                    <div
                        className="delete-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="delete-icon-circle">
                            <svg
                                width="28"
                                height="28"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#bbb"
                                    d="M9 3a3 3 0 0 1 6 0h5a1 1 0 1 1 0 2h-1v15a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5H4a1 1 0 1 1 0-2h5Zm2 0a1 1 0 1 1 2 0h-2Zm-5 2v15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H6Zm3 4a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0V9Zm4 0a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0V9Z"
                                />
                            </svg>
                        </div>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="delete-modal-actions">
                            <button
                                className="delete-cancel-btn"
                                onClick={handleDeleteCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="delete-confirm-btn"
                                onClick={handleDeleteConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
