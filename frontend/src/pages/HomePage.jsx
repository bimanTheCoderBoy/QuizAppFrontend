import React, { useEffect } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Welcome from '../components/HomePage/Welcome';
// import { useProfileContext } from '../context/ProfileContext'
import "../style/HomePage.css";
import AllClassesTeacher from '../components/Classes/AllClassesTeacher';
import AllClassesStudent from '../components/Classes/AllClassesStudent';
import { useClassContext } from '../context/ClassContext';

const getProfileApi = "/api/v1/profile";
const getHomePageDataApi = "/api/v1/getallclasses"

function HomePage() {
    const { role, getClasses } = useClassContext();
    useEffect(() => {
        getClasses(getHomePageDataApi);
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