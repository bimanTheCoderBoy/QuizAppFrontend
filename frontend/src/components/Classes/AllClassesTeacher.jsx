import { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { GrAdd } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useClassContext } from '../../context/ClassContext';


// const allOwnClasses = [{ name: "cse1", subject: "science" },
// { name: "cse2", subject: "humanities" },
// { name: "cse3", subject: "science" },
// { name: "csbs", subject: "maths" },
// { name: "batch-x", subject: "eco" },
// { name: "csbs", subject: "maths" },
// { name: "batch-x", subject: "eco" },
// { name: "csbs", subject: "maths" },
// { name: "batch-x", subject: "eco" },
// { name: "batch-y", subject: "maths" },
// ]

// const allOtherClasses = [
//     { name: "cse1", subject: "science" },
//     { name: "cse1", subject: "science" },
//     { name: "cse1", subject: "science" },
//     { name: "cse1", subject: "science" },
//     { name: "cse1", subject: "science" },
// ]




function AllClassesTeacher() {
    const [cls, setCls] = useState(0);
    const { isClassLoading, classErrorMsg, isError, ownClasses, otherClasses, getClasses } = useClassContext();
    const selectClassType = (e) => {
        const buttons = document.querySelectorAll(".butn");
        buttons.forEach((ele) => {
            ele.classList.remove("btn-active");
        })
        e.target.classList.add("btn-active");
    }

    const displayPop = () => {
        const pop = document.querySelector(".add-class");
        pop.classList.remove("hidden");
    }

    const hidePop = () => {
        const pop = document.querySelector(".add-class");
        pop.classList.add("hidden");
    }

    useEffect(() => {
        getClasses("ksjdf");
        console.log("alu");
    }, [])
    return (


        <div className='container-fluid'>
            <div className='row all-classes-area'>
                <div className='col-md-12 col-12'>
                    <div className='class-area'>
                        <div className='class-btns'>
                            <button className='butn btn-left btn-active' onClick={(e) => { setCls(0); selectClassType(e); hidePop() }}>Own</button>
                            <button className='butn btn-right' onClick={(e) => { setCls(1); selectClassType(e); hidePop() }}>Other</button>
                            <div className='class-add-btn ms-auto' onClick={() => displayPop()}><GrAdd /></div>
                        </div>
                        <div className='all-classes'>
                            {
                                cls ?
                                    otherClasses?.map((ele, i) => {
                                        return (
                                            <div className='class' key={i}>
                                                <div className='class-name'>{ele.name}</div>
                                                {/* <div className='class-subject'>{ele.subject}</div> */}
                                            </div>
                                        )
                                    }) :
                                    ownClasses?.map((ele, i) => {
                                        return (
                                            <div className='class' key={i}>
                                                <div className='class-name'>{ele.name}</div>
                                                {/* <div className='class-subject'>{ele.subject}</div> */}
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='add-class hidden'>
                <div className='add-box'>
                    <div className='cross' onClick={() => hidePop()}><RxCross1 /></div>
                    {
                        cls ?
                            <>
                                <h2>Join Insititute</h2>
                                <form action="" className='add-form'>
                                    <input type="text" placeholder='Institute code' className='add-name' />
                                    <input type="submit" value="Join" className='add-button' />
                                </form>
                            </> :
                            <>
                                <h2>Add Class</h2>
                                <form action="" className='add-form'>
                                    <input type="text" placeholder='Classname' className='add-name' />
                                    <input type="submit" value="Create Class" className='add-button' />
                                </form>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default AllClassesTeacher