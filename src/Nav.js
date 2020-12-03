import React from 'react';
import './index.css';

class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light justify-content-between">
                <button className="navbar-brand" onClick={this.props.handleClick}>Giphy Dashboard</button>
            </nav>
        )
    }
}

export default Nav;