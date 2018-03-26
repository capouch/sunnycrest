import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import BannerLanding from '../components/BannerLanding'

import pic08 from '../assets/images/pic08.jpg'
import pic09 from '../assets/images/pic09.jpg'
import pic10 from '../assets/images/pic10.jpg'

const Landing = (props) => (
    <div>
        <Helmet>
            <title>Sunny Crest - The Portteus Farm</title>
            <meta name="description" content="Landing Page" />
        </Helmet>

        <BannerLanding />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>You will like this farm . . </h2>
                    </header>
                    <p>For over a hundred years, Sunny Crest was owned by a succession of members of the Portteus family.  The brick Craftsman Foursquare was built by Josiah Lowes and Stella Shonkwiler Portteus in 1915.  When they built it, they moved the original house on the property about fifty yards west, and converted into a shop and garage.  Today most of the farm structures remain.</p>
                </div>
            </section>
            <section id="two" className="spotlights">
            </section>
        </div>

    </div>
)

export default Landing
