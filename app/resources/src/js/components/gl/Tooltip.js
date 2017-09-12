import React, {Component} from 'react';

export default class Tooltip extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.setState({ open: true });
    }

    handleMouseLeave() {
        this.setState({ open: false });
    }

    render() {
        const location = this.props.top ? ' top' : '';
        const message = <span className={"tooltip-body" + location}>{this.props.message}</span>;
        return (
            <span className="tooltip" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {this.props.children}
                {this.state.open ? message : null}
            </span>
        );

    }
}