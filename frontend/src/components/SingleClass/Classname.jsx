import React, { useState } from 'react'
import { AiFillSetting } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useClassContext } from '../../context/ClassContext';
import { NavLink } from 'react-router-dom';



function Classname() {
    const { singleClass } = useClassContext();
    const [shwMem, setShwMem] = useState(0);


    //Member show in mobile
    const showMembers = (e) => {
        e.preventDefault();
        const members = document.querySelector(".members");
        const dataDisplay = document.querySelector(".class-data");
        if (members.classList.contains("mobile-hidden")) {
            members.classList.remove("mobile-hidden");
            dataDisplay.classList.add("mobile-hidden");
            setShwMem(1);
            console.log("display members");
        }
        else {
            members.classList.add("mobile-hidden");
            dataDisplay.classList.remove("mobile-hidden");
            setShwMem(0);
            console.log("hide members");
        }

    }
    return (
        <>
            <div className='container'>
                <div className='row my-5'>
                    <div className='col-md-12 col-12 classname-area'>
                        <div className='classname'>{singleClass.name}</div>
                        <div className='class-member-btn ms-auto me-3' onClick={(e) => { showMembers(e) }}>{shwMem ? <RxCross1 /> : <GrGroup />}</div>
                        <NavLink to="/classSettings" className="class-settings-open-btn">
                            <AiFillSetting />
                        </NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}



export default Classname