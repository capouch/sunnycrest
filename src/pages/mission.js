import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import pic11 from '../assets/images/pic11.jpg'

const Generic = (props) => (
    <div>
        <Helmet>
            <title>Mission - Sunny Crest</title>
            <meta name="description" content="Generic Page" />
        </Helmet>

        <div id="main" className="alt">
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

export default Generic
