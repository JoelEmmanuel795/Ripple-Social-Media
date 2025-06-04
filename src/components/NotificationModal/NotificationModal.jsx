import './NotificationModal.scss';
import { Check, X, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import useFetch from '../../utils/useFetch';
import { useSelector } from 'react-redux';

export default function NotificationModal({ onClose }) {
    const { sendRequest, resData, isLoading, error } = useFetch();
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const userId = useSelector((state) => state.user.user?.id);

    // Fetch requests on mount
    useEffect(() => {
        sendRequest('/social/friends/requests/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const data = resData['/social/friends/requests/']?.results;
        if (data && userId) {
            const received = data.filter(
                (req) => req.receiver?.id === userId && req.status === 'P'
            );
            const sent = data.filter(
                (req) => req.requester?.id === userId && req.status === 'P'
            );
            setReceivedRequests(received);
            setSentRequests(sent);
        }
    }, [resData, userId]);

    const handleUpdateStatus = (id, newStatus) => {
        const url = `/social/friends/requests/${id}/`;
        const payload = { status: newStatus };

        sendRequest(url, payload, 'patch')
            .then(() => {
                sendRequest('/social/friends/requests/'); // Refresh the list
            })
            .catch((err) => console.error('Status update failed:', err));
    };

    const handleAccept = (id) => handleUpdateStatus(id, 'A');
    const handleReject = (id) => handleUpdateStatus(id, 'R');

    return (
        <div className="notification-modal" onBlur={onClose} tabIndex="0">
            <div className="section">
                <h4>Received requests</h4>
                {isLoading && <p className="loading">Loading...</p>}
                {error && <p className="error">Error loading requests.</p>}
                {receivedRequests.map((req) => {
                    const user = req.requester;
                    return (
                        <div key={req.id} className="notification-row">
                            <img
                                className="avatar"
                                src={user.avatar}
                                alt={user.first_name?.charAt(0)}
                            />
                            <div className="info">
                                <p className="name">
                                    {user.first_name} {user.last_name}
                                </p>
                                <p className="location">
                                    {user.location || 'Unknown'}
                                </p>
                            </div>
                            <div className="actions">
                                <button onClick={() => handleAccept(req.id)}>
                                    <Check size={20} />
                                </button>
                                <button onClick={() => handleReject(req.id)}>
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="section">
                <h4>Sent requests</h4>
                {sentRequests.map((req) => {
                    const user = req.receiver;
                    return (
                        <div key={req.id} className="notification-row sent">
                            <img
                                className="avatar"
                                src={user.avatar}
                                alt={user.first_name?.charAt(0)}
                            />
                            <div className="info">
                                <p className="name">
                                    {user.first_name} {user.last_name}
                                </p>
                                <p className="location">
                                    {user.location || 'Unknown'}
                                </p>
                            </div>
                            <div className="actions">
                                <Clock size={20} opacity={0.6} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
