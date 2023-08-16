import React from 'react'
import { useClassContext } from '../../context/ClassContext'

function ClassProfile() {
    const { teacherarray = [], singleClass = {}, allSubjects = [], allTeachers = [] } = useClassContext();
    console.log(teacherarray, allSubjects, allTeachers, singleClass);
    return (
        <div>ClassProfile</div>
    )
}

export default ClassProfile