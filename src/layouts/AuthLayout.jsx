import { Outlet } from 'react-router';
import Sidebar from '../components/AuthSidebar/Sidebar';

const AuthLayout = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    );
};
export default AuthLayout;
