import React, {Component} from 'react';

export default class Switcher extends Component {
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
        const switcher = this.state.active ? (<div>
                {this.props.children}
            </div>)  : null;
        return (
            {switcher}
        );
    }
}
