import './sass/main.scss';
import './components/ProfileCard/ProfileCard';

import Sidebar from './components/AuthSidebar/Sidebar';
import Login from './pages/Login';
import ProfileCard from './components/ProfileCard/ProfileCard';

function App() {
    return (
        <>
            {/* <Sidebar />
            <Login /> */}
            <div className="app">
                <ProfileCard />
            </div>
        </>
    );
}

export default App;
