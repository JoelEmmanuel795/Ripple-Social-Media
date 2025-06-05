import { NavLink, useNavigate } from 'react-router';
import logo from '../assets/images/logo.png';
import posts_logo from '../assets/images/posts_logo.png';
import iconFriends from '../assets/svgs/icon-friends.svg';
import notificationBell from '../assets/svgs/notification_bell.svg';
import profilePic from '../assets/images/users/default.png';
import menu from '../assets/svgs/menu.svg';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout_user } from '../store/slices/userSlice';
import NotificationModal from './NotificationModal/NotificationModal';
import './navber.scss';
import useFetch from '../utils/useFetch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState(false);
    const [menuO, setMenu] = useState(false);
    const [badgeCount, setBadgeCount] = useState(0);
    const [userAvatar, setUserAvatar] = useState('');
    const access = useSelector((state) => state.user.accessToken);
    const userMeEndpoint = '/users/me/';
    const menuRef = useRef(null);

    const { sendRequest, resData } = useFetch();

    useEffect(() => {
        if (access) {
            sendRequest(userMeEndpoint);
        }
    }, [access]);

    useEffect(() => {
        if (resData && resData[userMeEndpoint]) {
            setUserAvatar(resData[userMeEndpoint].avatar);
            console.log(resData[userMeEndpoint]);
        }
    }, [resData]);

    const handleLogout = () => {
        dispatch(logout_user());
        navigate('/auth/login');
    };

    useEffect(() => {
        if (!menuO) return;
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuO]);

    return (
        <>
            <div className="outet-navebar">
                <NavLink to={'/'} className="motion-logo">
                    <text>
                        <img src={logo} alt="logo" /> Motion
                    </text>
                </NavLink>
                <div className="nav-bar">
                    <nav>
                        <NavLink
                            to={'/posts/all'}
                            className={({ isActive }) =>
                                isActive ? 'upper-active' : ''
                            }
                        >
                            <img src={posts_logo} alt="postsLogo" /> Posts
                        </NavLink>
                        <NavLink
                            to={'/friends'}
                            className={({ isActive }) =>
                                isActive ? 'upper-active' : ''
                            }
                        >
                            <img src={iconFriends} alt="friendsLogo" /> Find
                            Friends
                        </NavLink>
                    </nav>
                    <div className="leftGroup">
                        <button
                            className="func-buttons notification-wrapper"
                            onClick={() => setNotifications(!notifications)}
                        >
                            <img src={notificationBell} alt="bell" />
                            {badgeCount > 0 && (
                                <span className="notification-badge">
                                    {badgeCount}
                                </span>
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
                                src={userAvatar || profilePic}
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
                            <div className="dropdown-menu" ref={menuRef}>
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
            </div>
        </>
    );
}
