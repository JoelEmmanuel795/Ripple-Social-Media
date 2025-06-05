import { NavLink, useNavigate } from 'react-router';
import logo from '../assets/images/logo.png';
import posts_logo from '../assets/images/posts_logo.png';
import iconFriends from '../assets/svgs/icon-friends.svg';
import notificationBell from '../assets/svgs/notification_bell.svg';
import profilePic from '../assets/images/users/default.png';
import menu from '../assets/svgs/menu.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout_user } from '../store/slices/userSlice';
import NotificationModal from './NotificationModal/NotificationModal';
import './navber.scss';

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState(false);
    const [menuO, setMenu] = useState(false);
    const [badgeCount, setBadgeCount] = useState(0);

    const handleLogout = () => {
        dispatch(logout_user());
        navigate('/auth/login');
    };

    return (
        <div className="nav-bar">
            <NavLink to={'/'}>
                <text>
                    <img src={logo} alt="logo" /> Motion
                </text>
            </NavLink>
            <nav>
                <NavLink to={'/posts/all'}>
                    <img src={posts_logo} alt="postsLogo" /> Posts
                </NavLink>
                <NavLink to={'/friends'}>
                    <img src={iconFriends} alt="friendsLogo" /> Find Friends
                </NavLink>
            </nav>
            <div className="leftGroup">
                <button
                    className="func-buttons notification-wrapper"
                    onClick={() => setNotifications(!notifications)}
                >
                    <img src={notificationBell} alt="bell" />
                    {badgeCount > 0 && (
                        <span className="notification-badge">{badgeCount}</span>
                    )}
                </button>
                {notifications && (
                    <NotificationModal
                        onClose={() => setNotifications(false)}
                        setBadgeCount={setBadgeCount}
                    />
                )}

                <button
                    className="func-buttons"
                    onClick={() => setMenu(menuO ? false : true)}
                >
                    <img
                        className="navbar-avatar"
                        src={profilePic}
                        alt="profile_pic"
                    />
                </button>

                <button
                    className="func-buttons"
                    onClick={() => setMenu(menuO ? false : true)}
                >
                    <img src={menu} alt="mnue-icon" />
                </button>
                {menuO && (
                    <div className="dropdown-menu">
                        <NavLink to={'/profile'}>
                            <button className="dropdown-item">
                                <span>Profile</span>
                            </button>
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="dropdown-item"
                        >
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
