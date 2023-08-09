import React, { useEffect, useState } from 'react'

import { RxCross1 } from "react-icons/rx";

import { GrAdd } from "react-icons/gr";

import toast, { Toaster } from 'react-hot-toast';
import { useClassContext } from '../../context/ClassContext';
import Loading from "../Loading";


// const subjectOptions = ["english", "maths", "bio"];
const subjectOptions = ["english"];
const addSubjectAPI = "/api/v1/createsubject";
const getSubjectsAPI = "/api/v1/getallsubjects";
const getTeachersAPI = "/api/v1/getallteachers";
const addTeacherAPI = "/api/v1/teacherjoinclass"
const flag = false;
function AddTeacherPop({ props }) {

    const { isClassLoading, singleClass, createSubject, getSubjects, getTeachers, allSubjects = [], allTeachers = [], addTeacherToClass } = useClassContext();
    // const { }
    const [subject, setSubject] = useState("");
    const [newSub, setNewSub] = useState("");
    const [teacherID, setTeacherID] = useState("");
    //Which pop up to display
    const [pop, setPop] = useState(0);
    useEffect(() => {
        loadEvery();
    }, []);

    const loadEvery = async () => {
        await getSubjects(`${getSubjectsAPI}/${singleClass._id}`);
        await getTeachers(getTeachersAPI);
    }

    const addNewSubject = (e) => {
        e.preventDefault();
        if (newSub === "") {
            toast.error("Please Enter The Subject Name");
            return;
        }
        let subName = newSub.toLowerCase();
        if (allSubjects.includes(subName)) {
            toast.error("Subject Already Exists");
            setNewSub("");
            return;
        }
        else {
            createSubject(`${addSubjectAPI}/${singleClass._id}`, { userid: teacherID, subjectname: newSub })
            toast.success("Subject Added Successful");
            getSubjects(`${getSubjectsAPI}/${singleClass._id}`);
            setNewSub("");
            setPop(0);
        }
    }

    //Add teacher
    const AddTeacher = (e) => {
        e.preventDefault();
        if (teacherID === "" || subject === "") {
            toast.error(`Please Fill All The Fields`);
            return;
        }
        console.log(teacherID, subject);
        addTeacherToClass(`${addTeacherAPI}/${singleClass._id}`, { userid: teacherID, subjectname: subject });
        props();
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
                        </> : isClassLoading ? <Loading /> :
                            <>
                                {/* add teacher pop  */}
                                <div className='add-box teacher-pop'>
                                    <div className='cross' onClick={(e) => props()}><RxCross1 /></div>
                                    <h2>Add Teacher</h2>
                                    <form action="" className='add-form'>
                                        <div className='select-subject'>
                                            <select type="text" placeholder='Subject' className='subject-select' defaultValue="CHOOSE SUBJECT" onChange={(e) => setSubject(e.target.value)}>
                                                <option value="CHOOSE SUBJECT" disabled hidden>Select Subject</option>
                                                {
                                                    allSubjects.map((ele, i) => {
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
                                            <select type="text" placeholder='Teachers' className='teacher-select' defaultValue="CHOOSE TEACHER" onChange={(e) => setTeacherID(e.target.value)}>
                                                <option value="CHOOSE TEACHER" disabled hidden>Choose Teacher</option>
                                                {
                                                    allTeachers?.map((ele, i) => {
                                                        return (
                                                            <option className='teacher-options' value={`${ele._id}`} key={i}>{ele.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
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



