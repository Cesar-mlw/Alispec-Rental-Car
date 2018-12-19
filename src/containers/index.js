import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import Nav from './nav'


class Index extends React.Component {
    render() {
        return (
            <Nav />
        )
    }
}




ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
