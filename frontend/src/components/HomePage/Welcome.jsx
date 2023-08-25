import React from 'react'
// import { useProfileContext } from '../../context/ProfileContext'
import { useClassContext } from '../../context/ClassContext';
import { useProfileContext } from '../../context/ProfileContext';

function Welcome() {
    const { profile } = useProfileContext();
    return (
        <div className='welcome'>
            <div className='welcome-msg'>Welcome</div>
            <div className='welcome-name'>{profile.name}</div>
        </div>
    )
}

export default Welcome