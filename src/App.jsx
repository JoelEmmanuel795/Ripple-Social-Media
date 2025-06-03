import './sass/main.scss';
import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import PostContainer from './components/Posts/PostContainer/PostContainer';
import Friends from './pages/Friends';

/* import FriendCard from './components/FriendCard/FriendCard';
import leticiaAvatar from './assets/images/users/leticia.png';

const mockFriend = {
    id: 1,
    full_name: 'Letícia Suárez',
    location: 'Rome, Italy',
    bio: 'Lorem ipsum dolor sit amet, vim ut quas volumus probatus...',
    interests: ['Cooking', 'Travel', 'Reading', 'Swimming'],
    avatar: leticiaAvatar,
}; */

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/posts/all" />} />
            <Route path="auth" element={<AuthLayout />}>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                {
                    <Route
                        path="posts/:filter"
                        element={<PostContainer />}
                    ></Route>
                }
                <Route path="friends" element={<Friends />} />
            </Route>
        </Routes>
    );
}

export default App;
