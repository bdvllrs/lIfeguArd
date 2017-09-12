import React, {Component, cloneElement} from 'react';

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            elements: {},
            inputs: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(id, value, success = true, message = null) {
        this.props.onChange(id, value, success, message);
        let elements = this.state.elements;
        elements[id] = value;
        let inputElems = this.props.children;
        if(this.state.inputs.length > 0) {
            inputElems = this.state.inputs;
        }
        const inputs = inputElems.map((input) => {
            if (input && input.props.id === id) {
                return cloneElement(input, {
                    onChange: this.onChange,
                    key: input.props.id,
                    value: (input.props.id === id ? value : input.props.value),
                    error: !success,
                    success: success,
                    errorMessage: message
                });
            }
            else if (input && input.props.id) {
                return cloneElement(input, {
                    onChange: this.onChange,
                    key: input.props.id,
                    value: (input.props.id === id ? value : input.props.value),
                });
            } else return input;
        });
        this.setState({elements, inputs})
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.props.onSubmit) {
            this.props.onSubmit(this.state.elements);
        }
    }

    componentWillMount() {
        let elements = [];
        this.props.children.forEach((input) => {
            if (input.props.id) {
                elements[input.props.id] = input.props.value;
            }
        });
        const inputs = this.props.children.map((input) => {
            if (input.props.id) {
                return cloneElement(input, {
                    onChange: this.onChange,
                    key: input.props.id,
                    value: this.state.elements[input.props.id]
                });
            } else return input;
        });
        this.setState({elements, inputs});
    }

    render() {
        return (
            <form action={this.props.action} method={this.props.method} className="vertical">
                {this.state.inputs}

                <div className="form-actions">
                    <button role="submit" className="btn success" onClick={(e) => this.onSubmit(e)}>{this.props.submit ? this.props.submit : 'Submit'}</button>
                </div>
            </form>
        );
    }
}
