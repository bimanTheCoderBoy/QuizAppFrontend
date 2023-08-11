import React from 'react'
// import { useProfileContext } from '../../context/ProfileContext'
import { useClassContext } from '../../context/ClassContext';

function Welcome() {
    const { name } = useClassContext();
    return (
        <div className='welcome'>
            <div className='welcome-msg'>Welcome</div>
            <div className='welcome-name'>{name}</div>
        </div>
    )
}

export default Welcome