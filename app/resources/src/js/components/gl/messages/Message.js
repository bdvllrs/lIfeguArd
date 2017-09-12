import React, {Component} from 'react';

export default class Message extends Component {

    constructor() {
        super();

        this.state = {
            loader: 100,
            mouseHover: false
        };

        this.updateTimer = this.updateTimer.bind(this);
        this.onClickHide = this.onClickHide.bind(this);
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }

    updateTimer() {
        if (!this.state.mouseHover) {
            let loader = this.state.loader;
            if (loader === 0) {
                clearInterval(this.timer);
            }
            if(this.props.timer === true) {
                loader -= 0.1;
            }else {
                loader -= 1 / this.props.timer;
            }
            this.setState({loader});
        }
    }

    onClickHide() {
        clearInterval(this.timer);
        this.setState({loader:0});
    }

    onMouseEnterHandler() {
        this.setState({loader: 100, mouseHover: true});
    }

    onMouseLeaveHandler() {
        this.setState({mouseHover: false});
    }

    componentDidMount() {
        if (this.props.timer) {
            this.timer = setInterval(this.updateTimer, 10);
        }
    }

    componentWillUnmount() {
        if (this.timer)
            clearInterval(this.timer);
    }

    render() {
        let icon = null;
        let className = "message";
        if (this.props.success) {
            className += " success";
            icon = (<span className="oi" data-glyph="check"/> );
        } else if (this.props.error) {
            className += " error";
            icon = (<span className="oi" data-glyph="x"/> );
        } else if (this.props.default) {
            className += " default";
            icon = (<span className="oi" data-glyph="info"/> );
        } else if (this.props.warning) {
            className += " warning";
            icon = (<span className="oi" data-glyph="warning"/> );
        }

        return this.state.loader > 0 ? (
            <div className={className} onMouseLeave={this.onMouseLeaveHandler} onMouseEnter={this.onMouseEnterHandler}>
                <a onClick={this.onClickHide} className="hide"><span className="oi" data-glyph="x" /></a>
                <p>
                    {icon}
                    {this.props.children}
                </p>
                {this.props.timer ? (
                    <div className="loader-container">
                        <div className="loader" style={{width: this.state.loader + '%'}}/>
                    </div> ) : null}
            </div>
        ) : null;
    }
}
