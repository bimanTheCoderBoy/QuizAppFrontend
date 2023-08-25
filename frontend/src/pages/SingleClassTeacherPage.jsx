import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Classname from '../components/SingleClass/Classname';
import NavbarComponent from '../components/NavbarComponent';
import { useClassContext } from '../context/ClassContext';
import "../style/SingleClassTeacher.css"
import Announcements from '../components/SingleClass/Announcements';
import Quizes from '../components/SingleClass/Quizes';
import Notes from '../components/SingleClass/Notes';
import Members from '../components/SingleClass/Members';
import Loading from '../components/Loading';
import { useProfileContext } from '../context/ProfileContext';

const getSingleClassAPI = "/api/v1/getclass"


function SingleClassTeacherPage() {
    const { classid } = useParams();
    const { getSingleClass, isClassLoading, isClassError, singleClass } = useClassContext();

    //Selecting type for toggle button
    const [type, setType] = useState(0);


    //Quiz, Announce, Notes Toggler Button
    const selectToggleType = (e) => {
        const buttons = document.querySelectorAll(".toggle-butn");
        buttons.forEach((ele) => {
            ele.classList.remove("btn-active");
        })
        e.target.classList.add("btn-active");
    }


    //Showing members in mobile version


    //Loading data of single Classe
    useEffect(() => {
        getSingleClass(`${getSingleClassAPI}/${classid}`);
    }, []);

    return (
        <>
            {
                isClassError ?
                    <>Error Occured</> :
                    <>
                        {
                            isClassLoading ? <Loading /> :
                                <>
                                    <Classname />
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-md-8 col-12 main-area class-data'>
                                                <div className='toggle-btns'>
                                                    <button className='toggle-butn btn-left btn-active' onClick={(e) => { setType(0); selectToggleType(e) }}>Annoucements</button>
                                                    <button className="toggle-butn btn-middle" onClick={(e) => { setType(1); selectToggleType(e) }}>Quizes</button>
                                                    <button className='toggle-butn btn-right' onClick={(e) => { setType(2); selectToggleType(e) }}>Notes</button>
                                                </div>
                                                <div className='classdata-area'>
                                                    {
                                                        type === 0 ? <Announcements /> : type === 1 ? <Quizes /> : <Notes />
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-12 mx-auto'>
                                                <Members />
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </>
            }
        </>
    )
}

export default SingleClassTeacherPage