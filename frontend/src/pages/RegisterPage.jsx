import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillGoogleCircle, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from "../context/ProfileContext";
import toast, { Toaster } from 'react-hot-toast';
import "../style/LoginRegister.css";

const RegisterAPI = "api/v1/register";
const checkLoginApi = "api/v1/isauth"

function RegisterPage() {
    const navigate = useNavigate();
    const { isError, errorMsg, userRegistration, checkLogin } = useProfileContext();
    const [name, setName] = useState("");
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const Register = (e) => {
        e.preventDefault();
        if (name === "" || role === "" || email === "" || password === "" || Cpassword === "") {
            toast.error("Please Fill All The Credentials");
            return;
        }
        if (password === Cpassword) {
            userRegistration(RegisterAPI, {
                email,
                password,
                role,
                name
            });

        }
        else {
            toast.error("Confirm Password Does Not Match");
            setPassword("");
            setCPassword("");
        }
    }
    useEffect(() => {
        if (isError === 1) {
            toast.error(errorMsg);
            setEmail("");
            setName("");
            setPassword("");
            setCPassword("");
        }
        else if (isError === 2) {
            toast.success("Registration success");
            navigate("/");
            checkLogin(checkLoginApi);
        }
    }, [isError])
    return (
        <div className='login-page'>
            <div className='login-area'>
                <h2>Register</h2>
                <form action="">
                    <div className='login-username login-data'>
                        <label htmlFor="username">Username</label>
                        <div>
                            <AiOutlineUser />
                            <input type="text" placeholder='Type your name' name='username' value={name} onChange={(e) => setName(e.target.value)} />

                        </div>
                    </div>
                    <div className='login-useremail login-data'>
                        <label htmlFor="useremail">UserEmail</label>
                        <div>
                            <AiOutlineUser />
                            <input type="email" placeholder='Type your email' name='useremail' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div>Type</div>
                    <div className='login-type'>
                        <div>
                            <input type="radio" name="type" id="teacher" value="teacher" onClick={() => setRole("teacher")} />
                            <label htmlFor="teacher">Teacher</label>
                        </div>
                        <div>
                            <input type="radio" name="type" id="student" value="student" onClick={() => setRole("student")} />
                            <label htmlFor="student">Student</label>
                        </div>
                    </div>
                    <div className='login-password login-data'>
                        <label htmlFor="userpassword">Password</label>
                        <div>
                            <AiOutlineLock />
                            <input type="password" name="password" id="password" placeholder='Type your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='login-confirm-password login-data'>
                        <label htmlFor="userConfirmPassword">Confirm Password</label>
                        <div>
                            <AiOutlineLock />
                            <input type="password" name="Cpassword" id="Cpassword" placeholder='Type your confirm password' value={Cpassword} onChange={(e) => setCPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='submit register-submit'>
                        <input type="submit" value="REGISTER" onClick={(e) => Register(e)} />
                        <Toaster />
                    </div>
                </form>
            </div>
        </div>

        /* <form action="">
                <div className='login-username login-data'>
                    <label htmlFor="username">Username</label>
                    <div>
                        <AiOutlineUser />
                        <input type="text" placeholder='Type your name' name='username' />
                    </div>
                </div>
                <div className='login-useremail login-data'>
                    <label htmlFor="useremail">UserEmail</label>
                    <div>
                        <AiOutlineUser />
                        <input type="email" placeholder='Type your email' name='useremail' />
                    </div>
                </div>
                <div className='login-password login-data'>
                    <label htmlFor="userpassword">Password</label>
                    <div>
                        <AiOutlineLock />
                        <input type="password" name="password" id="password" placeholder='Type your password' />
                    </div>
                </div>
                <div className='login-confirm-password login-data'>
                    <label htmlFor="userConfirmPassword">Confirm Password</label>
                    <div>
                        <AiOutlineLock />
                        <input type="password" name="Cpassword" id="Cpassword" placeholder='Type your confirm password' />
                    </div>
                </div>
                <div className='submit register'>
                    <input type="submit" value="REGISTER" />
                </div>
            </form> */
        /* </div> */
    )
}

export default RegisterPage