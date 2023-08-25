import React, { useEffect, useState } from 'react'
import "../style/Settings.css"
import NavbarComponent from '../components/NavbarComponent';
import ClassProfile from '../components/SingleClass/ClassProfile';
import "../style/Settings.css"
import { useParams } from 'react-router-dom';
import { useClassContext } from '../context/ClassContext';
import { AiTwotoneDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { MdOutlineDoneOutline } from "react-icons/md"
import { AiFillLock } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"


const getClassApi = "/api/v1/getclass"
const SettingsPage = () => {
  const { classid } = useParams()
  const { getSingleClass, allTeachers, isClassLoading } = useClassContext()
  const [toggleState, setToggleState] = useState(0)



  useEffect(() => {
    console.log(classid)
    getSingleClass(`${getClassApi}/${classid}`)
  }, [])






  const selectToggleType = (e) => {
    const buttons = document.querySelectorAll(".toggle-btn");
    console.log(buttons);
    buttons.forEach((ele) => {
      console.log(ele);
      ele.classList.remove("active");
    })
    e.target.classList.add("active");
  }
  return (
    <>
      <div className='container-fluid'>
        <div className="settings-container-top">
          <h2>Class Settings </h2>
        </div>
        <div className='row'>

          <div className='col-md-2 col-12 toggle-section row mb-5'>
            <button className='toggle-btn active col-md-12 col-6' onClick={(e) => { selectToggleType(e); setToggleState(0) }}>Members</button>


            <button className='toggle-btn col-md-12 col-6' onClick={(e) => { selectToggleType(e); setToggleState(1) }}>Profile</button>


          </div>
          <div className='col-md-10 col-12 m-0 p-0 '>
            {toggleState == 0 ? <div className='member-component'> <MemberComponent /></div>
              : <ProfileComponent />
            }
          </div>
        </div>
      </div>

    </>
  )
}



//member component
const MemberComponent = () => {
  let { getSingleClass, singleClass, allTeachers, deleteSubTeacherPair } = useClassContext();
  const [toggleState, setToggleState] = useState(0)
  const url = `/api/v1/deleteteacherpair/${singleClass._id}`
  const selectToggleType = (e) => {
    const buttons = document.querySelectorAll(".toggle-butn");
    console.log(buttons);
    buttons.forEach((ele) => {
      console.log(ele);
      ele.classList.remove("btn-active");
    })
    e.target.classList.add("btn-active");
  }
  //for re rendering the component
  const [rendering, setrendering] = useState(false);
  const deleteTeacherpair = async (D_index, teacherid) => {

    await deleteSubTeacherPair(url, { teacherid }, D_index);
    console.log(allTeachers)


    setrendering(current => !current)
  }


  return (
    <>
      <div className="container-fluid m-0" >
        <div className='container'>
          <div className='toggle-btns'>
            <button className='toggle-butn btn-left btn-active' onClick={(e) => { setToggleState(0); selectToggleType(e) }}>Teachers</button>
            <button className='toggle-butn btn-right' onClick={(e) => { setToggleState(1); selectToggleType(e) }}>Students</button>
          </div>
          {
            toggleState == 0 ? <div className="teacher-list container">
              {
                allTeachers.map((ele, index) => {
                  {/* console.log(ele.teacherId) */ }
                  return (

                    <>      <div className={`teacher-settings row`}>
                      <div className="col-md-5 col-10">
                        {ele.teacherName}
                      </div>
                      <div className="col-md-5 col-10" >
                        {ele.subjectName}
                      </div>
                      <div className="col-2 col-md-2" >
                        {<h5> <AiTwotoneDelete style={{ color: "red", cursor: "pointer" }} onClick={(e) => deleteTeacherpair(index, ele.teacherId)} /></h5>}
                      </div>
                    </div>

                    </>


                  )
                })
              }
            </div>
              :
              <div>dd</div>
          }

        </div>
      </div>
    </>
  )
}


//profile component
const ProfileComponent = () => {

  const { singleClass } = useClassContext();
  console.log(singleClass)
  const [className, setClassName] = useState({ switch: false, data: singleClass.name })
  const [classCode, setClassCode] = useState({ switch: false, data: singleClass.classcode })
  const [classAdmin, setClassAdmin] = useState({ switch: false, data: singleClass.admin })
  const [classEndEmail, setClassEndEmail] = useState({ switch: false, data: singleClass.endemail })


  return (
    <>
      <div className="container-fluid ps-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 ">
              {/* name */}
              <div className='profile-component row mb-4' style={{ boxShadow: !className.switch ? "0 0 10px rgba(128, 128, 128, 0.295)" : "0 0 10px #8864f0" }}>
                <div className="col-3 profile-component-head" >Class Name</div>
                <div className="col-7 ">
                  <input type="text" className='profile-component-data' value={className.data} onChange={(e) => { if (className.switch) { setClassName({ ...className, data: e.target.value }) } }} />
                </div>
                <div className="col-2 profile-component-edit" style={{ cursor: "pointer" }}>
                  {!className.switch ?

                    <FiEdit onClick={(e) => setClassName({ ...className, switch: true })} style={{ color: "rgb(255, 183, 0)", fontSize: "1.3rem", }} />
                    : <MdOutlineDoneOutline onClick={(e) => setClassName({ ...className, switch: false })} style={{ color: "green", fontSize: "1.3rem" }} />
                  }
                </div>

              </div>
              {/* s-key */}
              <div className='profile-component row mb-4' style={{ boxShadow: "0 0 10px rgba(128, 128, 128, 0.295)" }}>
                <div className="col-3 profile-component-head" >Class Code</div>
                <div className="col-7 ">
                  <input type="text" className='profile-component-data' value={classCode.data} />
                </div>
                <div className="col-2 profile-component-edit"  >
                  <AiFillLock style={{ color: "green", fontSize: "1.3rem", }} />
                </div>
              </div>
              {/* admin */}
              <div className='profile-component row mb-4' style={{ boxShadow: "0 0 10px rgba(128, 128, 128, 0.295)" }}>
                <div className="col-3 profile-component-head" >Admin</div>
                <div className="col-7 ">
                  <input type="text" className='profile-component-data' value={classAdmin.data.name} />
                </div>
                <div className="col-2 profile-component-edit" >
                  <BsFillPersonFill style={{ color: "blue", fontSize: "1.3rem", }} />
                </div>
              </div>
              {/* end mail */}
              <div className='profile-component row mb-4' style={{ boxShadow: !classEndEmail.switch ? "0 0 10px rgba(128, 128, 128, 0.295)" : "0 0 10px #8864f0" }}>
                <div className="col-3 profile-component-head" >End Email</div>
                <div className="col-7 ">
                  <input type="text" className='profile-component-data' value={classEndEmail.data} onChange={(e) => { if (classEndEmail.switch) { setClassEndEmail({ ...classEndEmail, data: e.target.value }) } }} />
                </div>
                <div className="col-2 profile-component-edit" style={{ cursor: "pointer" }}>
                  {!classEndEmail.switch ?

                    <FiEdit onClick={(e) => setClassEndEmail({ ...classEndEmail, switch: true })} style={{ color: "rgb(255, 183, 0)", fontSize: "1.3rem", }} />
                    : <MdOutlineDoneOutline onClick={(e) => setClassEndEmail({ ...classEndEmail, switch: false })} style={{ color: "green", fontSize: "1.3rem" }} />
                  }
                </div>
              </div>

            </div>
            <div className='col-md-6 col-12'>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage;
