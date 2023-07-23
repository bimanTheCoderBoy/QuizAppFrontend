import React from 'react'
import HeroCorousel from './HeroCarousel'
import { NavLink } from 'react-router-dom'

function HeroSection() {
    return (
        <div className='container-fluid hero-section my-5'>
            <div className='row'>
                <div className='col-md-5 col-11 mx-auto order-md-0 order-1 hero-left'>
                    <p className='hero-text'>New Technique of <span style={{ color: "#0088ff" }}>Quiz</span> Evaluation</p>
                    <NavLink to="/exlore"><button>Explore</button></NavLink>
                </div>
                <div className='col-md-5 col-11 mx-auto order-md-1 order-0'>
                    <HeroCorousel />
                </div>
            </div>
            <NavLink className='contact-us'><p>Contact Us</p></NavLink>
        </div>
    )
}

export default HeroSection