import React, {Component} from 'react';
import Popup from "./gl/popup/Popup";
import Form from "./gl/form/Form";
import Input from "./gl/form/Input";

export default class Login extends Component
{
    constructor() {
        super();
    }

    render() {
        return (
            <Popup heading="Se connecter">
                <Form submit="Se connecter" onChange={() => {}} onSubmit={(values) => {
                    this.props.onConnect(values.username, values.password);
                }}>
                    <Input id="username" label="Identifiant"/>
                    <Input id="password" type="password" label="Mot de passe"/>
                </Form>
            </Popup>
        );
    }
}
