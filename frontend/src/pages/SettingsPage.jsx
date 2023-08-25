import React, { useEffect, useState } from 'react'
import "../style/Settings.css"
import NavbarComponent from '../components/NavbarComponent';
import ClassProfile from '../components/SingleClass/ClassProfile';
import "../style/Settings.css"
import { useParams } from 'react-router-dom';
import { useClassContext} from '../context/ClassContext';
import {AiTwotoneDelete} from "react-icons/ai"
import {FiEdit} from "react-icons/fi"
import {MdOutlineDoneOutline}from "react-icons/md"

const getClassApi="/api/v1/getclass"
const SettingsPage = () => {
  const {classid}=useParams()
  const{ getSingleClass,allTeachers,isClassLoading}=useClassContext()
 const  [toggleState,setToggleState]=useState(0)



  useEffect(()=>{
    console.log(classid)
    getSingleClass(`${getClassApi}/${classid}`)
  },[])






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
      <NavbarComponent />
      <div className='container-fluid'>
      <div className="settings-container-top">
      <h2>Class Settings </h2>
      </div>
      <div className='row'>
       
        <div className='col-md-2 col-12 toggle-section row mb-5'>
          <button className='toggle-btn active col-md-12 col-6' onClick={(e)=>{selectToggleType(e);setToggleState(0)}}>Members</button>
          

          <button className='toggle-btn col-md-12 col-6' onClick={(e)=>{selectToggleType(e);setToggleState(1)}}>Profile</button>
       
       
        </div> 
        <div className='col-md-10 col-12 m-0 p-0 '>
       { toggleState==0?<div className='member-component'> <MemberComponent /></div>
       :<ProfileComponent/>
       }
        </div>
      </div>
      </div>

    </>
  )
}



//member component
const MemberComponent=()=>{
 let {getSingleClass,singleClass,allTeachers,deleteSubTeacherPair}=useClassContext();
 const  [toggleState,setToggleState]=useState(0)
 const url= `/api/v1/deleteteacherpair/${singleClass._id}`
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
const [rendering,setrendering]=useState(false);
const deleteTeacherpair=async(D_index,teacherid)=>{
  
  await deleteSubTeacherPair(url,{teacherid},D_index);
  console.log(allTeachers)


  setrendering(current => !current)
}


 return(
  <>
<div className="container-fluid m-0" >
<div className='container'>
<div className='toggle-btns'>
 <button className='toggle-butn btn-left btn-active' onClick={(e) => { setToggleState(0); selectToggleType(e) }}>Teachers</button>
  <button className='toggle-butn btn-right' onClick={(e) => { setToggleState(1); selectToggleType(e) }}>Students</button>
</div>
   {
    toggleState==0? <div className="teacher-list container">
    {
    allTeachers.map((ele,index)=>{
      {/* console.log(ele.teacherId) */}
    return(

<>      <div className={`teacher-settings row`}>
        <div className="col-md-5 col-10">
        {ele.teacherName}
        </div>
        <div className="col-md-5 col-10" >
        {ele.subjectName}
        </div>
        <div className="col-2 col-md-2" >
        {<h5> <AiTwotoneDelete style={{color:"red",cursor:"pointer"}} onClick={(e)=>deleteTeacherpair(index,ele.teacherId)}/></h5>}
        </div>
        </div>
       
        </>
      
     
    )})
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
const ProfileComponent=()=>{
  const [className,setClassName]=useState({switch:false,data:"dfghjkl"})
  console.log(className)
  return(
    <>
    <div className="container-fluid">
    <div className="container">
    <div className="row">
    <div className="col-md-6 col-12 ">
      <div className='profile-component row'>
        {/* <div className="row"> */}
          <div className="col-3 profile-component-head">Class Name</div>
          <div className="col-7 ">
            <input type="text" className='profile-component-data' value={className.data} onChange={(e)=>setClassName({...className,data:e.target.value})} />
          </div>
          <div className="col-2 profile-component-edit" style={{cursor:"pointer"} }>
          {!className.switch?
          
          <FiEdit onClick={(e)=>setClassName({...className,switch:true})}/>
          :<MdOutlineDoneOutline  onClick={(e)=>setClassName({...className,switch:false})}/>
          }
          </div>
        {/* </div> */}
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
