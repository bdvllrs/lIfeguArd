import React, {Component} from 'react';

export default class Textarea extends Component {
    constructor() {
        super();

        this.state = {
            selected: "one"
        }
    }

    render() {
        let inputStatus = '';
        if (this.props.error) inputStatus = ' error';
        else if (this.props.success) inputStatus = ' success';
        else if (this.props.warning) inputStatus = ' warning';
        else if (this.props.default) inputStatus = ' default';
        const helpText = this.props.help ? (<div className={"form-help"}>{this.props.help}</div>) : null;

        return (
            <div className={"form-group"+inputStatus}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <textarea id={this.props.id} name={this.props.id} value={this.props.value}
                       onChange={(e) => this.props.onChange(this.props.id, e.target.value, true)} disabled={this.props.disabled} />
                {helpText}
            </div>
        );
    }
}
