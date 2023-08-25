import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import { useProfileContext } from "./context/ProfileContext";
import SingleClassTeacherPage from "./pages/SingleClassTeacherPage";
import Members from "./components/SingleClass/Members";
import SettingsPage from "./pages/SettingsPage";

const checkLoginApi = "/api/v1/isauth";

const App = () => {
  const { isLogin, checkLogin } = useProfileContext();
  // const[login,setLogin]=useState(isLogin)
  useEffect(() => {
    checkLogin(checkLoginApi);
  }, [isLogin]);

  return (
    <BrowserRouter>
      {
        isLogin ? <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/class/:classid" element={<SingleClassTeacherPage />} />
          <Route path="/classSettings/:classid" element={<SettingsPage />} />
        </Routes>
          :
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<div>Error</div>} />
          </Routes>
      }
    </BrowserRouter>
  )
};
export default App;
