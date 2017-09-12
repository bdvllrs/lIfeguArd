import React, {Component} from 'react';

export default class Popup extends Component {

    constructor() {
        super();

        this.state = {
          open: true
        };

        this.onCloseHandle = this.onCloseHandle.bind(this);
    }

    onCloseHandle() {
        this.setState({open:false});
    }

    render() {
        return this.state.open ? (
            <div className="popup-container">
                <div className="popup">
                    <div className="popup-heading">
                        {this.props.heading}
                        <a className="hide" onClick={this.onCloseHandle}><span className="oi" data-glyph="x" /></a>
                    </div>
                    <div className="popup-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        ) : null;
    }
}
