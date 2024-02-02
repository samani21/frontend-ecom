import React from "react";
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hand_image from '../Assets/hero_image.png'
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-left">
                <h2>NEEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>New</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>collection</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="hero-right">
                <img src={hand_image} alt="" />
            </div>
        </div>
    )
}

export default Hero;