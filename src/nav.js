import React from 'react';
import Car from './car'
import { Typography, Toolbar, AppBar, Tabs, Tab, IconButton, Drawer, ListItemIcon, ListItemText, List, ListItem, Divider } from '@material-ui/core';
import { DirectionsCar, Receipt, Menu } from '@material-ui/icons'
import 'typeface-roboto'

function TabContainer(props) {
    return (
        props.children
    );
}

const styles = {
    root: {
        flexGrow: 1,
    },
    listRoot: {
        width: '100%',
        maxWidth: 360,
    }
}

export default class Nav extends React.Component {
    state = {
        value: 0,
        drawer: false
    };

    handleChange = (event, value) => {
        this.setState({ value })
    }
    handleDrawerOpen = () => {
        this.setState({ drawer: true })
    }
    handleDrawerClose = () => {
        this.setState({ drawer: false })
    }
    render() {
        const { classes } = this.props
        const { value } = this.state
        return (
            <div className={styles.root} style={{ paddingTop: 56 }}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Typography variant='title' className={styles.titulo} color='inherit'>
                            RentAlspec
                        </Typography>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor='secondary'
                            textColor='inherit'
                            fullWidth
                            style={{ marginLeft: 30 }}
                        >
                            <Tab label="Carros Disponíveis" icon={<DirectionsCar />} />
                            <Tab label="Meus aluguéis" icon={<Receipt />} />
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {value === 0 && <div><Car /></div>}
                {value === 1 && <div>Hellos</div>}
            </div>
        )
    }
}
