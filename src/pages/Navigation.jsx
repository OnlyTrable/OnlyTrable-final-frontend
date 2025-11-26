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
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            <Route path="/main" element={
                <ProtectedRoute><MainPage /></ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
            } />
            <Route path="/otherProfile" element={
                <ProtectedRoute><OtherProfilePage /></ProtectedRoute>
            } />
            <Route path="/interest" element={
                <ProtectedRoute><InterestPage /></ProtectedRoute>
            } />
            <Route path="/messages" element={
                <ProtectedRoute><MessagesPage /></ProtectedRoute>
            } />
            <Route path="/editProfile" element={
                <ProtectedRoute><EditProfilePage /></ProtectedRoute>
            } />
            <Route path="/myPosts" element={
                <ProtectedRoute><MyPostsPage /></ProtectedRoute>
            } />
            <Route path="/posts" element={
                <ProtectedRoute><OtherPostsPage /></ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Navigation;