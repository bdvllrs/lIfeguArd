import React, {Component} from 'react';

export default class ListItem extends Component {
    constructor() {
        super();
    }
    render() {
        const label = this.props.label ? this.props.label : this.props.children;
        return (
            <li><a onClick={() => this.props.onClick(this.props.value, label)}>{label}</a></li>
        );
    }
}
