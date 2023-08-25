import React, { useEffect } from 'react'
import "../style/Settings.css"
import ClassProfile from '../components/SingleClass/ClassProfile';
import { useClassContext } from '../context/ClassContext';
import { useParams } from 'react-router-dom';

const getSingleClassAPI = "/api/v1/getclass";

const ClassSettingsPage = () => {
  const { getSingleClass } = useClassContext();
  const { classid } = useParams();
  console.log(classid);
  useEffect(() => {
    getSingleClass(`${getSingleClassAPI}/${classid}`);
  }, [])
  return (
    <>
      <div >
        <ClassProfile />
      </div>

    </>
  )
}




//membersection


export default ClassSettingsPage;
