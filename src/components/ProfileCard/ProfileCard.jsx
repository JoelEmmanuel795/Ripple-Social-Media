import { useState } from 'react';
import './ProfileCard.scss';

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
            <div className="left-panel">
                <img className="avatar" src={user.avatar} alt="Avatar" />
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
                {!isEditing ? (
                    <>
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
                    </>
                ) : (
                    <div className="edit-form">
                        <form className="form-fields">
                            <div className="form-columns">
                                <div className="column">
                                    <div className="form-field">
                                        <div className="input-wrapper">
                                            <input
                                                type="text"
                                                id="firstName"
                                                required
                                                defaultValue={user.firstName}
                                            />
                                            <label htmlFor="firstName">
                                                First Name
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <div className="input-wrapper">
                                            <input
                                                type="text"
                                                id="username"
                                                required
                                                defaultValue={user.username}
                                            />
                                            <label htmlFor="username">
                                                Username
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <div className="input-wrapper">
                                            <input
                                                type="text"
                                                id="location"
                                                required
                                                defaultValue={user.location}
                                            />
                                            <label htmlFor="location">
                                                Location
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="form-field">
                                        <div className="input-wrapper">
                                            <input
                                                type="text"
                                                id="lastName"
                                                required
                                                defaultValue={user.lastName}
                                            />
                                            <label htmlFor="lastName">
                                                Last Name
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <div className="input-wrapper">
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                defaultValue={user.email}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <div className="input-wrapper">
                                            <input
                                                type="tel"
                                                id="phone"
                                                required
                                                defaultValue={user.phone}
                                            />
                                            <label htmlFor="phone">Phone</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-field full-width">
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="about"
                                        required
                                        defaultValue={user.about}
                                    />
                                    <label htmlFor="about">About</label>
                                </div>
                            </div>

                            <div className="buttons">
                                <button type="submit" className="button-login">
                                    SAVE
                                </button>
                                <button
                                    type="button"
                                    className="delete-account"
                                >
                                    DELETE ACCOUNT
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
