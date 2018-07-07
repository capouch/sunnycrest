import React from 'react'
import {Link} from 'gatsby'
import Helmet from 'react-helmet'

import pic11 from '../assets/images/pic11.jpg'

const Mission = (props) => (
    <div>
        <Helmet>
            <title>Mission - Sunny Crest</title>
            <meta name="description" content="Mission Page" />
        </Helmet>

        <div style={{ margin: "3rem auto", maxWidth: 600, "font-family": "Times New Roman" }} id="main" className="alt">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h1>Landing page for mission statement</h1>
                    </header>
                    <span className="image main"><img src={pic11} alt="" /></span>
                    <p>This page will contain a formal mission statement soon!</p>
                </div>
            </section>
        </div>

    </div>
)

export default Mission
