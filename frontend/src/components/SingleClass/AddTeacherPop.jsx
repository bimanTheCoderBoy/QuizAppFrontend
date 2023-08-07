import React, { useState } from 'react'

import { RxCross1 } from "react-icons/rx";

import { GrAdd } from "react-icons/gr";

import toast, { Toaster } from 'react-hot-toast';


// const subjectOptions = ["english", "maths", "bio"];
const subjectOptions = ["english"];

function AddTeacherPop({ props }) {
    // const { }
    const [subject, setSubject] = useState(subjectOptions[0]);
    const [newSub, setNewSub] = useState("");
    //Which pop up to display
    const [pop, setPop] = useState(0);


    const addNewSubject = (e) => {
        e.preventDefault();
        let subName = newSub.toLowerCase();
        if (subjectOptions.includes(subName)) {
            toast.error("Subject Already Exists");
            setNewSub("");
            return;
        }
        else {
            subjectOptions.push(subName);
            toast.success("Subject Added Successful");
            setNewSub("");
            setSubject(newSub);
            setPop(0);
        }
    }

    //Add teacher
    const AddTeacher = (e) => {
        e.preventDefault();
        console.log(subject);
    }



    return (
        <>
            <div className='add-teacher' >
                {
                    pop ?
                        <>
                            {/* add subject pop  */}
                            <div className='add-box subject-pop'>
                                <div className='cross' onClick={(e) => setPop(0)}><RxCross1 /></div>
                                <h2>Add Subject</h2>
                                <form action="" className='add-form'>
                                    <div className='add-subject'>
                                        <input type="text" placeholder='New Subject Name' value={newSub} className='add-new-subject-input' onChange={(e) => setNewSub(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Add Subject" className='add-button' onClick={(e) => { addNewSubject(e) }} />
                                </form>
                            </div>
                        </> :
                        <>
                            {/* add teacher pop  */}
                            <div className='add-box teacher-pop'>
                                <div className='cross' onClick={(e) => props()}><RxCross1 /></div>
                                <h2>Add Teacher</h2>
                                <form action="" className='add-form'>
                                    <div className='select-subject'>
                                        <select type="text" placeholder='Subject' className='subject-select' value={subject} onChange={(e) => setSubject(e.target.value)}>
                                            {
                                                subjectOptions.map((ele, i) => {
                                                    return (
                                                        <option className='subject-options' value={`${ele}`} key={i}>{ele}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div className='subject-add-btn' onClick={(e) => { setPop(1) }}>
                                            <GrAdd />
                                        </div>
                                    </div>
                                    <div className='select-teacher'>

                                    </div>
                                    <input type="submit" value="Join" className='add-button' onClick={(e) => { AddTeacher(e) }} />
                                </form>
                            </div>
                        </>
                }



            </div>
            <Toaster />
        </>
    )
}

export default AddTeacherPop



