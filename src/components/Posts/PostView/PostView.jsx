import { useEffect, useState, useRef } from 'react';
import share from '../../../assets/svgs/share.svg';
import heart from '../../../assets/svgs/heart.svg';
import heartLiked from '../../../assets/svgs/heart_colored.svg';
import './PostView.scss';
import userAvatar from '../../../assets/images/users/default.png';
import edit_icon from '../../../assets/svgs/edit_grey.svg';
import { formatDistanceToNow } from 'date-fns';
import ImageGallery from '../ImageGallery/ImageGallery';
import PostEdit from '../PostEdit/PostEdit';
import useFetch from '../../../utils/useFetch';

const PostView = ({
    postData,
    isShown,
    showModalFunc,
    postID,
    setShowPostView,
}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publishedAt, setPublishedAt] = useState('2023-10-01T12:00:00Z');
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(0);
    const [postIDState, setPostID] = useState('');
    const [isMyPost, setIsMyPost] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // const [menuO, setMenu] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const dropdownRef = useRef(null);

    const { sendRequest, resData, isLoading, error } = useFetch();

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteModal(true);
        setShowDropdown(false);
    };

    const handleDeleteConfirm = () => {
        sendRequest(
            `/social/posts/${postIDState}/`,
            { post_id: postIDState },
            'delete'
        );
        setShowDeleteModal(false);
        setShowPostView(false);
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
        setImages(postData.images || []);
        //console.log(postData.images);
    }, []);

    function handleEditButton() {
        setShowModal(true);
        setShowDropdown(false);
    }

    function handleDropdownToggle(e) {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        }

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    function handleToggleLikes() {
        sendRequest(`/social/posts/toggle-like/${postData.id}/`, null, 'post');
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
        setLiked((prev) => !prev);
    }

    // Add overlay click handler
    function handleOverlayClick(e) {
        e.stopPropagation();
        setShowPostView(false);
        if (showModalFunc) showModalFunc(false);
    }

    return isShown ? (
        <div
            className={isShown ? 'post-view-overlay' : 'invisible'}
            onClick={handleOverlayClick}
        >
            <div
                className="post-view-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal-close-btn"
                    onClick={handleOverlayClick}
                    aria-label="Close modal"
                >
                    ×
                </button>

                <div className="post-view-content">
                    {/* LEFT IMAGE PANEL */}
                    <div className="post-image-slider">
                        {images.length ? (
                            <div className="img-wrapper">
                                <img
                                    src={images[currentImageIndex].image}
                                    className="post-image"
                                    alt=""
                                />

                                {images.length > 1 && (
                                    <>
                                        <button
                                            className="nav-arrow left"
                                            onClick={() =>
                                                setCurrentImageIndex((i) =>
                                                    i === 0
                                                        ? images.length - 1
                                                        : i - 1
                                                )
                                            }
                                        >
                                            ‹
                                        </button>
                                        <button
                                            className="nav-arrow right"
                                            onClick={() =>
                                                setCurrentImageIndex((i) =>
                                                    i === images.length - 1
                                                        ? 0
                                                        : i + 1
                                                )
                                            }
                                        >
                                            ›
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="no-image-placeholder" />
                        )}
                    </div>

                    {/* RIGHT POST DETAILS */}
                    <div className="post-details-panel">
                        <header className="post-header">
                            <img
                                className="user-avatar"
                                src={avatar || userAvatar}
                                alt="avatar"
                            />
                            <div className="name-and-published">
                                {firstName} {lastName}
                                <br />
                                <p>
                                    {formatDistanceToNow(
                                        new Date(publishedAt),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
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
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                        }}
                                    >
                                        <img
                                            className="kebab-menu"
                                            src={edit_icon}
                                            alt="menu"
                                        />
                                    </button>
                                    {showDropdown && (
                                        <div
                                            className="dropdown-menu"
                                            ref={dropdownRef}
                                        >
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

                        <footer className="post-footer">
                            <div className="footer-left">
                                <div
                                    className="like-button"
                                    onClick={handleToggleLikes}
                                >
                                    <img
                                        className="heart"
                                        src={liked ? heartLiked : heart}
                                        alt=""
                                    />
                                    <span>Like</span>
                                </div>
                                <div className="share-button">
                                    <img className="share" src={share} alt="" />
                                    <span>Share</span>
                                </div>
                            </div>

                            <span className="likes-count">{likes} likes</span>
                        </footer>
                    </div>
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
            </div>
        </div>
    ) : null;
};

export default PostView;
