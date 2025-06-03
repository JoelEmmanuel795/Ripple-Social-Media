import { useState } from 'react';
import './FriendCard.scss';

export default function FriendCard({ friend }) {
    const [isFollowing, setIsFollowing] = useState(
        friend.logged_in_user_is_following
    );
    const [isFriend, setIsFriend] = useState(friend.logged_in_user_is_friends);

    const toggleFollow = () => {
        // TODO: Add follow/unfollow API call here
        setIsFollowing((prev) => !prev);
    };

    const toggleFriend = () => {
        // TODO: Add add/remove friend API call here
        setIsFriend((prev) => !prev);
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
                    className={`btn follow-btn ${isFollowing ? 'active' : ''}`}
                    onClick={toggleFollow}
                >
                    {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                </button>

                <button
                    className={`btn friend-btn ${isFriend ? 'active' : ''}`}
                    onClick={toggleFriend}
                >
                    {isFriend ? '✓ FRIEND' : 'ADD FRIEND'}
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
