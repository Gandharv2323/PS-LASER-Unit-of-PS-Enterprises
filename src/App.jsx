import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'

// Cinematic Sections
import {
    HeroSection,
    WhatWeDoSection,
    LaserCuttingSection,
    BendingSection,
    PowderCoatingSection,
    FabricationSection,
    CapabilitiesSection,
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

            <main className={`app ${isLoaded ? 'loaded' : ''}`}>
                <HeroSection />
                <WhatWeDoSection />
                <LaserCuttingSection />
                <BendingSection />
                <PowderCoatingSection />
                <FabricationSection />
                <CapabilitiesSection />
                <AboutSection />
                <ContactSection />
            </main>
        </>
    )
}

export default App
