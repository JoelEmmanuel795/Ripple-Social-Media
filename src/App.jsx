import FriendCard from './components/FriendCard/FriendCard';
import leticiaAvatar from './assets/images/users/leticia.png';

const mockFriend = {
    id: 1,
    full_name: 'Letícia Suárez',
    location: 'Rome, Italy',
    bio: 'Lorem ipsum dolor sit amet, vim ut quas volumus probatus...',
    interests: ['Cooking', 'Travel', 'Reading', 'Swimming'],
    avatar: leticiaAvatar,
};

function App() {
    return (
        <div className="app">
            <FriendCard friend={mockFriend} />
        </div>
    );
}

export default App;
