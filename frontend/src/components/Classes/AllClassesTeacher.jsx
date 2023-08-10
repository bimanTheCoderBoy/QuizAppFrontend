import { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { GrAdd } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useClassContext } from '../../context/ClassContext';
import { NavLink } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const getClassApi = "/api/v1/getallclasses";
const addClassApi = "/api/v1/createclass"
const joinInstituteApi = "/api/v1/joininstitute";


function AllClassesTeacher() {
    const [cls, setCls] = useState(0);
    const [className, setClassName] = useState("");
    const [InstituteCode, setInstituteCode] = useState("");
    const { isClassLoading, classErrorMsg, isClassError, ownClasses, otherClasses, getClasses, addClass, joinInsitute, getError, isSuccess, classSuccessMsg } = useClassContext();

    //DISPLAY ERROR
    function showErrorToast(msg) {
        return toast.error(`${msg}`);
    }


    //DIPLAY WHENEVER ERROR
    useEffect(() => {
        console.log("cehck use effect");
        console.log(isSuccess);
        if (isClassError) {
            toast.error(classErrorMsg);
            return;
        }
        if (isSuccess) {
            toast.success(classSuccessMsg);
            return;
        }
    }, [isClassError, isSuccess]);
    //We have to use effect bcz once the error is run the value gets updates but cannot pass throught the chilrens bcz the control is in the hands of the await ultill it returns we have to wait for the function to execute completely and then it updates the value and then it passes to the rest of the part of the function

    //What class to display own/other
    const selectClassType = (e) => {
        const buttons = document.querySelectorAll(".butn");
        buttons.forEach((ele) => {
            ele.classList.remove("btn-active");
        })
        e.target.classList.add("btn-active");
    }

    //JOIN ClASS/INSTITUTE DISPLAY
    const displayPop = () => {
        const pop = document.querySelector(".add-class");
        pop.classList.remove("hidden");
    }


    //JOIN ClASS/INSTITUTE HIDE
    const hidePop = () => {
        const pop = document.querySelector(".add-class");
        setClassName("");
        setInstituteCode("");
        pop.classList.add("hidden");
    }


    //useEffect management

    //Add New Class
    const addNewClass = async (e) => {
        e.preventDefault();
        if (className === "") {
            toast.error("Please Enter The Classname");
            return;
        }
        await addClass(addClassApi, { name: className });
        await getClasses(getClassApi);
        setClassName("");
        hidePop();
    }


    //Join institute
    const joinNewInstitute = async (e) => {
        if (InstituteCode === "") {
            toast.error('Please enter the code');
            return;
        }
        e.preventDefault();
        console.log(InstituteCode)
        await joinInsitute(joinInstituteApi, { InstituteCode });
        setInstituteCode("");
        hidePop();
    }

    useEffect(() => {
        getClasses(getClassApi);
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row all-classes-area'>
                <div className='col-md-12 col-12'>
                    <div className='class-area'>
                        <div className='class-btns'>
                            <button className='butn btn-left btn-active' onClick={(e) => { setCls(0); selectClassType(e); hidePop() }}>Own</button>
                            <button className='butn btn-right' onClick={(e) => { setCls(1); selectClassType(e); hidePop() }}>Other</button>
                            <div className='class-add-btn ms-auto' onClick={() => displayPop()}><GrAdd /></div>
                        </div>
                        <div className='all-classes'>
                            {
                                cls ?
                                    otherClasses?.map((ele, i) => {
                                        console.log(ele);
                                        return (
                                            <NavLink to={`/class/${ele._id}`} className='class' key={i}>
                                                <div className='class-name'> {ele.name}</div>
                                                {/* <div className='class-subject'>{ele.subject}</div> */}
                                            </NavLink>
                                        )
                                    }) :
                                    ownClasses?.map((ele, i) => {
                                        return (
                                            <NavLink to={`/class/${ele._id}`} className='class' key={i}>
                                                <div className='class-name'>{ele.name}</div>
                                                {/* <div className='class-subject'>{ele.subject}</div> */}
                                            </NavLink>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='add-class hidden'>
                <div className='add-box'>
                    <div className='cross' onClick={() => hidePop()}><RxCross1 /></div>
                    {
                        cls ?
                            <>
                                <h2>Join Insititute</h2>
                                <form action="" className='add-form'>
                                    <input type="text" placeholder='Institute code' value={InstituteCode} className='add-name' onChange={(e) => setInstituteCode(e.target.value)} />
                                    <input type="submit" value="Join" className='add-button' onClick={(e) => joinNewInstitute(e)} />
                                </form>
                            </> :
                            <>
                                <h2>Add Class</h2>
                                <form action="" className='add-form'>
                                    <input type="text" placeholder='Classname' value={className} className='add-name' onChange={(e) => setClassName(e.target.value)} />
                                    <input type="submit" value="Create Class" className='add-button' onClick={(e) => addNewClass(e)} />
                                </form>
                            </>
                    }
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default AllClassesTeacher