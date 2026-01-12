import { useState } from 'react'
import Hero from './components/Hero'
import Stats from './components/Stats'
import MachineCards from './components/MachineCards'
import Services from './components/Services'
import Process from './components/Process'
import Gallery from './components/Gallery'
import Quality from './components/Quality'
import About from './components/About'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import SparkEffect from './components/SparkEffect'
import LoadingScreen from './components/LoadingScreen'

function App() {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <>
            <LoadingScreen onLoadComplete={() => setIsLoaded(true)} />
            <div className={`app ${isLoaded ? 'loaded' : ''}`}>
                <SparkEffect />
                <Hero />
                <Stats />
                <MachineCards />
                <Services />
                <Process />
                <Gallery />
                <Quality />
                <About />
                <ContactCTA />
                <Footer />
            </div>
        </>
    )
}

export default App

