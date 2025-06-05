import { useState, useEffect } from 'react';
import './ProfileCard.scss';
import ProfileEditCard from './ProfileEditCard';
import profilePic from '../../assets/images/users/default.png';

import useFetch from '../../utils/useFetch';
import { useParams } from 'react-router';

export default function ProfileCard() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [friendStatus, setFriendStatus] = useState('');
    const { sendRequest, resData, isLoading, error } = useFetch();

    useEffect(() => {
        if (!id) {
            sendRequest('/users/me/');
        } else {
            sendRequest(`/users/${id}/`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isEditing) {
            sendRequest('/users/me/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing]);

    let user;
    if (!id) {
        user = resData['/users/me/'];
    } else {
        user = resData[`/users/${id}/`];
    }

    useEffect(() => {
        if (user) {
            setIsFollowing(user.logged_in_user_is_following);
            setFriendStatus(
                user.logged_in_user_is_friends
                    ? '✓ FRIEND'
                    : user.logged_in_user_sent_fr
                      ? 'PENDING'
                      : 'ADD FRIEND'
            );
        }
    }, [user]);

    const handleFollow = async () => {
        await sendRequest(
            `/social/followers/toggle-follow/${user.id}/`,
            null,
            'post'
        );
        setIsFollowing((prev) => !prev);
    };

    const handleFriendRequest = async () => {
        if (friendStatus !== 'ADD FRIEND') return;

        await sendRequest(`/social/friends/request/${user.id}/`, null, 'post');
        setFriendStatus('PENDING');
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading profile.</p>;
    if (!user) return null;

    return (
        <div className="profile-card">
            {!isEditing ? (
                <>
                    <div className="left-panel">
                        <img
                            className="avatar"
                            src={user.avatar || profilePic}
                            alt="Avatar"
                        />
                        <h2 className="name">
                            {user.first_name} {user.last_name}
                        </h2>
                        <p className="location">
                            {user.location || 'No location set'}
                        </p>

                        {id ? (
                            <div className="button-row">
                                <button
                                    className={`btn-follow ${isFollowing ? 'active' : ''}`}
                                    onClick={handleFollow}
                                    disabled={isLoading}
                                >
                                    {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                                </button>

                                <button
                                    className={`btn-friend ${friendStatus !== 'ADD FRIEND' ? 'active' : ''}`}
                                    onClick={handleFriendRequest}
                                    disabled={
                                        friendStatus !== 'ADD FRIEND' ||
                                        isLoading
                                    }
                                >
                                    {friendStatus}
                                </button>
                            </div>
                        ) : (
                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(true)}
                            >
                                EDIT PROFILE
                            </button>
                        )}
                    </div>

                    <div className="right-panel">
                        <div className="main-content">
                            <div className="left-content">
                                <div className="about">
                                    <h4>About</h4>
                                    <p>{user.about_me || 'No bio yet'}</p>
                                </div>
                                <div className="info">
                                    <div>
                                        <h4>Email</h4>
                                        <p>{user.email}</p>
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>{user.phone_number || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="likes">
                                    <h4>Things I like</h4>
                                    <div className="tags">
                                        {user.things_user_likes?.length > 0 ? (
                                            user.things_user_likes.map(
                                                (tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="tag"
                                                    >
                                                        {tag}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <p>No interests added</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="stat">
                                <span className="value">
                                    {user.amount_of_posts}
                                </span>
                                <span className="label">Posts</span>
                            </div>
                            <div className="stat">
                                <span className="value">
                                    {user.amount_of_likes}
                                </span>
                                <span className="label">Likes</span>
                            </div>
                            <div className="stat">
                                <span className="value">
                                    {user.amount_of_friends}
                                </span>
                                <span className="label">Friends</span>
                            </div>
                            <div className="stat">
                                <span className="value">
                                    {user.amount_of_followers}
                                </span>
                                <span className="label">Followers</span>
                            </div>
                            <div className="stat">
                                <span className="value">
                                    {user.amount_following}
                                </span>
                                <span className="label">Following</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <ProfileEditCard
                    user={user}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </div>
    );
}
