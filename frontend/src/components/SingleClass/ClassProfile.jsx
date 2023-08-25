import React, { useEffect } from 'react'
import { useClassContext } from '../../context/ClassContext'

function ClassProfile() {
    const { teacherarray = [], singleClass = {}, allSubjects = [], allTeachers = [], getSingleClass } = useClassContext();
    console.log(teacherarray, allSubjects, allTeachers, singleClass);
    useEffect(() => {

    })
    return (
        <div>ClassProfile</div>
    )
}

export default ClassProfile