import React from 'react'

const Banner = (props) => (
    <section id="banner" className="major">
        <div className="inner">
            <header className="major">
                <h1>Welcome to Sunny Crest!</h1>
            </header>
            <div className="content">
                <p>A historic farm homestead<br />
                located near Raub, Indiana</p>
                <ul className="actions">
                    { /* I need to find the fix for Atom's parser's "quote bug" */ }
                    <li><a href="#one" className="button next scrolly">The farm's structures</a></li>
                </ul>
            </div>
        </div>
    </section>
)

export default Banner
