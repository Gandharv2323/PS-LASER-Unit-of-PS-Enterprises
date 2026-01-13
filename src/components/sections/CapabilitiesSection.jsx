import { motion } from 'framer-motion'

/**
 * Capabilities Section - Cinematic
 * Big numbers that build trust
 */
function CapabilitiesSection() {
    const capabilities = [
        { value: '±0.1', unit: 'mm', label: 'Tolerance' },
        { value: '175', unit: 'Ton', label: 'Press Capacity' },
        { value: '1000+', unit: 'Hrs', label: 'Salt Spray Test' }
    ]

    return (
        <section className="cinematic-section capabilities-section" id="capabilities">
            {/* Dark Background */}
            <div className="section-bg" style={{ background: '#0a0a0a' }}></div>

            {/* Content */}
            <motion.div
                className="section-content"
                style={{ maxWidth: '100%', textAlign: 'center' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>
                    Our Capabilities
                </span>

                <div className="capabilities-grid">
                    {capabilities.map((cap, index) => (
                        <motion.div
                            key={cap.label}
                            className="capability-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                        >
                            <span className="capability-value">
                                {cap.value}
                                <span style={{ fontSize: '0.4em', opacity: 0.6, marginLeft: '0.25em' }}>
                                    {cap.unit}
                                </span>
                            </span>
                            <span className="capability-label">{cap.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default CapabilitiesSection
