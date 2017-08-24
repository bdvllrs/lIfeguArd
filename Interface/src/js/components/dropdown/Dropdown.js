import React, {Component} from 'react';

export default class Dropdown extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        this.handleClickDropdown = this.handleClickDropdown.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillMount() {
        if(this.props.open) {
            this.setState({ open: true })
        }
    }

    handleClickDropdown() {
        this.setState({
            open: !this.state.open
        });
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                open: false
            })
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    render() {
        const links = this.props.children;
        const menu = (
            <ul className="dropdown-menu">
                {links}
            </ul>);
        return (
            <div ref={this.setWrapperRef} className="dropdown">
                <div className="dropdown-container">
                    <a className={this.props.className} onClick={() => this.handleClickDropdown()}>{this.props.label} <span aria-hidden className="oi"
                                                                              style={{fontSize: 12}}
                                                                              data-glyph={this.state.open ? "chevron-top" : "chevron-bottom"}/>
                    </a>
                    {this.state.open ? menu : null}
                </div>
            </div>
        );
    }
}
