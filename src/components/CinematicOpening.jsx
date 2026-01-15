import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CinematicOpening.css'

function CinematicOpening({ onComplete }) {
    const canvasRef = useRef(null)
    const [isOpening, setIsOpening] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const particlesRef = useRef([])

    // Trigger opening sequence
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpening(true)
            // Cleanup after animation
            setTimeout(() => {
                setIsVisible(false)
                if (onComplete) onComplete()
            }, 2500)
        }, 1000)

        return () => clearTimeout(timer)
    }, [onComplete])

    // Spark Burst Logic
    useEffect(() => {
        if (!isOpening) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const createSpark = (x, y) => {
            const angle = Math.random() * Math.PI * 2
            const speed = 5 + Math.random() * 15
            return {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                life: 1,
                decay: 0.01 + Math.random() * 0.02,
                gravity: 0.2,
                size: 1 + Math.random() * 2,
                color: `rgba(255, ${150 + Math.random() * 105}, ${20 + Math.random() * 50}, `
            }
        }

        // Initial burst
        for (let i = 0; i < 150; i++) {
            particlesRef.current.push(createSpark(window.innerWidth / 2, window.innerHeight / 2))
        }

        let animationFrame
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Periodically add more sparks while opening
            if (Math.random() > 0.3) {
                for (let i = 0; i < 5; i++) {
                    particlesRef.current.push(createSpark(window.innerWidth / 2, Math.random() * window.innerHeight))
                }
            }

            particlesRef.current = particlesRef.current.filter(p => {
                p.vx *= 0.98
                p.vy += p.gravity
                p.x += p.vx
                p.y += p.vy
                p.life -= p.decay

                if (p.life <= 0) return false

                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2)
                ctx.strokeStyle = p.color + p.life + ')'
                ctx.lineWidth = p.size
                ctx.stroke()

                return true
            })

            animationFrame = requestAnimationFrame(animate)
        }

        animate()
        return () => cancelAnimationFrame(animationFrame)
    }, [isOpening])

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="cinematic-opening">
                    {/* Background Content Fade-in through the gap */}
                    <canvas ref={canvasRef} className="opening-sparks" />

                    {/* Left Door */}
                    <motion.div
                        className="opening-door door-left"
                        initial={{ x: 0 }}
                        animate={isOpening ? { x: '-100%' } : { x: 0 }}
                        transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
                    >
                        <div className="door-handle">
                            <div className="bolt" />
                            <div className="bolt" />
                            <div className="bolt" />
                        </div>
                    </motion.div>

                    {/* Right Door */}
                    <motion.div
                        className="opening-door door-right"
                        initial={{ x: 0 }}
                        animate={isOpening ? { x: '100%' } : { x: 0 }}
                        transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
                    >
                        <div className="door-handle">
                            <div className="bolt" />
                            <div className="bolt" />
                            <div className="bolt" />
                        </div>
                    </motion.div>

                    {/* Central Glow Seam */}
                    <motion.div
                        className="seam-glow"
                        initial={{ opacity: 0 }}
                        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                </div>
            )}
        </AnimatePresence>
    )
}

export default CinematicOpening
