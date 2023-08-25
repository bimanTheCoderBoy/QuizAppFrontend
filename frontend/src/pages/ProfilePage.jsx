import React, { useEffect } from 'react'
import { useProfileContext } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import { useClassContext } from '../context/ClassContext';
import Loading from '../components/Loading';
import { toast } from 'react-hot-toast';

const LogoutApi = "api/v1/logout";
const checkLoginApi = "api/v1/isauth";

function ProfilePage() {
    const { profile = {}, isLoading, userLogout, checkLogin } = useProfileContext();
    const { ownClasses, otherClasses } = useClassContext();
    const navigate = useNavigate();

    const logout = async () => {
        userLogout(LogoutApi);
        navigate("/");
        checkLogin(checkLoginApi);
        toast.success("Logout Success");
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        <div>{
                            profile ? <>
                                <div>{profile.email}</div>
                                <div>{profile.skey}</div>
                            </>
                                : <></>
                        }</div>
                        {/* <div className='s-key'>{profile}</div> */}
                        {/* teachers under me  */}
                        <h3>TEACHERS UNDER ME</h3>
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
                        <button onClick={() => { logout() }}>LOGOUT</button>
                    </>
            }

        </>
    )
}

export default ProfilePage