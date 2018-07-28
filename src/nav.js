import React from 'react';
import Car from './car'
import { Typography, Toolbar, AppBar, Tabs, Tab, Grid, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import { DirectionsCar, Receipt, Close} from '@material-ui/icons'
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
const locacao = {
    'locacao': [
        { 'id': 1, 'duracao': '02:00:00', 'data': '2018/07/25', 'inicio': '13:00:00', 'termino': '15:00:00', 'usu_id': 1, 'vei_id': 1, 'status': 1 },
        { 'id': 2, 'duracao': '01:00:00', 'data': '2018/07/25', 'inicio': '15:00:00', 'termino': '16:00:00', 'usu_id': 1, 'vei_id': 1, 'status': 1 },
        { 'id': 3, 'duracao': '01:00:00', 'data': '2018/07/25', 'inicio': '18:00:00', 'termino': '19:00:00', 'usu_id': 1, 'vei_id': 1, 'status': 1 }, ,
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
        data: new Date(),
        inicio: new Date(),
        carId: null,
        carName: '',
        activeStep: 0,
        Slots: Array(13).fill(null),
        menuIndex: 14,
        snackOpen: false
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
        //keep user id as a state so you can reference him easily
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
                image={Cloudinary.url(image)} /></Grid>)
        }
        return components
    }
    //Car Card Handler
    handleRentDialogOpen = (number, name) => {
        this.setState({ rentalDialog: true, carId: number, carName: name })
    }
    handleRentDialogClose = () => {
        this.setState({ rentalDialog: false })
    }
    handleRentalDataChange = (date) => {
        console.log(date);
        this.setState({ data: date })
    }
    handleRentalInicioChange = (event) => {
        let inicio = new Date(this.state.data + ' ' + event.target.value + ':00:00')
        this.setState({ inicio: inicio, menuIndex: event.target.value })
        console.log(event.target.value + ':00:00');
    }
    handleRentalBack = () => {
        const { activeStep } = this.state
        this.setState({ activeStep: activeStep - 1 })
    }
    handleRentalNext = () => {
        const { activeStep } = this.state
        if (activeStep == 0 && this.state.menuIndex == 14) {
            this.setState({ activeStep: 0, snackOpen: true })
            return
        }
        this.setState({ activeStep: activeStep + 1 })
    }
    handleClickRental = () => {
        this.setState({ rentalDialog: false, activeStep: 0 })
        alert("You Rented!")
    }
    handleSnackClose = (event, reason) => {
        if(reason === 'clickaway'){
            return
        }
        this.setState({snackOpen: false})
    }
    fillSlots = (loc) => {
        let now = new Date(Date.now())
        let hour = now.getHours()
        let Slot = this.state.Slots
        if (now.getDay() === this.state.data.getDay()) {
            hour = now.getHours()
            for (let i = 0; i <= hour - 8; i++) {
                if (Slot[i] === null) {
                    Slot[i] = 'X'
                }
            }
        }
        else {
            hour = now.getHours()
            for (let i = 0; i <= hour - 8; i++) {
                if (Slot[i] === 'X') {
                    Slot[i] = null
                }
            }
        }
        for (let i in loc.locacao) {
            let inicio = new Date(loc.locacao[i].data + ' ' + loc.locacao[i].inicio).getHours()
            let termino = new Date(loc.locacao[i].data + ' ' + loc.locacao[i].termino).getHours()
            if (termino - inicio > 0) {
                let duracao = new Date(loc.locacao[i].data + ' ' + loc.locacao[i].duracao).getHours()
                let index = inicio - 7
                for (let i = 0; i < duracao; i++) {
                    Slot[index] = 'D'
                    index -= 1
                }
            }
            if (Slot[inicio - 8] === 'T') {
                Slot[inicio - 8] = 'I/T'
            }
            else if (Slot[inicio - 8] === null) {
                Slot[inicio - 8] = 'I'
            }
            if (Slot[termino - 8] === 'I') {
                Slot[termino - 8] = 'I/T'
            }
            else if (Slot[termino - 8] === null) {
                Slot[termino - 8] = 'T'
            }
        }
        console.log(this.state.Slots);
        return null
    }
    sendAvailableHours = (loc) => {
        this.fillSlots(loc)
        let components = []
        let j = 0
        for (let i = 0; i < this.state.Slots.length; i++) {
            if (this.state.Slots[i] === null) {
                components[j] = (<MenuItem value={i + 8} key={i + 8}><em>{i + 8}:00</em></MenuItem>)
                j++
            }
        }
        console.log(components);
        return components
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
                    data={this.state.data}
                    inicio={this.state.inicio}
                    termino={this.state.termino}
                    carId={this.state.carId}
                    carName={this.state.carName}
                    activeStep={this.state.activeStep}
                    handleRentalDialogClose={this.handleRentDialogClose}
                    handleRentalInicioChange={this.handleRentalInicioChange}
                    handleRentalDataChange={this.handleRentalDataChange}
                    handleRentalTerminoChange={this.handleRentalTerminoChange}
                    handleRentalDuracao={this.handleRentalDuracao}
                    handleRentalNext={this.handleRentalNext}
                    handleRentalBack={this.handleRentalBack}
                    handleClickRental={this.handleClickRental}
                    sendAvailableHours={this.sendAvailableHours}
                    menuIndex={this.state.menuIndex}
                />}
                {/*RENTAL*/}

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackOpen}
                    autoHideDuration={3}
                    message={<span>Por favor insira um horário disponível</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleSnackClose}
                        >
                        <Close/>
                        </IconButton>
                            ]}
                        />
                        
            </div>
        )
                }
            }
