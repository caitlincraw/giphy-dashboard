import React from 'react';
import './index.css';
import Clipboard from 'react-clipboard.js';

class Gif extends React.Component {
    render() {
        return (
            <div className="card" style={{width: "20rem"}}>
            <img src={this.props.url} className="card-img-top" alt="Dog pic" />
            <div className="card-body">
                <h5 className="card-title">{this.props.title}</h5>
                <Clipboard className="copy-button" data-clipboard-text={this.props.url} onClick={() => alert("Gif has been copied")}>
                    COPY GIF URL
                </Clipboard>
            </div>
            </div>
        );
    };
}

export default Gif;