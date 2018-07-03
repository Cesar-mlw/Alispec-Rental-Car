import React from 'react';
import Car from './car'
import Rental from './rental'
import { Typography, Toolbar, AppBar, Tabs, Tab } from '@material-ui/core';
import { DirectionsCar, Receipt } from '@material-ui/icons'
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
}

export default class Nav extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value })
    }
    render() {
        const { classes } = this.props
        const { value } = this.state
        return (
            <div className={styles.root}  style={{ paddingTop: 56 }}>
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
                            style={{marginLeft: 30}}
                        >
                            <Tab label="Carros Disponíveis" icon={<DirectionsCar />} />
                            <Tab label="Meus aluguéis" icon={<Receipt />} />
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {value === 0 && <TabContainer><Car/></TabContainer>}
                {value === 1 && <TabContainer><Rental/></TabContainer>}
            </div>
        )
    }  
}



