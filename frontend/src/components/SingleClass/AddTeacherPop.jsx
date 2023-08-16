import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import { useClassContext } from '../../context/ClassContext';
import Loading from "../Loading";
import { useProfileContext } from '../../context/ProfileContext';


const addSubjectAPI = "/api/v1/createsubject";      //Add Subject To Class
const getSubjectsAPI = "/api/v1/getallsubjects";    //Get Class Subjects
const getMyTeachersAPI = "/api/v1/getallteachers";  //Get Teachers Under Me
const addTeacherAPI = "/api/v1/teacherjoinclass";   //Add Teacher To Class
const getClassTeachersAPI = "/api/v1/getallclassteachers"    //Get Class Teachers

function AddTeacherPop({ props }) {

    const { isSubjectLoading, singleClass, createSubject, getClassSubjects, allSubjects = [], allTeachers = [], addTeacherToClass, getAllClassTeachers } = useClassContext();

    const { myTeachers, getMyTeachers } = useProfileContext();
    // const { }
    const [subject, setSubject] = useState("");
    const [newSub, setNewSub] = useState("");
    const [teacherID, setTeacherID] = useState("");

    //Which pop up to display
    const [pop, setPop] = useState(0);

    useEffect(() => {
        loadEvery();
    }, []);

    //TO HANDLE SUCCESS AND ERRORS
    // useEffect(() => {
    //     if (isClassError) {
    //         toast.error(classErrorMsg);
    //         return;
    //     }
    //     if (isSuccess) {
    //         return;
    //     }
    // }, [isSuccess, isClassError]);

    //SUBJECTS IN THE CLASS AND TEACHERS UNDER ME
    const loadEvery = async () => {
        await getClassSubjects(`${getSubjectsAPI}/${singleClass._id}`);
        await getMyTeachers(getMyTeachersAPI);
    }

    //ADD NEW SUBJECT
    const addNewSubject = async (e) => {
        e.preventDefault();
        //Check if the subject field is not empty
        if (newSub === "") {
            toast.error("Please Enter The Subject Name");
            return;
        }

        //Check if the subject is already present
        let subName = newSub.toLowerCase();
        if (allSubjects.includes(subName)) {
            toast.error("Subject Already Exists");
            setNewSub("");
            return;
        }

        //Add the subject and get the subjects
        const error = await createSubject(`${addSubjectAPI}/${singleClass._id}`, { userid: teacherID, subjectname: newSub });
        if (error) {
            toast.error(error);
            setNewSub("");
            return;
        }
        toast.success("New Subject Added");
        await getClassSubjects(`${getSubjectsAPI}/${singleClass._id}`);
        setNewSub("");
        setPop(0);
    }

    //ADD NEW TEACHER SUBJECT PAIR TO CLASS
    const AddTeacherSub = async (e) => {
        e.preventDefault();

        //Check if all the fields are not empty
        if (teacherID === "" || subject === "") {
            toast.error(`Please Fill All The Fields`);
            return;
        }

        let exists = false;

        allTeachers?.map((ele, i) => {
            if (ele.teacherId === teacherID) {
                if (ele.subjectName === subject) {
                    exists = true;
                }
            }
        })

        //Check if the subject teacher pair is already present
        if (exists) {
            toast.error("Teacher Is Already Assigned To The Subject");
            return;
        }

        const error = await addTeacherToClass(`${addTeacherAPI}/${singleClass._id}`, { userid: teacherID, subjectname: subject });
        if (error) {
            toast.error(error);
            return;
        }
        toast.success("Teacher Added");
        await getAllClassTeachers(`${getClassTeachersAPI}/${singleClass._id}`);
        // props();
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
                                {
                                    isSubjectLoading ? <Loading /> :
                                        <>
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
                                                            myTeachers?.map((ele, i) => {
                                                                return (
                                                                    <option className='teacher-options' value={`${ele._id}`} key={i}>{ele.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <input type="submit" value="Join" className='add-button' onClick={(e) => { AddTeacherSub(e) }} />
                                            </form>
                                        </>
                                }
                            </div>
                        </>
                }
            </div>
            <Toaster />
        </>
    )
}

export default AddTeacherPop



