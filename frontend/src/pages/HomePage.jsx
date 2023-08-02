import React, { useEffect } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Welcome from '../components/HomePage/Welcome';
import { useProfileContext } from '../context/ProfileContext'
import "../style/HomePage.css";
import AllClassesTeacher from '../components/Classes/AllClassesTeacher';
import AllClassesStudent from '../components/Classes/AllClassesStudent';

const getProfileApi = "api/v1/profile";

function HomePage() {
    const { getProfile, profile } = useProfileContext();
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <>
            <NavbarComponent />
            <Welcome />
            {
                profile.role === "teacher" ? <AllClassesTeacher /> : <AllClassesStudent />
            }
        </>
    )
}

export default HomePage