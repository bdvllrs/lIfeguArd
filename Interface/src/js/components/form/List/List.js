import React, {Component, cloneElement} from 'react';

export default class List extends Component {
    constructor() {
        super();

        this.state = {
            selected: [],
            elements: [],
            inputs: null,
            open: false,
            searchbar: ""
        };

        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleSearchBar = this.handleSearchBar.bind(this);
    }

    handleClickButton(e) {
        if (!this.state.open)
            this.setState({open: !this.state.open});
        return false;
    }

    handleClickItem(value, content) {
        let selected = [];
        let toPush = true;
        if (this.props.multiple) {selected
            this.state.selected.forEach((item) => {
                selected.push({value: item.value, content: item.content});
                if (item.value === value) {
                    toPush = false;
                }
            });
        }
        if (toPush)
            selected = [...selected, {value, content}];
        this.setState({selected});
        this.updateInputs(selected);
        if (this.props.multiple === undefined) {
            this.setState({open: false});
        }
    }

    componentWillMount() {
        this.setState({elements: this.props.children});
        if (this.props.value) {
            if (this.props.value.constructor === Array) {
                let selected = [];
                this.props.value.forEach((value) => {
                    let content = null;
                    this.props.children.forEach(item => {
                        if(item.props.value === value) {
                            content = item.props.label ? item.props.label : item.props.children;
                        }
                    });
                    selected.push({value, content});
                });
                this.updateInputs(selected);
                this.setState({selected});
            }
            else {
                let label = null;
                this.props.children.forEach(item => {
                    if(item.props.value === this.props.value) {
                        label = item.props.label;
                    }
                });
                this.handleClickItem(this.props.value, label);
            }
        }
    else if (this.props.multiple === undefined && this.props.children !== undefined && this.props.children.length > 0) {
            let selectedElem = this.props.children[0];
            this.props.children.forEach((item) => {
                if (item.props.selected) selectedElem = item;
            });
            const label = selectedElem.props.label ? selectedElem.props.label : selectedElem.props.children;
            this.handleClickItem(selectedElem.props.value, label);
        }
    }

    handleSearchBar(e) {
        this.setState({searchbar: e.target.value});
        if (e.target.value === '') {
            this.setState({elements: this.props.children})
        } else {
            let selection = new RegExp(`(.*)${e.target.value.toLowerCase()}(.*)`);
            let allElements = this.props.children;
            let elements = [];
            allElements.forEach((element) => {
                if (selection.exec(element.props.label.toLowerCase())) {
                    elements.push(element);
                }
            });
            this.setState({elements});
        }
    }

    updateInputs(selected) {
        let inputs = null;
        if (this.props.multiple) {
            inputs = selected.map((value, key) => {
                return <input key={key} type="hidden" name={this.props.id.toString() + "[" + key + "]"}
                              value={value.value}/>
            });
        } else if (selected.length > 0) {
            inputs = <input type="hidden" name={this.props.id} value={selected[0].value}/>;
        }
        this.setState({inputs});
        const values = this.props.multiple ? selected.map(s => s.value) : (selected.length > 0 ? selected[0].value : null);
        this.props.onChange(this.props.id, values, true);
    }

    render() {
        const items = this.state.elements.map((item) => {
            return cloneElement(item, {onClick: this.handleClickItem, key: item.props.value})
        });
        const listBody =
            <ul className="select-list-body" ref={this.setWrapperRef}>
                {this.props.searchable ?
                    <li><input className="select-list-searchbar" autoFocus value={this.state.searchbar}
                               onChange={(e) => this.handleSearchBar(e)}/></li> : null}
                {items}
            </ul>;
        const chosen = this.props.multiple ? this.state.selected.map((value, key) => {
            return <li key={key}>{value.content}<a className="select-list-remove"
                                                   onClick={() => this.handleClickRemove(key)}><span className="oi"
                                                                                                     data-glyph="x"/></a>
            </li>
        }) : null;
        const selectorMsg = !this.props.multiple && this.state.selected.length > 0 ? this.state.selected[0].content : 'Choisir...';

        let inputStatus = '';
        if (this.props.error) inputStatus = ' error';
        else if (this.props.success) inputStatus = ' success';
        else if (this.props.warning) inputStatus = ' warning';
        else if (this.props.default) inputStatus = ' default';

        return (
            <div className={"form-group" + inputStatus}>
                {this.state.inputs}
                <div className="select-list" id={this.props.id}>
                    <label htmlFor={this.props.id}>{this.props.label}</label>
                    <div className={"select-list-selector btn" + inputStatus}
                         onClick={this.handleClickButton}>{selectorMsg} <span
                        className="oi"
                        data-glyph="chevron-bottom"
                        style={{fontSize: 10}}/>
                        {this.state.open ? listBody : null}
                    </div>
                    <ul className="select-list-holder">{chosen}</ul>
                </div>
            </div>
        );
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

    handleClickRemove(value) {
        let selected = this.state.selected;
        selected.splice(value, 1);
        this.setState({selected});
        this.updateInputs(selected);
    }
}
