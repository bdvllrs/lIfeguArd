import React, {Component} from 'react';

export default class Table extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            order: {
                by: null,
                order: 1
            }
        };
        this.handleThClick = this.handleThClick.bind(this);
    }

    componentWillMount() {
        this.setState({data: this.props.data});
    }

    handleThClick(e, k) {
        e.preventDefault();
        let {by, order} = this.state.order;
        if (by === k) order = -order;
        else order = 1;

        let data = this.props.data;
        data.sort((a, b) => {
            if (a[k] === b[k]) return 0;
            else if (order === 1 && a[k] < b[k]) return -1;
            else if (order === -1 && a[k] < b[k]) return 1;
            else if (order === -1 && a[k] > b[k]) return -1;
            return 1;
        });
        this.setState({data:data, order: { by: k, order: order}});
    }

    render() {
        const th = this.props.headers ? this.props.headers.map((header, k) => {
            return <th key={k}>
                <a onClick={(e) => this.handleThClick(e, k)}>
                    {header}
                    {this.state.order.by === k && this.state.order.order === 1 ?
                        <span className="oi" data-glyph="arrow-top"/> : null}
                    {this.state.order.by === k && this.state.order.order === -1 ?
                        <span className="oi" data-glyph="arrow-bottom"/> : null}
                </a>
            </th>;
        }) : null;
        const tr = this.state.data ? this.state.data.map((d, k) => {
            return <tr key={k}>
                {d.map((td, key) => {
                    return <td key={key}>{td}</td>
                })}
            </tr>;
        }) : null;
        return (
            <table>
                <thead>
                <tr>
                    {th}
                </tr>
                </thead>
                <tbody>
                {tr}
                </tbody>
            </table>
        );
    }
}
