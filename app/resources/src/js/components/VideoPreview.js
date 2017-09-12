import React, {Component} from 'react';

export default class VideoPreview extends Component {
    constructor() {
        super();
    }

    render() {
        const imageSource = this.props.video.lastImage;
        return (
            <div>
                <h1>Vidéo</h1>
                <button className={"btn" + (this.props.active ? ' error': ' success')} onClick={this.props.onToggleStream}>
                    <span className="oi" data-glyph="video" />
                    {this.props.active ? "Arrêter" : "Commencer"} l'observation
                </button>
                <div className="panel default">
                    <div className="panel-heading">Vidéo</div>
                    <div className="panel-body">
                        <div className="video-preview">
                            <img width="720" height="480" src={imageSource} id="video-holder" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}