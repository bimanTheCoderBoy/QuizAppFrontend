import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import { useProfileContext } from "./context/ProfileContext";
import SingleClassTeacherPage from "./pages/SingleClassTeacherPage";
import { Toaster } from "react-hot-toast";
import NavbarComponent from "./components/NavbarComponent";
import ClassSettingsPage from "./pages/ClassSettingsPage";
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
      <Toaster />
      {
        isLogin ? <>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/class/:classid" element={<SingleClassTeacherPage />} />
            <Route path="/class/:classid/classSettings" element={<SettingsPage />} />
          </Routes>
        </>
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
