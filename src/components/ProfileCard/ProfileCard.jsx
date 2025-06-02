import { useState } from 'react';
import './ProfileCard.scss';

export default function ProfileCard({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        username: user.username || '',
        location: user.location || '',
        phone_number: user.phone_number || '',
        about_me: user.about_me || '',
        things_user_likes: user.things_user_likes?.map(k => k.keyword) || [],
    });
    const [newTag, setNewTag] = useState('');

    const toggleEdit = () => setIsEditing(prev => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        if (newTag && !formData.things_user_likes.includes(newTag)) {
            setFormData(prev => ({
                ...prev,
                things_user_likes: [...prev.things_user_likes, newTag]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tag) => {
        setFormData(prev => ({
            ...prev,
            things_user_likes: prev.things_user_likes.filter(t => t !== tag)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You will later integrate API PATCH call here
        setIsEditing(false);
    };

    return (
        <div className="profile-card">
            <div className="left-panel">
                <img src={user.avatar} alt="avatar" className="avatar" />
                <button className="btn">Update Image</button>
                <div className="upload-options">
                    <button className="option-btn">Upload</button>
                    <button className="option-btn">Remove</button>
                </div>
                <button className="delete-btn">Delete Account</button>
            </div>

            <div className="right-panel">
                {!isEditing ? (
                    <>
                        <div className="row">
                            <div><strong>First name:</strong> {user.first_name}</div>
                            <div><strong>Last name:</strong> {user.last_name}</div>
                        </div>
                        <div className="row">
                            <div><strong>Email:</strong> {user.email}</div>
                            <div><strong>Username:</strong> {user.username}</div>
                        </div>
                        <div className="row">
                            <div><strong>Location:</strong> {user.location}</div>
                            <div><strong>Phone:</strong> {user.phone_number}</div>
                        </div>
                        <div className="row">
                            <div className="full-width">
                                <strong>About:</strong>
                                <p>{user.about_me}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="full-width">
                                <strong>Things I like:</strong>
                                <div className="tags">
                                    {user.things_user_likes?.map((tag, i) => (
                                        <span key={i} className="tag">{tag.keyword}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="edit-btn" onClick={toggleEdit}>Edit Profile</button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First name"
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last name"
                            />
                        </div>
                        <div className="row">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                            />
                        </div>
                        <div className="row">
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Location"
                            />
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Phone"
                            />
                        </div>
                        <div className="row">
                            <textarea
                                name="about_me"
                                value={formData.about_me}
                                onChange={handleChange}
                                placeholder="About me"
                            />
                        </div>
                        <div className="row">
                            <div className="tags">
                                {formData.things_user_likes.map((tag, i) => (
                                    <span key={i} className="tag" onClick={() => handleRemoveTag(tag)}>
                                        {tag} ×
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="row tag-input">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Type something..."
                            />
                            <button type="button" onClick={handleAddTag}>Add</button>
                        </div>
                        <div className="row actions">
                            <button type="submit" className="save-btn">Save</button>
                            <button type="button" className="cancel-btn" onClick={toggleEdit}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
