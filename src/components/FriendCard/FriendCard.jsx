import { useState } from 'react';
import './FriendCard.scss';

export default function FriendCard({ friend }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFriend, setIsFriend] = useState(false);

    const toggleFollow = () => setIsFollowing((prev) => !prev);
    const toggleFriend = () => setIsFriend((prev) => !prev);

    return (
        <div className="friend-card">
            <img
                className="avatar"
                src={friend.avatar}
                alt={`${friend.full_name}'s avatar`}
            />
            <h3 className="name">{friend.full_name}</h3>
            <p className="location">{friend.location}</p>

            <div className="button-row">
                <button
                    className={`btn follow-btn ${isFollowing ? 'active' : ''}`}
                    onClick={toggleFollow}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </button>

                <button
                    className={`btn friend-btn ${isFriend ? 'active' : ''}`}
                    onClick={toggleFriend}
                >
                    {isFriend ? 'Friend' : 'Add Friend'}
                </button>
            </div>

            <p className="bio">{friend.bio}</p>

            <div className="interests">
                {friend.interests.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
