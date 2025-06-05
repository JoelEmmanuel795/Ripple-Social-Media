import { useState } from 'react';
import useFetch from '../../utils/useFetch';
import './FriendCard.scss';

export default function FriendCard({ friend }) {
    const { sendRequest, isLoading } = useFetch();

    const [isFollowing, setIsFollowing] = useState(
        friend.logged_in_user_is_following
    );
    const [friendStatus, setFriendStatus] = useState(
        friend.logged_in_user_is_friends
            ? '✓ FRIEND'
            : friend.logged_in_user_sent_fr
              ? 'PENDING'
              : 'ADD FRIEND'
    );

    const handleFollow = async () => {
        await sendRequest(
            `/social/followers/toggle-follow/${friend.id}/`,
            null,
            'post'
        );
        setIsFollowing((prev) => !prev);
    };

    const handleFriendRequest = async () => {
        if (friendStatus !== 'ADD FRIEND') return;

        await sendRequest(
            `/social/friends/request/${friend.id}/`,
            null,
            'post'
        );
        setFriendStatus('PENDING');
    };

    return (
        <div className="friend-card">
            <img
                className="avatar"
                src={friend.avatar || '/default-avatar.png'}
                alt={`${friend.first_name} ${friend.last_name}`}
            />

            <h3 className="name">
                {friend.first_name} {friend.last_name}
            </h3>
            <p className="location">{friend.location || 'Unknown location'}</p>

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
                    disabled={friendStatus !== 'ADD FRIEND' || isLoading}
                >
                    {friendStatus}
                </button>
            </div>

            <p className="bio">{friend.about_me || 'No bio available.'}</p>

            <div className="interests">
                {friend.things_user_likes?.length > 0 ? (
                    friend.things_user_likes.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))
                ) : (
                    <span className="tag">No interests</span>
                )}
            </div>
        </div>
    );
}
