import React, {Component, cloneElement} from 'react';

export default class Select extends Component {

    constructor() {
        super();

        this.state = {
            options: []
        };
    }

    componentWillMount() {
        const options = this.props.children.map((option) => {
            return cloneElement(option,  {key:option.props.value})

        });
        this.setState({options});
    }

    render() {
        let inputStatus = '';
        if (this.props.error) inputStatus = ' error';
        else if (this.props.success) inputStatus = ' success';
        else if (this.props.warning) inputStatus = ' warning';
        else if (this.props.warning) inputStatus = ' default';
        const helpText = this.props.help ? (<div className="form-help">{this.props.help}</div>) : null;

        return (
            <div className={"form-group" + inputStatus}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select value={this.props.value} onChange={(e) => this.props.onChange(this.props.id, e.target.value, true)} name={this.props.id}
                        id={this.props.id}>
                    {this.state.options}
                </select>
                {helpText}
            </div>
        )
    }
}
