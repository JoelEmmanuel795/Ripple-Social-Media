import './sass/main.scss';
import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import FilterAllPosts from './components/Posts/FilterAllPosts/FilterAllPosts';
import FilterFriendsPosts from './components/Posts/FilterFriendsPosts/FilterFriendsPosts';
import FilterFollowingPosts from './components/Posts/FIlterFollowedPosts/FilterFollowingPosts';
import FilterLikedPosts from './components/Posts/FilterLikedPosts/FilterLikedPosts';
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
                    <Route path="posts" element={<PostContainer />}>
                        <Route path="all" element={<FilterAllPosts />} />
                        <Route
                            path="friends"
                            element={<FilterFriendsPosts />}
                        />
                        <Route
                            path="following"
                            element={<FilterFollowingPosts />}
                        />
                        <Route path="liked" element={<FilterLikedPosts />} />
                    </Route>
                }
                <Route path="friends" element={<Friends />} />
            </Route>
        </Routes>
    );
}

export default App;
