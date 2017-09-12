import React, {Component} from 'react';
import Form from "./gl/form/Form";
import Input from "./gl/form/Input";

export default class Settings extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="panel dark">
                <div className="panel-heading">Paramètres</div>
                <div className="panel-body">
                    <form className="vertical">
                        <div className="form-group">
                            <label>Mémoire</label>
                            <input type="number" value={this.props.settings.memory} min="0"
                                   onChange={(e) => this.props.onChange('memory', e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Temps entre les images</label>
                            <input type="number" value={this.props.settings.photo_interval} min="0"
                                   onChange={(e) => this.props.onChange('photo_interval', e.target.value)}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
