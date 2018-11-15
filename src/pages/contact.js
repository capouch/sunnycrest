import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Contact from '../components/Contact'
import Layout from "../components/layout"

const Generic = (props) => (
    <div>
      <Layout>
        <Helmet>
            <title>Contact - Sunny Crest</title>
            <meta name="description" content="Generic Page" />
        </Helmet>

        <div id="main" className="alt">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h1>Contact us - Independence Church Projects</h1>
                    </header>
                    <Contact />
                </div>
            </section>
        </div>
      </Layout>
    </div>
)

export default Generic
