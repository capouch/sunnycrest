import React from 'react'
import { Link, graphql }  from 'gatsby'
import Helmet from 'react-helmet'
import Banner from '../components/Banner'
import Layout from "../components/layout"

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/pic06.jpg'
import pic12 from '../assets/images/pic12.jpg'
import pic13 from '../assets/images/pic13.jpg'
import pic14 from '../assets/images/pic14.jpg'


class HomeIndex extends React.Component {
    render() {
        const siteTitle = this.props.data.site.siteMetadata.title
        const siteDescription = this.props.data.site.siteMetadata.description

        return (
          <Layout>
            <div>
                <Helmet>
                    <title>{siteTitle}</title>
                    <meta name="description" content={siteDescription} />
                </Helmet>

                <Banner />
                <div id="main">
                    <section id="one" className="tiles">
                        <article style={{backgroundImage: `url(${pic01})`}}>
                            <header className="major">
                                <h3>Main House</h3>
                                <p>Built in 1916 by Josiah and Stella Portteus</p>
                            </header>
                            <Link to="/main-house" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic02})`}}>
                            <header className="major">
                                <h3>Carriage House</h3>
                                <p>On the farm since at least 1872</p>
                            </header>
                            <Link to="/carriage-house" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic03})`}}>
                            <header className="major">
                                <h3>Barn</h3>
                                <p>Classy new roof!</p>
                            </header>
                            <Link to="/barn" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic04})`}}>
                            <header className="major">
                                <h3>Chicken Coop</h3>
                                <p>Ready for birds!</p>
                            </header>
                            <Link to="/chicken-house" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic05})`}}>
                            <header className="major">
                                <h3>Cob House</h3>
                                <p>Stored corncobs for cookstove</p>
                            </header>
                            <Link to="/cob-house" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic06})`}}>
                            <header className="major">
                                <h3>Oil House</h3>
                                <p>Keep the volatiles away from the burnables</p>
                            </header>
                            <Link to="/oil-house" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic12})`}}>
                            <header className="major">
                                <h3>Outhouse</h3>
                                <p>An actual brick shithouse</p>
                            </header>
                            <Link to="/outhouse" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic13})`}}>
                            <header className="major">
                                <h3>Post-and-beam shed</h3>
                                <p>Hand-hewn logs and beams</p>
                            </header>
                            <Link to="/log-shed" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic14})`}}>
                            <header className="major">
                                <h3>Entrance columns</h3>
                                <p>Only one stands - All six are on site</p>
                            </header>
                            <Link to="/entrance" className="link primary"></Link>
                        </article>
                    </section>
                    <section id="two">
                        <div className="inner">
                            <header className="major">
                                <h2>How can you help?</h2>
                            </header>
                            <p>We are in the process of assessing and stabilizing the various buildings and substructures.  Once the brick house is habitable, we will be looking for motivated interns to help with the project</p>
                            <ul className="actions">
                                <li><a href="https://photos.app.goo.gl/KalJWFjSE86sfYb02" className="button next" target="_blank">Explore photos</a></li>
                            </ul>
                        </div>
                    </section>

                </div>
            </div>
          </Layout>
        )
    }
}

export default HomeIndex

export const pageQuery =  graphql`
        query SiteQuery {
          site {
            siteMetadata {
                title
                description
            }
          }
        }
        `
