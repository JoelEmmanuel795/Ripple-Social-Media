import { NavLink, useNavigate } from 'react-router';
import logo from '../assets/images/logo.png';
import posts_logo from '../assets/images/posts_logo.png';
import iconFriends from '../assets/svgs/icon-friends.svg';
import notificationBell from '../assets/svgs/notification_bell.svg';
import profilePic from '../assets/images/users/jennifer.png';
import menu from '../assets/svgs/menu.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout_user } from '../store/slices/userSlice';
import NotificationModal from './NotificationModal/NotificationModal';

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState(false);
    const [menuO, setMenu] = useState(false);

    const handleLogout = () => {
        dispatch(logout_user());
        navigate('/auth/login');
    };

    return (
        <div className="nav-bar">
            <h5>
                <img src={logo} alt="logo" /> Motion
            </h5>
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
                    className="func-buttons"
                    onClick={() =>
                        setNotifications(notifications ? false : true)
                    }
                >
                    <img src={notificationBell} alt="bell" />
                </button>
                {notifications && (
                    <NotificationModal
                        onClose={() => setNotifications(false)}
                    />
                )}

                <button
                    className="func-buttons"
                    onClick={() => setMenu(menuO ? false : true)}
                >
                    <img src={profilePic} alt="profile_pic" />
                </button>

                <button
                    className="func-buttons"
                    onClick={() => setMenu(menuO ? false : true)}
                >
                    <img src={menu} alt="mnue-icon" />
                </button>
                {menuO && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item">
                            <span>Profile</span>
                        </button>
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
