import './sass/main.scss';
import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import PostContainer from './components/Posts/PostContainer/PostContainer';
import Friends from './pages/Friends';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';

import Profile from './pages/Profile';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/posts/all" />} />
            <Route path="auth" element={<AuthLayout />}>
                <Route path="signup" element={<Signup />} />
                <Route path='verification' element={<Verification/>}/>
                <Route path="login" element={<Login />} />
                <Route path='password-reset' element={<ForgotPassword/>}/>
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="posts/:filter" element={<PostContainer />} />
                <Route path="friends" element={<Friends />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default App;
