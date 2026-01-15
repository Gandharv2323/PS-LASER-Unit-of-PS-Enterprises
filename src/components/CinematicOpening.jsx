import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CinematicOpening.css'

function CinematicOpening({ onComplete }) {
    const canvasRef = useRef(null)
    const [isOpening, setIsOpening] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const particlesRef = useRef([])

    const hasTriggeredRef = useRef(false)

    // Trigger opening sequence
    useEffect(() => {
        if (hasTriggeredRef.current) return
        hasTriggeredRef.current = true

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
            const angle = (Math.random() - 0.5) * Math.PI * 0.4 - Math.PI / 2 // Upward spray
            const speed = 10 + Math.random() * 25
            return {
                x,
                y,
                vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.03 + Math.random() * 0.05, // Shorter life
                gravity: 0.4,
                size: 0.5 + Math.random() * 1.5,
                color: { r: 255, g: 200 + Math.random() * 55, b: 50 + Math.random() * 100 },
                trail: [] // For motion blur
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
            if (isOpening && Math.random() > 0.4) {
                for (let i = 0; i < 8; i++) {
                    particlesRef.current.push(createSpark(window.innerWidth / 2, Math.random() * window.innerHeight))
                }
            }

            particlesRef.current = particlesRef.current.filter(p => {
                // Motion trail
                p.trail.unshift({ x: p.x, y: p.y })
                if (p.trail.length > 5) p.trail.pop()

                p.vx *= 0.96
                p.vy += p.gravity
                p.x += p.vx
                p.y += p.vy
                p.life -= p.decay

                if (p.life <= 0) return false

                // Draw realistic spark trail
                if (p.trail.length > 1) {
                    ctx.beginPath()
                    ctx.moveTo(p.trail[p.trail.length - 1].x, p.trail[p.trail.length - 1].y)
                    for (let i = p.trail.length - 2; i >= 0; i--) {
                        ctx.lineTo(p.trail[i].x, p.trail[i].y)
                    }
                    ctx.lineTo(p.x, p.y)

                    const alpha = p.life * 0.8
                    ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`
                    ctx.lineWidth = p.size * p.life
                    ctx.lineCap = 'round'
                    ctx.stroke()

                    // White hot core
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`
                    ctx.lineWidth = p.size * p.life * 0.4
                    ctx.stroke()
                }

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
                        <div className="door-branding">P</div>
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
                        <div className="door-branding">S</div>
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
