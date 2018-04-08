import React from 'react'
import Link from 'gatsby-link'

const Menu = (props) => (
    <nav id="menu">
        <div className="inner">
            <ul className="links">
                <li><Link onClick={props.onToggleMenu} to="/">Home</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/contact">Contact</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/arch">Architecture</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/mission">Mission</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/notify">Notifications</Link></li>
            </ul>
        </div>
        <a className="close" onClick={props.onToggleMenu} href="javascript:;">Close</a>
    </nav>
)

Menu.propTypes = {
    onToggleMenu: React.PropTypes.func
}

export default Menu
