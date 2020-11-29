import React from 'react';
import './index.css';

class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light justify-content-between">
                <a className="navbar-brand">Top 10 Trending Gifs</a>
            </nav>
        )
    }
}

export default Nav;