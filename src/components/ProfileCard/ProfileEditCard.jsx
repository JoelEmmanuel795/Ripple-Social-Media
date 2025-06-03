import { useState } from 'react';
import './ProfileEditCard.scss';

export default function ProfileEditCard({ user }) {
    const [formData, setFormData] = useState({ ...user });
    const [newInterest, setNewInterest] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTagAdd = () => {
        if (newInterest.trim()) {
            setFormData({
                ...formData,
                things_user_likes: [
                    ...formData.things_user_likes,
                    newInterest.trim(),
                ],
            });
            setNewInterest('');
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setFormData({
            ...formData,
            things_user_likes: formData.things_user_likes.filter(
                (tag) => tag !== tagToRemove
            ),
        });
    };

    return (
        <div className="profile-edit-card">
            <div className="left-panel">
                <img src={formData.avatar} alt="Avatar" className="avatar" />
                <button className="update-image-button">UPDATE IMAGE</button>

                <div className="upload-menu">
                    <button className="upload-option">📤 Upload</button>
                    <button className="remove-option">🗑️ Remove</button>
                </div>

                <button className="delete-button">DELETE ACCOUNT</button>
                <button className="save-button">SAVE</button>
            </div>

            <div className="right-panel">
                <div className="form-grid">
                    {[
                        { label: 'First name', name: 'firstName' },
                        { label: 'Last name', name: 'lastName' },
                        { label: 'Email', name: 'email' },
                        { label: 'Username', name: 'username' },
                        { label: 'Location', name: 'location' },
                        { label: 'Phone', name: 'phone' },
                    ].map((field) => (
                        <div className="form-field" key={field.name}>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                />
                                <label>{field.label}</label>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="form-field full-width">
                    <div className="input-wrapper">
                        <textarea
                            name="about"
                            rows="3"
                            value={formData.about}
                            onChange={handleChange}
                            required
                        />
                        <label>About</label>
                    </div>
                </div>

                <div className="form-field full-width">
                    <label>Things I like</label>
                    <div className="tags">
                        {formData.things_user_likes.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                                <button
                                    className="remove-tag"
                                    onClick={() => handleTagRemove(tag)}
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="tag-input-row">
                        <input
                            type="text"
                            placeholder="Type something..."
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                        />
                        <button onClick={handleTagAdd}>ADD</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
