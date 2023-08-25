import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import HeroSection from '../components/HeroSection';
import "../style/landingPage.css";
import { Toaster } from 'react-hot-toast';

function HomePage() {
    return (
        <>
            <NavbarComponent />
            <HeroSection />
        </>
    )
}

export default HomePage