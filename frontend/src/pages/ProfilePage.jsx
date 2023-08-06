import React, { useEffect } from 'react'
import { useProfileContext } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import { useClassContext } from '../context/ClassContext';
import Loading from '../components/Loading';

const GetProfileAPI = "/api/v1/getteacherprofile";
const LogoutApi = "api/v1/logout";

function ProfilePage() {
    const { profile = {}, isLoading, getProfile, userLogout } = useProfileContext();
    const { ownClasses, otherClasses } = useClassContext();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile(GetProfileAPI);
    }, [])
    return (
        <>
            <NavbarComponent />
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        <div>{profile ? <div>{profile.email}</div> : <></>}</div>
                        {/* <div className='s-key'>{profile}</div> */}
                        {/* teachers under me  */}
                        <div>
                            {
                                profile?.otherteachers?.map((ele, i) => {
                                    return (
                                        <div key={i}>
                                            <div>{ele}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button onClick={() => { userLogout(LogoutApi); navigate("/") }}>LOGOUT</button>
                    </>
            }

        </>
    )
}

export default ProfilePage