import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Nav from './containers/nav'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme()

class Index extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Nav />
            </MuiThemeProvider>
        )
    }
}




ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
