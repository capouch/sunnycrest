import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Contact from '../components/Contact'

const Generic = (props) => (
    <div>
        <Helmet>
            <title>Generic - Sunny Crest</title>
            <meta name="description" content="Generic Page" />
        </Helmet>

        <div id="main" className="alt">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h1>Contact us</h1>
                    </header>
                    <Contact />
                </div>
            </section>
        </div>

    </div>
)

export default Generic
