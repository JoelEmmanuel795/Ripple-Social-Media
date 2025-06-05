import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../assets/images/users/default.png';
import './ProfileEditCard.scss';

export default function ProfileEditCard({ user, onCancel }) {
    const token = useSelector((state) => state.user.accessToken);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        location: '',
        phone_number: '',
        about_me: '',
        avatar: defaultAvatar,
        things_user_likes: [],
    });

    const [newInterest, setNewInterest] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef();

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                username: user.username || '',
                location: user.location || '',
                phone_number: user.phone_number || '',
                about_me: user.about_me || '',
                avatar: user.avatar || defaultAvatar,
                things_user_likes: user.things_user_likes || [],
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTagAdd = () => {
        const newTag = newInterest.trim();
        if (newTag && !formData.things_user_likes.includes(newTag)) {
            setFormData((prev) => ({
                ...prev,
                things_user_likes: [...prev.things_user_likes, newTag],
            }));
            setNewInterest('');
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            things_user_likes: prev.things_user_likes.filter(
                (tag) => tag !== tagToRemove
            ),
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setFormData((prev) => ({
                ...prev,
                avatar: URL.createObjectURL(file),
            }));
        }
    };

    const handleImageRemove = () => {
        setSelectedImage(null);
        setFormData((prev) => ({
            ...prev,
            avatar: defaultAvatar,
        }));
    };

    const handleSave = async () => {
        const data = new FormData();
        data.append('email', formData.email);
        data.append('username', formData.username);
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        data.append('phone_number', formData.phone_number);
        data.append('location', formData.location);
        data.append('about_me', formData.about_me);

        if (selectedImage) {
            data.append('avatar', selectedImage);
        } else if (formData.avatar === defaultAvatar) {
            data.append('avatar', '');
        }

        const makeshiftSolutionData = formData;
        delete makeshiftSolutionData.avatar;

        // Can't figure out how to do tags (interests), API docs insufficient

        try {
            await axios.patch(
                'https://motion.propulsion-home.ch/backend/api/users/me/',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            await axios.patch(
                'https://motion.propulsion-home.ch/backend/api/users/me/',
                makeshiftSolutionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            //alert('Profile updated successfully!');
            onCancel?.();
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="profile-edit-card">
            <div className="left-panel">
                <img src={formData.avatar} alt="Avatar" className="avatar" />
                <button
                    className="update-image-button"
                    onClick={() => fileInputRef.current.click()}
                >
                    UPDATE IMAGE
                </button>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />

                <div className="upload-menu">
                    <button
                        className="upload-option"
                        onClick={() => fileInputRef.current.click()}
                    >
                        📤 Upload
                    </button>
                    <button
                        className="remove-option"
                        onClick={handleImageRemove}
                    >
                        🗑️ Remove
                    </button>
                </div>

                <button className="delete-button">DELETE ACCOUNT</button>
                <button className="save-button" onClick={handleSave}>
                    SAVE
                </button>
            </div>

            <div className="right-panel">
                <div className="form-grid">
                    {[
                        { label: 'First name', name: 'first_name' },
                        { label: 'Last name', name: 'last_name' },
                        { label: 'Email', name: 'email' },
                        { label: 'Username', name: 'username' },
                        { label: 'Location', name: 'location' },
                        { label: 'Phone', name: 'phone_number' },
                    ].map((field) => (
                        <div className="form-field" key={field.name}>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required={['email', 'username'].includes(
                                        field.name
                                    )}
                                />
                                <label>{field.label}</label>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="form-field full-width">
                    <div className="input-wrapper">
                        <textarea
                            name="about_me"
                            rows="3"
                            value={formData.about_me || ''}
                            onChange={handleChange}
                        />
                        <label>About</label>
                    </div>
                </div>

                <div className="form-field full-width">
                    <label>Things I like</label>
                </div>
                <div className="form-field full-width">
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
                </div>
                <div className="form-field full-width">
                    <div className="tag-input-row">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Type something..."
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                            />
                        </div>
                        <button onClick={handleTagAdd}>ADD</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
