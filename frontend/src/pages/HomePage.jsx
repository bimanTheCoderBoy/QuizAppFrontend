import React, { useEffect } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Welcome from '../components/HomePage/Welcome';
// import { useProfileContext } from '../context/ProfileContext'
import "../style/HomePage.css";
import AllClassesTeacher from '../components/Classes/AllClassesTeacher';
import AllClassesStudent from '../components/Classes/AllClassesStudent';
import { useClassContext } from '../context/ClassContext';
import { useProfileContext } from '../context/ProfileContext';

const GetProfileAPI = "/api/v1/getteacherprofile";
const getHomePageDataApi = "/api/v1/getallclasses"

function HomePage() {
    const { isLoading, profile = {}, getProfile } = useProfileContext();
    const { role, getClasses } = useClassContext();
    useEffect(() => {
        getClasses(getHomePageDataApi);
        getProfile(GetProfileAPI);
    }, []);
    return (
        <>
            <NavbarComponent />
            <Welcome />
            {
                role === "teacher" ? <AllClassesTeacher /> : <AllClassesStudent />
            }
        </>
    )
}

export default HomePage