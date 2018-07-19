import React from 'react';
import Car from './car'
import { Typography, Toolbar, AppBar, Tabs, Tab, Grid } from '@material-ui/core';
import { DirectionsCar, Receipt } from '@material-ui/icons'
import 'typeface-roboto'
import Login from './login'
import Cloudinary from 'cloudinary'

const carArray = {
    "cars": [
        { "name": "Chevrolet S10", "desc": "Picape Chevrolet com motor de 206cv. Feita para transporte de cargas pequenas", "image": "https://res.cloudinary.com/dgeat0gpw/image/upload/v1531944498/s10.jpg" },
        { "name": "Volkswagen Voyage", "desc": "Sedan com capacidade de 5 pessoas, transmissão manual e com ar condicionado", "image": "https://res.cloudinary.com/dgeat0gpw/image/upload/v1531944499/voyage.jpg" },
        { "name": "Volkswagen Kombi", "desc": "Sedan com capacidade de 5 pessoas, transmissão manual e com ar condicionado", "image": "https://res.cloudinary.com/dgeat0gpw/image/upload/v1531945840/Kombi.jpg" }
    ]
}

Cloudinary.config({
    cloud_name: '#Input with cloud name - present in todo.txt',
    api_key: '#Input with api_key - present in todo.txt',
    api_secret: '#Input with api secret - present in todo.txt'
})

const styles = {
    root: {
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '56.35%'
    },
    carCard: {

        flexDirection: 'row'
    }
}

export default class Nav extends React.Component {
    state = {
        value: 0,
        //value to control top tabs
        auth: false,
        login: '',
        senha: '',
        loginDialog: false, //CHANGE THIS TO TRUE BEFORE SHIPPING IT OUT
        //states that control the user login
        imageUrl: '',
        //control image pointing for sendCar method
    };
    handleChange = (event, value) => {
        this.setState({ value })
    }
    //Change tabs
    handleLoginChange = (event) => {
        this.setState({ login: event.target.value })
    }
    handleSenhaChange = (event) => {
        this.setState({ senha: event.target.value })
    }
    handleLoginDialogClose = () => {
        this.setState({ loginDialog: false })
    }
    handleClickLogin = () => {
        if (this.state.login === 'Cesar' && this.state.senha === '1234') {
            this.setState({ auth: true })
            this.handleLoginDialogClose()
        }
        else {
            alert('Wrong password, try again!')
        }
    }
    handleClickCadastro = () => {
        console.log('Hello World');
    }
    //Login
    sendCars = (data) => {
        let components = []
        for (let i in data.cars) {
            let image = data.cars[i].image
            components[i] = (<Grid item key={i}><Car name={data.cars[i].name} desc={data.cars[i].desc} key={i} image={Cloudinary.url(image)} /></Grid>)
        }
        return components
    }
    //Car Card Handler
    render() {
        const { value } = this.state

        return (
            <div className={styles.root} style={{ paddingTop: 56 }} >
                {!this.state.auth && <Login state={this.state} handleClickCadastro={this.handleClickCadastro} handleClickLogin={this.handleClickLogin} handleLoginChange={this.handleLoginChange} handleSenhaChange={this.handleSenhaChange} handleLoginDialogClose={this.handleLoginDialogClose} />}
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
                {value === 0 &&
                    <Grid container spacing={16} >
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                {this.sendCars(carArray)}
                            </Grid>
                        </Grid>
                    </Grid>
                /*TORNAR RESPONSIVO*/}
                {value === 1 && <React.Fragment>Hellos</React.Fragment>}
            </div>
        )
    }
}
