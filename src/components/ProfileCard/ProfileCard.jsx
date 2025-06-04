import { useState } from 'react';
import './ProfileCard.scss';
import ProfileEditCard from './ProfileEditCard';

export default function ProfileCard() {
    const [isEditing, setIsEditing] = useState(false);

    const user = {
        avatar: 'https://i.pravatar.cc/150?img=32',
        firstName: 'Jennifer',
        lastName: 'Smith',
        email: 'jennifersmith@gmail.com',
        username: 'jennifer.smith',
        location: 'Zürich, Switzerland',
        phone: '123-456-7890',
        about: 'Lorem ipsum dolor sit amet, vim ut quas volumus probatus, has tantas laudem iracundia et, ad per utamur ceteros apeirian',
        things_user_likes: [
            'Cooking',
            'Travel',
            'Reading',
            'Swimming',
            'Running',
        ],
        stats: {
            posts: 34,
            likes: 256,
            friends: 98,
            followers: 129,
            following: 154,
        },
    };

    return (
        <div className="profile-card">
            {!isEditing ? (
                <>
                    <div className="left-panel">
                        <img
                            className="avatar"
                            src={user.avatar}
                            alt="Avatar"
                        />
                        <h2 className="name">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="location">{user.location}</p>
                        <button
                            className="edit-button"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'CANCEL' : 'EDIT PROFILE'}
                        </button>
                    </div>

                    <div className="right-panel">
                        <div className="main-content">
                            <div className="left-content">
                                <div className="about">
                                    <h4>About</h4>
                                    <p>{user.about}</p>
                                </div>
                                <div className="info">
                                    <div>
                                        <h4>Email</h4>
                                        <p>{user.email}</p>
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>{user.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="likes">
                                    <h4>Things I like</h4>
                                    <div className="tags">
                                        {user.things_user_likes.map(
                                            (tag, index) => (
                                                <span
                                                    key={index}
                                                    className="tag"
                                                >
                                                    {tag}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stats">
                            {Object.entries(user.stats).map(
                                ([label, value]) => (
                                    <div className="stat" key={label}>
                                        <span className="value">{value}</span>
                                        <span className="label">
                                            {label.charAt(0).toUpperCase() +
                                                label.slice(1)}
                                        </span>
                                    </div>
                                )
                            )}
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
