import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import { useProfileContext } from "./context/ProfileContext";

const checkLoginApi = "api/v1/isauth"

const App = () => {
  const { isLogin, checkLogin } = useProfileContext();
  useEffect(() => {
    checkLogin(checkLoginApi);
  }, []);
  return (
    <BrowserRouter>
      <Routes>{
        isLogin ? <>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </> :
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<div>Aluuuu</div>} />
          </>
      }
      </Routes>
    </BrowserRouter>
  )
};
export default App;
