import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillGoogleCircle, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import "../style/LoginRegister.css";

function LoginPage() {
    return (
        <div className='login-page'>
            <div className='login-area'>
                <h2>Login</h2>
                <form action="">
                    <div className='login-username login-data'>
                        <label htmlFor="useremail">Username</label>
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
                        <NavLink to="/forgetpass"><p>Forget password?</p></NavLink>
                    </div>
                    <div className='submit'>
                        <input type="submit" value="LOGIN" />
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