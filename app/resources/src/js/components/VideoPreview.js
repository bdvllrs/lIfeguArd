import React, {Component} from 'react';

export default class VideoPreview extends Component {
    constructor() {
        super();
    }

    render() {
        const imageSource = this.props.video.lastImage;
        return (
            <div>
                <div className="panel default">
                    <div className="panel-heading">Vidéo</div>
                    <div className="panel-body">
                        <div className="video-preview">
                            <img style={{maxWidth: 720, width: '100%'}} src={imageSource} id="video-holder" />
                        </div>
                    </div>
                </div>
                <div style={{marginTop: 30}} />
                <button className={"btn" + (this.props.active ? ' error': ' success')} onClick={this.props.onToggleStream}>
                    <span className="oi" data-glyph="video" />
                    {this.props.active ? "Arrêter" : "Commencer"} l'observation
                </button>
            </div>
        );
    }
}