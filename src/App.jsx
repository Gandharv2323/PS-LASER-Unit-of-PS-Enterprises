import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import './components/Header.css'

// Cinematic Sections
import {
    HeroSection,
    WhatWeDoSection,
    LaserCuttingSection,
    BendingSection,
    PowderCoatingSection,
    FabricationSection,
    CapabilitiesSection,
    PortfolioSection,
    ProcessSection,
    AboutSection,
    ContactSection
} from './components/sections'

/**
 * PS Laser - Cinematic Industrial Website
 * SpaceX-inspired vertical storytelling
 */
function App() {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <>
            <LoadingScreen onLoadComplete={() => setIsLoaded(true)} />

            <Header />

            <main className={`app ${isLoaded ? 'loaded' : ''}`}>
                <HeroSection />
                <WhatWeDoSection />
                <LaserCuttingSection />
                <BendingSection />
                <PowderCoatingSection />
                <FabricationSection />
                <ProcessSection />
                <PortfolioSection />
                <CapabilitiesSection />
                <AboutSection />
                <ContactSection />
            </main>
        </>
    )
}

export default App
