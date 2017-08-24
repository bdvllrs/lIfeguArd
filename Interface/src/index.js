import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';


if(document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
