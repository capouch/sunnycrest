import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import BannerLanding from '../components/BannerLanding'
import Layout from "../components/layout"

import pic08 from '../assets/images/pic08.jpg'
import pic09 from '../assets/images/pic09.jpg'

const Landing = (props) => (
    <div>
      <Layout>
        <Helmet>
            <title>Architecture - Sunny Crest</title>
            <meta name="description" content="Landing Page" />
        </Helmet>

        <BannerLanding />

        <div style={{ margin: "3rem auto", maxWidth: 600, "fontFamily": "Times New Roman" }} id="main">
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
                                <h3>Fancy ridge cap preserved</h3>
                            </header>
                            <p>The original roof on the house was slate.  For unknown reasons, it failed and was replaced in the 1980s.  The fancy dentillated ridge cap was preserved, and placed over the shingled ridge.</p>
                        </div>
                    </div>
                </section>
                <section>
                      <Link to="/#" className="image">
                          <img src={pic09} alt="" />
                      </Link>
                      <div className="content">
                          <div className="inner">
                              <header className="major">
                                  <h3>Hand-painted plaster walls!</h3>
                              </header>
                              <p>The plaster walls of the main room were painted by local artisans, the Diedams.  The walls were refurbished ahead of Josiah and Stella Portteus's 50th wedding anniversary in 1946.</p>
                              <ul className="actions">
                                  <li><Link to="/mission" className="button">Our mission</Link></li>
                              </ul>
                          </div>
                      </div>
                  </section>
            </section>
        </div>
      </Layout>
    </div>
)

export default Landing
