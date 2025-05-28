function App() {
    return (
        <body>
            <div class="container-left">
                <div class="left-top">
                    <img
                        src="./assets/images/logo_white.png"
                        alt="motion-logo"
                    />
                    <h1>Motion</h1>
                    <p>
                        Connect with friends and the world around you with
                        Motion.
                    </p>
                    <div class="button-container">
                        <a href="#" class="button-appstore">
                            <img src="./assets/svgs/apple.svg" alt="" />
                        </a>
                        <a href="#" class="button-appstore">
                            <img src="./assets/svgs/google.svg" alt="" />
                        </a>
                    </div>
                </div>
                <div class="left-bottom">
                    <div class="icon-container">
                        <div>
                            <img src="./assets/svgs/twitter_icon.svg" alt="" />
                        </div>
                        <div>
                            <img src="./assets/svgs/facebook_icon.svg" alt="" />
                        </div>
                        <div>
                            <img
                                src="./assets/svgs/instagram_icon.svg"
                                alt=""
                            />
                        </div>
                    </div>
                    <p>© Motion 2025. All rights reserved.</p>
                </div>
            </div>
            <div class="container-right">
                <div class="header">
                    Don't have an account?
                    <a class="button signup">Sign up</a>
                </div>
                <div class="form-container">
                    <div class="content-inner">
                        <h2>Sign In</h2>
                        <form action="#" method="post">
                            <div class="form-field">
                                <img
                                    src="./assets/svgs/avatar.svg"
                                    alt="Avatar Icon"
                                />
                                <input type="text" placeholder="Username" />
                            </div>
                            <div class="form-field">
                                <img
                                    src="./assets/svgs/password.svg"
                                    alt="password icon"
                                />
                                <input type="password" placeholder="Password" />
                            </div>
                            <input
                                type="submit"
                                value="Sign In"
                                class="button-login"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default App;
