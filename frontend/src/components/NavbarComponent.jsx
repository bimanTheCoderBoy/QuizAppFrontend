import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { useProfileContext } from "../context/ProfileContext";
import { useEffect } from "react";

const login = false;

const NavbarComponent = () => {
    const { isLogin, profile = {} } = useProfileContext();
    return (
        <>
            <div className='container-fluid navbar-body'>
                <div className='row'>
                    <div className='col-md-12 col-12 px-3 py-2'>
                        <h1 className='navbar-title display-4'>Quiz</h1>
                        {
                            isLogin ? <NavLink to="/profile" className="profile-svg">{
                                profile.profileImage ? <><img src="" alt="" /></> : <><img src="https://cdn4.vectorstock.com/i/1000x1000/40/53/passport-photo-of-young-handsome-man-close-up-vector-21284053.jpg" className="navbar-profile-img" alt="" /></>
                            }</NavLink> : <NavLink to="/login">
                                <AwesomeButton type='secondary'>Login</AwesomeButton></NavLink>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavbarComponent;