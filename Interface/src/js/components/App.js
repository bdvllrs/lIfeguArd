import React, {Component} from 'react';
import {apiUrl, publicUrl, refreshInterval} from "../settings";
import axios from 'axios';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            imgFlow: null,
            recording: false
        };

        this.timer = null;
    }

    getFlowUrl() {
        axios.get(apiUrl + '/pictures?last=1')
            .then((response) => {
                this.setState({imgFlow: response.data.path});
            });
    }

    componentWillMount() {
        this.getFlowUrl();
        axios.get(apiUrl + '/setting/recording').then((response) => {
            this.setState({recording: response.data.content == true});
            if (response.data.content == true)
                this.timer = setInterval(this.getFlowUrl.bind(this), refreshInterval);
        });
    }

    toggleRecording() {
        axios.post(apiUrl + '/setting/recording?content=' + (0 + !this.state.recording).toString(), {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                this.setState({recording: response.data.content == true});
                if (response.data.content == true) {
                    this.timer = setInterval(this.getFlowUrl.bind(this), refreshInterval);
                } else {
                    clearInterval(this.timer);
                }
            });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {
        const videoFlow = this.state.imgFlow ?
            <img src={publicUrl + '/images/pool/' + this.state.imgFlow} width="1000"/> : null;
        return (
            <div className="container grid-container">
                <nav className="navbar">
                    <a href="#" className="logo">
                        <img src="http://via.placeholder.com/70x70" width="70" height="70" alt="logo"/>
                    </a>
                    <ul className="menu">
                    </ul>
                </nav>
                <main className="content">
                    <h1>Flux vidéo</h1>
                    <div className="video-flow">
                        {videoFlow}
                    </div>
                    <button onClick={this.toggleRecording.bind(this)}>{this.state.recording ? 'Arrêter ' : 'Commencer '}
                        l'enregistrement
                    </button>
                </main>
            </div>
        );
    }
}
