import './sass/main.scss';
import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import FilterAllPosts from './components/Posts/FilterAllPosts/FilterAllPosts';
import FilterFriendsPosts from './components/Posts/FilterFriendsPosts/FilterFriendsPosts';
import FilterFollowingPosts from './components/Posts/FIlterFollowedPosts/FilterFollowingPosts';
import FilterLikedPosts from './components/Posts/FilterLikedPosts/FilterLikedPosts';
import PostContainer from './components/Posts/PostContainer/PostContainer';

function App() {
    return (
        <Routes>
            <Route path="auth" element={<AuthLayout />}>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="posts" element={<PostContainer />}>
                    <Route path="all" element={<FilterAllPosts />} />
                    <Route path="friends" element={<FilterFriendsPosts />} />
                    <Route
                        path="following"
                        element={<FilterFollowingPosts />}
                    />
                    <Route path="liked" element={<FilterLikedPosts />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
