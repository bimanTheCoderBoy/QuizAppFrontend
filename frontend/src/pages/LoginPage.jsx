import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillGoogleCircle, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from "../context/ProfileContext";
import toast from 'react-hot-toast';
import "../style/LoginRegister.css";

const LoginAPI = "api/v1/login";
const checkLoginApi = "api/v1/isauth"

function LoginPage() {
    const navigate = useNavigate();
    const { errorMsg, userLogin, checkLogin } = useProfileContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Login = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            toast.error("Please Fill All The Credentials");
            return;
        }
        const check = await userLogin(LoginAPI, {
            email,
            password
        });
        if (check) {
            toast.error(check);
            setEmail("");
            setPassword("");
            return;
        }
        toast.success("Login success");
        checkLogin(checkLoginApi);
        navigate("/");
    }

    return (
        <div className='login-page'>
            <div className='login-area'>
                <h2>Login</h2>
                <form action="">
                    <div className='login-useremail login-data'>
                        <label htmlFor="useremail">UserEmail</label>
                        <div>
                            <AiOutlineUser />
                            <input type="email" placeholder='Type your email' name='useremail' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='login-password login-data'>
                        <label htmlFor="userpassword">Password</label>
                        <div>
                            <AiOutlineLock />
                            <input type="password" name="password" id="password" placeholder='Type your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <NavLink to="/forgetpass"><p>Forget password?</p></NavLink>
                    </div>
                    <div className='submit'>
                        <input type="submit" value="LOGIN" onClick={(e) => Login(e)} />
                    </div>
                    <div className='other-options'>
                        <p>Or Sign Up Using</p>
                        <AiFillGoogleCircle />
                    </div>
                    <div className='go-register'>
                        Have not account yet?
                        <NavLink to="/register">SIGN UP</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage