import logoWhite from '../../assets/images/logo_white.png';
import appleSVG from '../../assets/svgs/apple.svg';
import googleSVG from '../../assets/svgs/google.svg';
import twitterIcon from '../../assets/svgs/twitter_icon.svg';
import instagramIcon from '../../assets/svgs/instagram_icon.svg';
import facebookIcon from '../../assets/svgs/facebook_icon.svg';

import './sidebar.scss';

const Sidebar = () => {
    return (
        <div className="container-left">
            <div className="left-top">
                <img src={logoWhite} alt="motion-logo" />
                <h1>Ripple</h1>
                <p>
                    Connect with friends and the world around you with Ripple.
                </p>
                <div className="button-container">
                    <a href="#" className="button-appstore">
                        <img src={appleSVG} alt="" />
                    </a>
                    <a href="#" className="button-appstore">
                        <img src={googleSVG} alt="" />
                    </a>
                </div>
            </div>
            <div className="left-bottom">
                <div className="icon-container">
                    <div>
                        <img src={twitterIcon} alt="" />
                    </div>
                    <div>
                        <img src={facebookIcon} alt="" />
                    </div>
                    <div>
                        <img src={instagramIcon} alt="" />
                    </div>
                </div>
                <p>© Ripple 2025. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Sidebar;
