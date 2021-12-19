import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <section className="footer">
            <p className="footer__item">William Schutte, &#169;2020 </p>
            <p className="footer__item">City data from <a className="footer__link" href="https://simplemaps.com/data/us-cities" targer="_blank" noreferrer="true">Simplemaps</a></p>
        </section>
    )
}

export default Footer
