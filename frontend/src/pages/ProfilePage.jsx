import React from 'react'
import { useProfileContext } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';


const LogoutApi = "api/v1/logout";

function ProfilePage() {
    const { userLogout } = useProfileContext();
    const navigate = useNavigate();
    return (
        <>

            <div>ProfilePage</div>
            <button onClick={() => { userLogout(LogoutApi); navigate("/") }}>LOGOUT</button>
        </>
    )
}

export default ProfilePage