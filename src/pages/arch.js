import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import BannerLanding from '../components/BannerLanding'

import pic08 from '../assets/images/pic08.jpg'

const Landing = (props) => (
    <div>
        <Helmet>
            <title>Architecture - Sunny Crest</title>
            <meta name="description" content="Landing Page" />
        </Helmet>

        <BannerLanding />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Individual architectural descriptions will be here</h2>
                    </header>
                    <p>For over a hundred years, Sunny Crest was owned by a succession of members of the Portteus family.  The brick Craftsman Foursquare was built by Josiah Lowes and Stella Shonkwiler Portteus in 1915.  When they built it, they moved the original house on the property about fifty yards west, and converted into a shop and garage.  Today most of the farm structures remain.</p>
                </div>
            </section>
            <section id="two" className="spotlights">
            <section>
                  <Link to="/#" className="image">
                      <img src={pic08} alt="" />
                  </Link>
                  <div className="content">
                      <div className="inner">
                          <header className="major">
                              <h3>What would you call this?</h3>
                          </header>
                          <p>The original roof on the house was slate.  For unknown reasons, it failed and was replaced in the 1980s.  The owner arranged to have the affordance you see here re-installed after the replacement.  What in the world is it called?</p>
                          <ul className="actions">
                              <li><Link to="/mission" className="button">Our mission</Link></li>
                          </ul>
                      </div>
                  </div>
              </section>
            </section>
        </div>

    </div>
)

export default Landing
