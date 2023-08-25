import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useClassContext } from '../../context/ClassContext'
import Loading from '../Loading';
import { NavLink } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
// import 

const AllClassesStudent = () => {
    const { isClassLoading, ownClasses } = useClassContext();
    const [className, setClassName] = useState("");

    //Display Pop
    const displayPop = () => {
        const pop = document.querySelector(".add-class");
        pop.classList.remove("hidden");
    }

    //Hide Pop
    const hidePop = () => {
        const pop = document.querySelector(".add-class");
        setClassName("");
        pop.classList.add("hidden");
    }

    //Add Student Class
    const addNewClass = () => {

    }

    return (
        <>
            <div className='all-classes-area'>
                <div className='label'>
                    <div>My Classes</div>
                    <div className='class-add-btn'><GrAdd /></div>
                </div>
                <div className='all-classes'>
                    {
                        isClassLoading ?
                            <Loading /> : <>
                                {
                                    ownClasses?.map((ele, i) => {
                                        return (
                                            <NavLink to={`/class/${ele._id}`} className='class' key={i}>
                                                <div className='class-name'> {ele.name}</div>
                                                {/* <div className='class-subject'>{ele.subject}</div> */}
                                            </NavLink>
                                        )
                                    })
                                }
                            </>

                    }
                </div>
            </div>

            {/* Pop  */}
            <div className='add-class hidden'>
                <div className='add-box'>
                    <div className='cross' onClick={() => hidePop()}><RxCross1 /></div>
                    <div>
                        <h2>Add Class</h2>
                        <form action="" className='add-form'>
                            <input type="text" placeholder='Classname' value={className} className='add-name' onChange={(e) => setClassName(e.target.value)} />
                            <input type="submit" value="Create Class" className='add-button' onClick={(e) => addNewClass(e)} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllClassesStudent