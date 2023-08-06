import React, { useState } from 'react'
import { useClassContext } from '../../context/ClassContext'
import { AiOutlineUserAdd } from "react-icons/ai";

const Admin = true;

function Members() {
    const { singleClass } = useClassContext();

    //Number of students to display
    const [studentNo, setStudentNo] = useState(singleClass.students?.length >= 3 ? 3 : singleClass.students?.length);

    //Display in button student
    const [view, setView] = useState("View All");

    return (
        <div className='members mobile-hidden'>
            <h5>Members</h5>
            <div className='all-class-teachers'>
                <div className='label'>Teachers{Admin ? <div className='add-teacher-btn'><AiOutlineUserAdd /></div> : <></>}</div>
                <div className='teachers-list'>
                    {/* techers list  */}
                    {
                        singleClass.teachers?.map((ele, i) => {
                            return (
                                <div className='teacher' key={i}>
                                    {
                                        ele.profileImage ? <img src="" alt="" /> : <img src="https://cdn4.vectorstock.com/i/1000x1000/40/53/passport-photo-of-young-handsome-man-close-up-vector-21284053.jpg" alt="" />
                                    }
                                    <div>{ele.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='all-class-students'>
                <div className='label'>Students</div>
                <div className='students-list'>
                    {
                        singleClass.students?.map((ele, i) => {
                            if (i < studentNo) {
                                return (
                                    <div className='student' key={i}>
                                        {
                                            ele.profileImage ? <img src="" alt="" /> : <img src="https://cdn4.vectorstock.com/i/1000x1000/40/53/passport-photo-of-young-handsome-man-close-up-vector-21284053.jpg" alt="" />
                                        }
                                        <div>{ele.name}</div>
                                    </div>
                                )
                            }
                        })
                    }
                    <div className='view-all-btn' onClick={() => {
                        if (view === "View All") {
                            setView("View Less");
                            setStudentNo(singleClass.students?.length);
                        }
                        else {
                            setView("View All");
                            setStudentNo(singleClass.students?.length > 3 ? 3 : singleClass.students?.length);
                        }
                    }}>{view}</div>
                </div>
            </div>
        </div >
    )
}

export default Members