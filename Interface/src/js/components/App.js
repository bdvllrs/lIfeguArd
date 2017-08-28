import React, {Component} from 'react';
import {apiUrl, publicUrl, refreshInterval} from "../settings";
import axios from 'axios';
import Message from "./messages/Message";

const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
};

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            imgFlow: null,
            recording: false,
            memory: -1,
            status: 'empty',
            guarding: false,
            photoInterval: 3,
            toUpload: false,
        };

        this.timer = null;
        this.handleMemoryChange = this.handleMemoryChange.bind(this);
        this.handlePhotoIntervalChange = this.handlePhotoIntervalChange.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);
        this.handleToggleGuarding = this.handleToggleGuarding.bind(this);
    }

    handleMemoryChange(elem) {
        const memory = elem.target.value;
        this.setState({memory, toUpload: true})
    }

    handlePhotoIntervalChange(elem) {
        const photoInterval = elem.target.value;
        this.setState({photoInterval, toUpload: true})
    }

    handleUploadClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({toUpload: false});
        axios.post(apiUrl + '/setting/memory?content=' + this.state.memory, {}, headers);
        axios.post(apiUrl + '/setting/photo_interval?content=' + this.state.photoInterval, {}, headers);
    }

    getFlowUrl() {
        if(this.state.recording) {
            axios.get(apiUrl + '/pictures?last=1')
                .then((response) => {
                    this.setState({imgFlow: response.data.path});
                });
        }
        axios.get(apiUrl + '/settings').then(r => {
            this.setState({
                recording: (r.data.recording == true),
                status: r.data.status,
                guarding: (r.data.guarding == true),
                memory: r.data.memory,
                photoInterval: r.data.photo_interval
            });
        });
    }

    componentWillMount() {
        this.getFlowUrl();
        this.timer = setInterval(this.getFlowUrl.bind(this), refreshInterval);
    }

    toggleRecording() {
        axios.post(apiUrl + '/setting/recording?content=' + (0 + !this.state.recording).toString(), {}, headers)
            .then((response) => {
                this.setState({recording: response.data.content == true});
                if (response.data.content == true) {
                    this.timer = setInterval(this.getFlowUrl.bind(this), refreshInterval);
                } else {
                    clearInterval(this.timer);
                }
            });
    }

    handleToggleGuarding(e) {
        e.preventDefault();
        e.stopPropagation();
        axios.post(apiUrl + '/setting/guarding?content=' + (0 + !this.state.guarding).toString(), {}, headers)
            .then((r) => {
                this.setState({guarding: r.data.content == true});
            });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {
        const videoFlow = this.state.imgFlow ?
            <img src={publicUrl + '/images/pool/' + this.state.imgFlow} style={{display:'block', margin: '0 auto', maxWidth: '1080px', width: '100%'}}/> : null;
        const alert = this.state.status === 'not_empty' ? (
            <Message
                error={!this.state.guarding}
                warning={this.state.guarding}
            >
                Quelqu'un est dans la piscine :

                <button className={"btn" + (this.state.guarding ? ' error' : '')} onClick={(e) => this.handleToggleGuarding(e)}>
                    {this.state.guarding ? 'Je ne surveille plus' : 'Je surveille'}
                </button>
            </Message>
        ) : null;
        return (
            <div className="container grid-container">
                <main className="content">
                    {alert}
                    <div className="panel">
                        <div className="panel-heading">Flux</div>
                        <div className="panel-body">
                            {videoFlow}
                        </div>
                    </div>
                    <div style={{marginTop: 20}}/>
                    <button className={"btn " + (this.state.recording ? "error" : "success")}
                            onClick={this.toggleRecording.bind(this)}>
                        <span className="oi" data-glyph="video"/>
                        {this.state.recording ? 'Arrêter' : 'Commencer'} l'observation
                    </button>
                    <div style={{marginTop: 20}}/>
                    <div className="panel dark">
                        <div className="panel-heading">Paramètres</div>
                        <div className="panel-body">
                            <form className="vertical">
                                <div className="form-group">
                                    <label htmlFor="memory">Mémoire</label>
                                    <input onChange={(e) => this.handleMemoryChange(e)} type="number" id="memory"
                                           value={this.state.memory}/> photos
                                </div>
                                <div className="form-group">
                                    <label htmlFor="photo_interval">Temps entre les photos</label>
                                    <input onChange={(e) => this.handlePhotoIntervalChange(e)} type="number"
                                           id="photo_interval" value={this.state.photoInterval}/> s
                                </div>
                                <div className="form-actions">
                                    <button onClick={(e) => this.handleUploadClick(e)} disabled={!this.state.toUpload}
                                            className={"btn" + (this.state.toUpload ? " success" : "")}>
                                        <span className="oi" data-glyph="check"/>
                                        Valider
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
