import './sass/main.scss';
import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import PostContainer from './components/Posts/PostContainer/PostContainer';
import Friends from './pages/Friends';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/posts/all" />} />
            <Route path="auth" element={<AuthLayout />}>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="posts/:filter" element={<PostContainer />} />
                <Route path="friends" element={<Friends />} />
            </Route>
        </Routes>
    );
}

export default App;
