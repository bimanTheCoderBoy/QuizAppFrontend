import React from 'react'

import { RxCross1 } from "react-icons/rx";


function AddTeacherPop({ makeZero }) {

    return (
        <>
            <div className='add-teacher' >
                <div className='add-box'>
                    <div className='cross' onClick={(e) => makeZero()}><RxCross1 /></div>
                    <h2>Add Teacher</h2>
                    <form action="" className='add-form'>
                        <input type="text" placeholder='Subject' className='add-subject' />
                        <input type="submit" value="Join" className='add-button' />
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTeacherPop


