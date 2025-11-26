import { Routes, Route } from "react-router-dom";

import MainPage from "./MainPage/MainPage.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.jsx";
import Registration from "./RegistrationPage/RegistrationPage.jsx";
import ResetPage from "./ResetPages/ResetPages.jsx";
import ProfilePage from "./ProfilePage/ProfilePage.jsx";
import OtherProfilePage from "./OtherProfilePage/OtherProfilePage.jsx";
import InterestPage from "./InterestPage/InterestPage.jsx";
import MessagesPage from "./MessagesPage/MessagesPage.jsx";
import EditProfilePage from "./EditProfilePage/EditProfilePage.jsx";
import MyPostsPage from "./MyPostsPage/MyPostsPage.jsx";
import OtherPostsPage from "./OtherPostsPage/OtherPostsPage.jsx";
import PrivacyPage from "./PrivacyPage/PrivacyPage.jsx";
import CookiesPage from "./CookiesPage/CookiesPage.jsx";
import TermsPage from "./TermsPage/TermsPage.jsx";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/otherProfile" element={<OtherProfilePage />} />
            <Route path="/interest" element={<InterestPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/editProfile" element={<EditProfilePage />} />
            <Route path="/myPosts" element={<MyPostsPage />} />
            <Route path="/posts" element={<OtherPostsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Navigation;