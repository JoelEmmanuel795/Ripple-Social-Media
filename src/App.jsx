import './sass/main.scss';
import './components/ProfileCard/ProfileCard';

import Sidebar from './components/AuthSidebar/Sidebar';
import Login from './pages/Login';
import ProfileCard from './components/ProfileCard/ProfileCard';

const mockUser = {
    first_name: 'Jennifer',
    last_name: 'Smith',
    email: 'jennifersmith@gmail.com',
    username: 'jennifer.smith',
    location: 'Zürich, Switzerland',
    phone_number: '123-456-7890',
    about_me: 'Lorem ipsum dolor sit amet...',
    avatar: 'https://i.pravatar.cc/150?img=12', // sample avatar
    things_user_likes: [
        { keyword: 'Cooking' },
        { keyword: 'Travel' },
        { keyword: 'Reading' },
        { keyword: 'Running' },
        { keyword: 'Swimming' },
    ],
};

function App() {
    return (
        <>
            {/* <Sidebar />
            <Login /> */}
            <div className="app">
                <ProfileCard user={mockUser} />
            </div>
        </>
    );
}

export default App;
