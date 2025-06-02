import { NavLink } from 'react-router';
import logo from '../assets/images/logo.png';
import posts_logo from '../assets/images/posts_logo.png';
import iconFriends from '../assets/svgs/icon-friends.svg';
import notificationBell from '../assets/svgs/notification_bell.svg';
import profilePic from '../assets/images/users/jennifer.png'
import menu from '../assets/svgs/menu.svg'
import { useState } from 'react';


export default function NavBar () {
    const [notifications, setNotifications] = useState(false)
    const [profile, setProfile] = useState(false)
    const [menuO, setMenu] = useState(false)

    


    return <div className='nav-bar'>
        <h5><img src={logo} alt="logo" /> Motion</h5>
        <nav>
            <NavLink to={'/posts'}><img src={posts_logo} alt='postsLogo'/>  Posts</NavLink>
            <NavLink to={"/friends"}><img src={iconFriends} alt="friendsLogo"/> Find Friends</NavLink>
        </nav>
        <div className='leftGroup'>
            <button className='func-buttons' onClick={() => setNotifications(notifications? false: true)}>
                <img src={notificationBell} alt='bell'/>
                </button>
            {notifications && <div className='popUp'>notifications</div>}

            <button className='func-buttons' onClick={() => setProfile(profile? false: true)}>
                <img src={profilePic} alt="profile_pic" />
                </button>
            {profile && <div className='popUp'>Profile</div>}

            <button className='func-buttons' onClick={() => setMenu(menuO? false: true)}>
                <img src={menu} alt="mnue-icon" />
                </button> 
            {menuO && <div className='popUp'>Menu</div>}
        </div>
        
    </div>
}