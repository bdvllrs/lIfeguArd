import React, {Component, cloneElement} from 'react';

export default class SwitcherClass extends Component {
    constructor() {
        super();

        this.state = {
            active: false
        };

        this.handleClickTrigger = this.handleClickTrigger.bind(this);
    }

    handleClickTrigger() {
        const active = !this.state.active;
        this.setState({active});
    }

    componentDidMount() {
        document.getElementById(this.props.trigger).addEventListener('click', this.handleClickTrigger)
    }

    componentWillUnmount() {
        document.getElementById(this.props.trigger).removeEventListener('click', this.handleClickTrigger)
    }

    render() {
        let className = this.props.children.props.className ? this.props.children.props.className : '';
        className = this.state.active ? className + " " + this.props.className : className;
        const switcher = cloneElement(this.props.children, {className});
        return (
            <div>{switcher}</div>
        );
    }
}
