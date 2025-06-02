// import './sass/main.scss';
import PostContainer from './components/Posts/PostContainer/PostContainer';
// import Sidebar from './components/AuthSidebar/Sidebar';
// import Login from './pages/Login';
import { Routes, Route } from 'react-router';
import FilterAllPosts from './components/Posts/FilterAllPosts/FilterAllPosts';
import FilterFriendsPosts from './components/Posts/FilterFriendsPosts/FilterFriendsPosts';
import FilterFollowingPosts from './components/Posts/FIlterFollowedPosts/FilterFollowingPosts';
import FilterLikedPosts from './components/Posts/FilterLikedPosts/FilterLikedPosts';

function App() {
    return (
        <>
            {/* <Sidebar />
            <Login /> */}
            <Routes>
                <Route path="posts" element={<PostContainer />}>
                    <Route path="all" element={<FilterAllPosts />} />
                    <Route path="friends" element={<FilterFriendsPosts />} />
                    <Route
                        path="following"
                        element={<FilterFollowingPosts />}
                    />
                    <Route path="liked" element={<FilterLikedPosts />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
