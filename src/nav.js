import React from 'react';
import { Typography, Toolbar, AppBar, Tabs, Tab, Paper} from '@material-ui/core';
import {DirectionsCar, Receipt} from '@material-ui/icons'


const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        fontFamily: "Roboto"
    }
}

export default class Nav extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value })
        console.log(value);
    }
    render() {
        return (
            <Paper style={{ width: 400 }}>
                <Typography variant = "title" style={{textAlign: 'center'}} className={styles.title}>
                    Aluguel de carros
                </Typography>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    fullWidth
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab icon={<DirectionsCar/>}/>
                    <Tab icon={<Receipt/>}/>
                </Tabs>
            </Paper>
        )
    }
}