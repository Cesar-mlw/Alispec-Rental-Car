import React from 'react';
import Car from './car'
import { Typography, Toolbar, AppBar, Tabs, Tab, Grid } from '@material-ui/core';
import { DirectionsCar, Receipt } from '@material-ui/icons'
import 'typeface-roboto'
import Login from './login'
import Cloudinary from 'cloudinary'
import Rental from './rental'
import car from './car';

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
        rentalDialog: false,
        email: '',
        duracao: '',
        inicio: '',
        termino: '',
        carId: null,
        carName: '',
        activeStep: 0
        //States that constrol the registry of rentals
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
            components[i] = (<Grid item key={i}><Car
                handleRentalDialogOpen={this.handleRentDialogOpen}
                state={this.state} name={data.cars[i].name}
                desc={data.cars[i].desc} key={i} carId={i}
                image={Cloudinary.url(image)}/></Grid>)
        }
        return components
    }
    //Car Card Handler
    handleRentDialogOpen = (number, name) => {
        this.setState({ rentalDialog: true , carId: number, carName: name})
    }
    handleRentDialogClose = () => {
        this.setState({ rentalDialog: false })
    }
    handleRentalInicioChange = (event) => {
        this.setState({inicio: event.target.value})
    }
    handleRentalTerminoChange = (event) => {
        this.setState({termino: event.target.value})
    }
    handleRentalDuracaoChange = (event) => {
        this.setState({duracao: event.target.value})
    }
    handleRentalBack = () => {
        const { activeStep } = this.state
        this.setState({activeStep: activeStep - 1})
    }
    handleRentalNext = () => {
        console.log('Working');
        const { activeStep } = this.state
        this.setState({activeStep: activeStep + 1})
    }
    handleClickRental = () => {
        this.setState({rentalDialog: false ,activeStep: 0})
        alert("You Rented!")
    }
    render() {
        const { value } = this.state

        return (
            <div className={styles.root} style={{ paddingTop: 56 }} >
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
                }
                {value === 1 && <React.Fragment>Hellos</React.Fragment>}
                {/*TABS*/}
                {!this.state.auth && <Login state={this.state}
                    handleClickCadastro={this.handleClickCadastro}
                    handleClickLogin={this.handleClickLogin}
                    handleLoginChange={this.handleLoginChange}
                    handleSenhaChange={this.handleSenhaChange}
                    handleLoginDialogClose={this.handleLoginDialogClose} />}
                {/*LOGIN*/}
                {this.state.rentalDialog && <Rental
                    rentalDialog={this.state.rentalDialog} 
                    email={this.state.email}
                    duracao={this.state.duracao}
                    inicio={this.state.inicio}
                    termino={this.state.termino}
                    carId={this.state.carId}
                    carName={this.state.carName}
                    activeStep={this.state.activeStep}
                    handleRentalDialogClose = {this.handleRentDialogClose}
                    handleRentalInicioChange={this.handleRentalInicioChange}
                    handleRentalTerminoChange={this.handleRentalTerminoChange}
                    handleRentalDuracaoChange={this.handleRentalDuracaoChange}
                    handleRentalNext={this.handleRentalNext}
                    handleRentalBack={this.handleRentalBack}
                    handleClickRental = {this.handleClickRental}
                    />}
                {/*RENTAL*/}
            </div>
        )
    }
}
