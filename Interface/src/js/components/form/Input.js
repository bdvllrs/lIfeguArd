import React, {Component} from 'react';
import formMessages from './messages';

export default class Input extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let isCorrect = true;
        const value = this.props.type === 'checkbox' ? e.target.checked : e.target.value;
        let message = null;
        if (this.props.required && value === '') {
            isCorrect = false;
            message = formMessages.notEmpty;
        }
        if (this.props.rule) {
            let rule = new RegExp(this.props.rule);
            if(! rule.exec(value)) {
                isCorrect = false;
                message = this.props.ruleMessage ? this.props.ruleMessage : formMessages.incorrect;
            }
        }
        this.props.onChange(this.props.id, value, isCorrect, message)
    }

    render() {
        let inputStatus = '';
        if (this.props.error) inputStatus = ' error';
        else if (this.props.success) inputStatus = ' success';
        else if (this.props.warning) inputStatus = ' warning';
        else if (this.props.warning) inputStatus = ' default';
        const helpText = this.props.help ? (<div className={"form-help"}>{this.props.help}</div>) : null;
        const errorMessage = this.props.errorMessage ? (<div className={"form-help"}>{this.props.errorMessage}</div>) : null;
        const type = this.props.type ? this.props.type : 'text';

        return (
            <div className={"form-group" + inputStatus}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type={type} id={this.props.id} name={this.props.id} value={this.props.value}
                       onChange={(e) => this.onChange(e)} disabled={this.props.disabled} checked={this.props.checked}/>
                {errorMessage !== null ? errorMessage : helpText}
            </div>
        );
    }
}
