import './sass/main.scss';

import Sidebar from './components/AuthSidebar/Sidebar';
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {
    return (
        <>
            <Sidebar />
            <SignUp />
        </>
    );
}

export default App;
