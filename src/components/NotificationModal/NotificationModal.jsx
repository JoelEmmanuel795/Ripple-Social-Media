import leticiaAvatar from '../../assets/images/users/leticia.png';
import './NotificationModal.scss';
import { Check, X, Clock } from 'lucide-react';

export default function NotificationModal({ onClose }) {
    const receivedRequests = [
        {
            id: 1,
            name: 'Leticia Suárez',
            location: 'Rome, Italy',
            avatar: leticiaAvatar,
        },
        {
            id: 2,
            name: 'Thomas Castro',
            location: 'Barcelona, Spain',
            avatar: '../../assets/images/users/thomas.png',
        },
    ];

    const sentRequests = [
        {
            id: 3,
            name: 'Max Martinez',
            location: 'Leon, France',
            avatar: '',
        },
        {
            id: 4,
            name: 'Frank Baker',
            location: 'Los Angeles, USA',
            avatar: '/assets/images/users/frank.png',
        },
    ];

    const handleAccept = (id) => {
        console.log('Accepted:', id);
    };

    const handleReject = (id) => {
        console.log('Rejected:', id);
    };

    return (
        <div className="notification-modal" onBlur={onClose} tabIndex="0">
            <div className="section">
                <h4>Received requests</h4>
                {receivedRequests.map((user) => (
                    <div key={user.id} className="notification-row">
                        <img
                            className="avatar"
                            src={user.avatar}
                            alt={user.name}
                        />
                        <div className="info">
                            <p className="name">{user.name}</p>
                            <p className="location">{user.location}</p>
                        </div>
                        <div className="actions">
                            <button onClick={() => handleAccept(user.id)}>
                                <Check size={20} />
                            </button>
                            <button onClick={() => handleReject(user.id)}>
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="section">
                <h4>Sent requests</h4>
                {sentRequests.map((user) => (
                    <div key={user.id} className="notification-row sent">
                        <img
                            className="avatar"
                            src={
                                user.avatar ||
                                '/assets/images/default-avatar.png'
                            }
                            alt={user.name}
                        />
                        <div className="info">
                            <p className="name">{user.name}</p>
                            <p className="location">{user.location}</p>
                        </div>
                        <div className="actions">
                            <Clock size={20} opacity={0.6} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
