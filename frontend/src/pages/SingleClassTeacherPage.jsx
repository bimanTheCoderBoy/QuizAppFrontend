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



function SingleClassTeacherPage() {
    const { classid } = useParams();
    const { getSingleClass, singleClass, isClassLoading, classErrorMsg } = useClassContext();
    const [type, setType] = useState(2);
    useEffect(() => {
        getSingleClass();
    }, []);
    console.log(singleClass);
    return (
        <>
            <NavbarComponent />
            <Classname />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 col-12 main-area'>
                        <div className='toggle-btns'>

                            <button onClick={() => setType(0)}>Annoucements</button>
                            <button onClick={() => setType(1)}>Quizes</button>
                            <button onClick={() => setType(2)}>Notes</button>
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
    )
}

export default SingleClassTeacherPage