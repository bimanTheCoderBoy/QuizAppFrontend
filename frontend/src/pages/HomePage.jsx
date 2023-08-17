import React, { useEffect } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Welcome from '../components/HomePage/Welcome';
// import { useProfileContext } from '../context/ProfileContext'
import "../style/HomePage.css";
import AllClassesTeacher from '../components/Classes/AllClassesTeacher';
import AllClassesStudent from '../components/Classes/AllClassesStudent';
import { useClassContext } from '../context/ClassContext';
import { useProfileContext } from '../context/ProfileContext';
import Loading from '../components/Loading';
import { Toaster } from 'react-hot-toast';

const GetProfileAPI = "/api/v1/getteacherprofile";
const getHomePageDataApi = "/api/v1/getallclasses";
const GetMyTeachersAPI = "api/v1/getallteachers";

function HomePage() {
    const { isLoading, profile = {}, getProfile, getMyTeachers } = useProfileContext();
    const { isClassLoading, role, getClasses } = useClassContext();
    useEffect(() => {
        getClasses(getHomePageDataApi);
        getProfile(GetProfileAPI);
        getMyTeachers(GetMyTeachersAPI);
    }, []);
    return (
        <>
            <NavbarComponent />
            <Toaster />
            <Welcome />
            {
                isClassLoading ? <Loading /> :
                    role === "teacher" ? <AllClassesTeacher /> : role === "student" ? < AllClassesStudent /> : <></>
            }
        </>
    )
}

export default HomePage