import React from 'react'
import "../style/Settings.css"
import NavbarComponent from '../components/NavbarComponent';
import ClassProfile from '../components/SingleClass/ClassProfile';

const SettingsPage = () => {
  return (
    <>
      <NavbarComponent />
      <div >
        <ClassProfile />
      </div>

    </>
  )
}




//membersection


export default SettingsPage;
