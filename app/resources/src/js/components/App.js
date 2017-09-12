import React, {Component} from 'react';
import io from 'socket.io-client';
import VideoPreview from "./VideoPreview";
import Settings from "./Settings";
import Login from "./Login";
import {Link, Route} from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.socket = io.connect();
        this.state = {
            loggingIn: true,
            isRecording: false,
            user: {
                username: '',
                password: ''
            },
            settings: {
                memory: 3,
                photo_interval: 10,
                status: 'unused'
            },
            video: {
                lastImage: "",
                images: []
            }
        };

        this.socket.on('loginReply', (res) => {
            if(res === 'ok') {
                this.setState({loggingIn:false});
            } else {
                alert('Mot de passe incorrect.');
            }
        });

        this.socket.on('settingsNeededReply', (settings) => {
            this.setState({settings})
        });

        this.socket.on('settingsUpdatedReply', ({id, content}) => {
           let settings = this.state.settings;
           settings[id] = content;
           this.setState({settings});
        });

        this.socket.on('imageTaken', data => {
            let video = this.state.video;
            video.lastImage = 'data:image/jpeg;base64,' + data.buffer;
            this.setState({video});
        });

        this.socket.on('isRecordingInfo', val => {
            this.setState({isRecording:val});
        });
    }

    render() {
        const component = this.state.loggingIn ?
            (<Login onConnect={(username, password) => {
                this.socket.emit('login', {username, password});
                this.socket.emit('settingsNeeded');
            }}/>) : (
                <div>
                    <Route exact path="/" render={props => (
                        <VideoPreview {...props} video={this.state.video} active={this.state.settings.isRecording} onClick={() => {
                            this.socket.emit('isRecordingUpdated', !this.state.isRecording);
                        }}/>
                    )} />
                    <Route path="/settings" render={props => (
                        <Settings {...props} settings={this.state.settings} onChange={(id, content, success, message) => {
                            let settings = this.state.settings;
                            settings[id] = content;
                            this.setState({settings});
                            if(content !== '' && !isNaN(content))
                                this.socket.emit('settingsUpdated', {id, content})
                        }} />
                    )} />
                </div>
            );

        return (
            <div className="container grid-container">
                <nav className="navbar">
                    <a href="#" className="logo">
                    </a>
                    <ul className="menu">
                        <li><Link to="/"><span className="oi" data-glyph="video" />Vidéo</Link></li>
                        <li><Link to="/users"><span className="oi" data-glyph="people" />Utilisateurs</Link></li>
                        <li><Link to="/settings"><span className="oi" data-glyph="cog" />Paramètres</Link></li>
                    </ul>
                </nav>
                <main className="content">
                    {component}
                </main>
            </div>
        );
    }
}
