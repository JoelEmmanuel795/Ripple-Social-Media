// PostView.jsx
import { useEffect, useState, useRef } from 'react';
import share from '../../../assets/svgs/share.svg';
import heart from '../../../assets/svgs/heart.svg';
import heartLiked from '../../../assets/svgs/heart_colored.svg';
import edit_icon from '../../../assets/svgs/edit_grey.svg';
import userAvatar from '../../../assets/images/users/default.png';
import './PostView.scss';

import { formatDistanceToNow } from 'date-fns';
import PostEdit from '../PostEdit/PostEdit';
import useFetch from '../../../utils/useFetch';

const PostView = ({
    postData,
    isShown,
    showModalFunc,
    postID,
    setShowPostView,
}) => {
    /* ─────────────────────────────────── state ─────────────────────────────────── */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publishedAt, setPublishedAt] = useState('2023-10-01T12:00:00Z');
    const [content, setContent] = useState('');
    const [likes, setLikes] = useState(0);
    const [isMyPost, setIsMyPost] = useState(false);
    const [liked, setLiked] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasImages = images.length > 0;

    const [showEditModal, setShowEditModal] = useState(false); // PostEdit
    const [showDropdown, setShowDropdown] = useState(false); // pencil
    const [showDeleteModal, setShowDeleteModal] = useState(false); // confirm

    const dropdownRef = useRef(null);
    const { sendRequest } = useFetch();

    const modalCls = `post-view-modal ${hasImages ? '' : 'no-image'}`;
    const contentCls = `post-view-content ${hasImages ? '' : 'no-image'}`;

    /* ────────────────────────────── hydrate from props ─────────────────────────── */
    useEffect(() => {
        if (!postData) return;
        setFirstName(postData.user.first_name);
        setLastName(postData.user.last_name);
        setPublishedAt(postData.created);
        setContent(postData.content);
        setLikes(postData.amount_of_likes);
        setIsMyPost(postData.is_from_logged_in_user);
        setLiked(postData.logged_in_user_liked);
        setAvatar(postData.user.avatar);
        setImages(postData.images || []);
    }, []);

    /* ───────────────────────────── dropdown outside-click ─────────────────────── */
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setShowDropdown(false);
            }
        }
        if (showDropdown)
            document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    /* ─────────────────────────────── helpers ──────────────────────────────────── */
    const handleToggleLikes = () => {
        sendRequest(`/social/posts/toggle-like/${postData.id}/`, null, 'post');
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    };

    const handleDeleteConfirm = () => {
        sendRequest(
            `/social/posts/${postData.id}/`,
            { post_id: postData.id },
            'delete'
        );
        setShowDeleteModal(false);
        setShowPostView(false);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    /* ────────────────────────────────── render ────────────────────────────────── */
    return isShown ? (
        <div
            className="post-view-overlay"
            onClick={() => setShowPostView(false)}
        >
            <div className={modalCls} onClick={(e) => e.stopPropagation()}>
                <button
                    className="modal-close-btn"
                    onClick={() => setShowPostView(false)}
                >
                    ×
                </button>

                {/* ─────────────── row (image column + details column) ─────────────── */}
                <div className={contentCls}>
                    {hasImages && (
                        <div className="post-image-slider">
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
                        </div>
                    )}

                    {/* ─────────────── right details column ─────────────── */}
                    <div className="post-details-panel">
                        <header className="post-header">
                            <img
                                className="user-avatar"
                                src={avatar || userAvatar}
                                alt=""
                            />
                            <div className="name-and-published">
                                {firstName} {lastName}
                                <br />
                                <p>
                                    {formatDistanceToNow(
                                        new Date(publishedAt),
                                        { addSuffix: true }
                                    )}
                                </p>
                            </div>

                            {isMyPost && (
                                <>
                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            setShowDropdown(!showDropdown)
                                        }
                                    >
                                        <img src={edit_icon} alt="edit" />
                                    </button>

                                    {showDropdown && (
                                        <div
                                            className="dropdown-menu"
                                            ref={dropdownRef}
                                        >
                                            {/* ↓ hide dropdown as soon as an option is chosen */}
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setShowDropdown(false);
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setShowDropdown(false);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
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

                {/* ─────────────── edit modal ─────────────── */}
                {isMyPost && (
                    <PostEdit
                        postData={postData}
                        isShown={showEditModal}
                        showModalFunc={setShowEditModal}
                        postID={postID}
                    />
                )}

                {/* ─────────────── delete confirmation ─────────────── */}
                {showDeleteModal && (
                    <div
                        className="delete-modal-overlay"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <div
                            className="delete-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="delete-icon-circle">🗑️</div>
                            <p>Are you sure you want to delete this post?</p>
                            <div className="delete-modal-actions">
                                <button
                                    className="delete-cancel-btn"
                                    onClick={() => setShowDeleteModal(false)}
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
