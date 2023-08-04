import React from 'react'
import { AiFillSetting } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useClassContext } from '../../context/ClassContext';



function Classname() {
    const { singleClass } = useClassContext();
    return (
        <>
            <div className='container'>
                <div className='row my-5'>
                    <div className='col-md-12 col-12 classname-area'>
                        <div className='classname'>{singleClass.name}</div>
                        <div className='class-member-btn ms-auto me-3'><GrGroup /></div>
                        <AiFillSetting />
                    </div>
                </div>
            </div>

        </>
    )
}



export default Classname