import React from 'react'
import { useProfileContext } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import { useClassContext } from '../context/ClassContext';


const LogoutApi = "api/v1/logout";

function ProfilePage() {
    const { profile, getProfile, userLogout } = useProfileContext();
    const { ownClasses, otherClasses } = useClassContext();
    const navigate = useNavigate();
    return (
        <>
            <NavbarComponent />

            <button onClick={() => { userLogout(LogoutApi); navigate("/") }}>LOGOUT</button>
        </>
    )
}

export default ProfilePage