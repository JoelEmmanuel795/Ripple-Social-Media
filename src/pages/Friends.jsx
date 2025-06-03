import { useEffect } from 'react';
import FriendCard from '../components/FriendCard/FriendCard';
import useFetch from '../utils/useFetch';
import '../sass/pages/Friends.scss';

export default function Friends() {
    const { sendRequest, resData, isLoading, error } = useFetch();

    useEffect(() => {
        sendRequest('/users/?limit=12');
    }, []);

    return (
        <div className="friends-page">
            {isLoading && <p>Loading users...</p>}
            {error && <p className="error">Error loading users.</p>}

            <div className="friend-list">
                {resData?.results?.map((friend) => (
                    <FriendCard key={friend.id} friend={friend} />
                ))}
            </div>
        </div>
    );
}
