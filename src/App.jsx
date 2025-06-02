import './sass/main.scss';
import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import Posts from './pages/Posts';

function App() {
    return (
        <Routes>
            <Route path="auth" element={<AuthLayout />}>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="" element={<Posts />} />
            </Route>
        </Routes>
    );
}

export default App;
