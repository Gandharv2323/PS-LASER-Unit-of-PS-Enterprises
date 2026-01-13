import { motion } from 'framer-motion'

/**
 * Contact Section - Cinematic
 * Clear and confident call to action
 */

const phoneNumbers = [
    { number: '+91 7719976990', name: 'Swapnil Tanpure' },
    { number: '+91 9763679499', name: 'Pranil Talap' },
    { number: '+91 9764364704', name: 'Umesh Tanpure' },
    { number: '+91 9623161813', name: 'Sonu Agrawal' }
]

function ContactSection() {
    const whatsappMessage = `Hi, I would like to get a quotation for CNC laser cutting, bending, powder coating, or fabrication work.`
    const whatsappLink = `https://wa.me/917719976990?text=${encodeURIComponent(whatsappMessage)}`

    return (
        <section className="cinematic-section contact-section" id="contact">
            {/* Dark Background */}
            <div className="section-bg" style={{ background: '#0a0a0a' }}></div>

            {/* Content */}
            <motion.div
                className="section-content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="section-label">Contact</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    Ready to Discuss<br />Your Requirement?
                </h2>

                <a href={whatsappLink} className="contact-cta-btn" target="_blank" rel="noopener noreferrer">
                    Request a Quote
                </a>

                {/* Contact Info */}
                <div className="contact-info-grid">
                    <div className="contact-info-item">
                        <h4>Phone</h4>
                        {phoneNumbers.map((phone, index) => (
                            <p key={index}>
                                <a href={`tel:${phone.number.replace(/\s/g, '')}`}>
                                    {phone.number}
                                </a>
                                <br />
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                    {phone.name}
                                </span>
                            </p>
                        ))}
                    </div>
                    <div className="contact-info-item">
                        <h4>Email</h4>
                        <p>
                            <a href="mailto:pslaser24@gmail.com">pslaser24@gmail.com</a>
                        </p>
                    </div>
                    <div className="contact-info-item">
                        <h4>Address</h4>
                        <p>
                            Gat No. 753, Velu Bag<br />
                            Tal-Bhor, Pune – 412205<br />
                            Maharashtra, India
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default ContactSection
