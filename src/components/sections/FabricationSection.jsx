import { motion } from 'framer-motion'

/**
 * Fabrication & Welding Section - Cinematic
 * Human skill meets machine precision
 */
function FabricationSection() {
    return (
        <section className="cinematic-section" id="fabrication">
            {/* Background */}
            <div className="section-bg" style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)' }}>
                {/* Replace with welding video/image when available */}
            </div>
            <div className="section-overlay" style={{ background: 'rgba(10,10,10,0.4)' }}></div>

            {/* Content */}
            <motion.div
                className="section-content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="section-label">Metalwork</span>
                <h2 className="section-title">
                    Fabrication<br />& Welding
                </h2>
                <p className="section-subtitle">
                    LASER WELDING | MIG | TIG | SPOT WELDING
                </p>

                <div className="section-specs">
                    <div className="spec-item">
                        <span className="spec-value">MS</span>
                        <span className="spec-label">Mild Steel</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-value">SS</span>
                        <span className="spec-label">Stainless Steel</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-value">AL</span>
                        <span className="spec-label">Aluminum</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default FabricationSection
