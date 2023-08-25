import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useClassContext } from '../../context/ClassContext'
import Loading from '../Loading';
import { NavLink } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-hot-toast';

const joinClassAPI = "/api/v1/joinclass";
const getClassAPI = "/api/v1/getallclasses";

const AllClassesStudent = () => {
    const { isClassLoading, ownClasses, joinClass, getClasses } = useClassContext();
    const [className, setClassName] = useState("");

    //Display Pop
    const displayPop = () => {
        const pop = document.querySelector(".add-class");
        pop.classList.remove("hidden");
    }

    //Hide Pop
    const hidePop = () => {
        const pop = document.querySelector(".add-class");
        setClassName("");
        pop.classList.add("hidden");
    }

    //Add Student Class
    const joinNewClass = async (e) => {
        e.preventDefault();
        if (className === "") {
            toast.error("Please Enter The Class Code");
            return;
        }
        const error = await joinClass(joinClassAPI, { classCode: className });
        if (error) {
            toast.error(error);
            return;
        }
        toast.success("Class Joined");
        hidePop();
        await getClasses(getClassAPI);
        setClassName("");
    }

    return (
        <>
            <div className='all-classes-area'>
                <div className='label'>
                    <div>My Classes</div>
                    <div className='class-add-btn' onClick={() => displayPop()}> <GrAdd /></div>
                </div>
                <div className='all-classes my-3'>
                    {
                        isClassLoading ?
                            <Loading /> : <>
                                {
                                    ownClasses?.map((ele, i) => {
                                        return (
                                            <NavLink to={`/class/${ele._id}`} className='class' key={i}>
                                                <div className='class-name'> {ele.name}</div>
                                                {/* <div className='class-subject'>{ele.subject}</div> */}
                                            </NavLink>
                                        )
                                    })
                                }
                            </>

                    }
                </div>
            </div >

            {/* Pop  */}
            < div className='add-class hidden' >
                <div className='add-box'>
                    <div className='cross' onClick={() => hidePop()}><RxCross1 /></div>
                    <div>
                        <h2>Join Class</h2>
                        <form action="" className='add-form'>
                            <input type="text" placeholder='ClassCode' value={className} className='add-name' onChange={(e) => setClassName(e.target.value)} />
                            <input type="submit" value="Join Class" className='add-button' onClick={(e) => joinNewClass(e)} />
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AllClassesStudent