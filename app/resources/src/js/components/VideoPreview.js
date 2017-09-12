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
                <div className="video-preview">
                    <img width="720" height="480" src={imageSource} id="video-holder" />
                </div>
            </div>
        );
    }
}