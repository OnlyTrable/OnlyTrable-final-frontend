import { Routes, Route } from "react-router-dom";

import MainPage from "./MainPage/MainPage.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.jsx";
import NotFoundPage404 from "./NotFoundPage404/NotFoundPage404.jsx";
import Registration from "./RegistrationPage/RegistrationPage.jsx";
import ResetPage from "./ResetPages/ResetPages.jsx";
import InterestPage from "./InterestPage/InterestPage.jsx";
import PrivacyPage from "./PrivacyPage/PrivacyPage.jsx";
import CookiesPage from "./CookiesPage/CookiesPage.jsx";
import TermsPage from "./TermsPage/TermsPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const Navigation = () => {
  return (
    <Routes>
      {/* Публічні маршрути */}
      <Route path="/">
        <Route index element={<LoginPage />} />
        <Route path="registration" element={<Registration />} />
        <Route path="reset" element={<ResetPage />} />
        <Route path="cookies" element={<CookiesPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage404 />} />
      </Route>

      {/* Захищені маршрути */}
      <Route element={<ProtectedRoute />}>
        {/* Тепер ВСЯ логіка (Стрічка, Пошук, Профіль, Повідомлення) 
          живе всередині одного маршруту /main 
        */}
        <Route path="/main" element={<MainPage />} />

        {/* Ці сторінки можна залишити, якщо вони ще не перенесені в SPA-панелі MainPage */}
        <Route path="/interest" element={<InterestPage />} />

        {/* ВАЖЛИВО: Маршрути /profile, /editProfile, /messages БІЛЬШЕ НЕ ПОТРІБНІ,
           оскільки вони стали компонентами-панелями всередині MainPage.jsx
        */}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default Navigation;
