import React from 'react';
import { Typography, Toolbar, AppBar, Tabs, Tab, Grid, MenuItem, Snackbar, IconButton, Menu, Button } from '@material-ui/core';
import { DirectionsCar, Receipt, Close, AccountCircle, Storage } from '@material-ui/icons'
import 'typeface-roboto'
import Login from './login'
import Cloudinary from 'cloudinary'
import Rental from './rental'
import Car from './car'
import CadastroU from './cadastro_usuario'
import EdicaoU from './editar_usuario'
import MyRental from './myRentals'
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
    },
    filterMenu: {
        marginTop: '4vh'
    }
}

export default class Nav extends React.Component {
    state = {
        value: 0,
        //value to control top tabs
        auth: false,
        userId: 1,
        admin: true, //CHANGE THIS TO FALSE BEFORE SHIPPING IT OUT
        menu: null,
        loginDialog: false, //CHANGE THIS TO TRUE BEFORE SHIPPING IT OUT
        activeStep: 0,
        filterMenu: false,
        filter: 'Confirmado',
        rentals: null,
        //state that controls stepper
        snackOpen: false,
        snackMessage: '',
        //states that controls snackbars
        cadastroUDialog: false,
        //States that control the user insertion
        edicaoUDialog: false,
        edicaoStep: 0,
        //States that control user manipulation
        rentalDialog: false,
        carId: null,
        carName: null
    };

    handleChange = (event, value) => {
        this.setState({ value })
    }
    handleMenuOpen = (event) => {
        this.setState({ menu: event.currentTarget })
    }
    handleMenuClose = () => {
        this.setState({ menu: null })
    }
    //AppBar
    handleLoginDialogClose = () => {
        this.setState({ loginDialog: false })
    }
    handleClickLogin = () => {
        //make text fields better
        let validate = this.dataCall('POST', 'http://localhost:90/validaUsuario', '{"email": "' + this.state.email + '"}')
        if (validate.length === 0) {
            alert("E-mail ou Id errados")
        }
        else {
            if (validate[0].fk_tipo_usuario_id === 1) this.setState({ loginDialog: false, userId: validate[0].id_usuario, admin: true, auth: true, snackOpen: true, snackMessage: 'Seja Bem vindo ' + validate[0].nome_usuario })
            else this.setState({ loginDialog: false, userId: validate[0].id_usuario, auth: true, snackOpen: true, snackMessage: 'Seja Bem vindo ' + validate[0].nome_usuario })
        }
    }
    handleRentalDialogOpen = (carId, name) => {
        this.setState({ rentalDialog: true, carId: carId, carName: name })
    }
    handleRentalDialogClose = () => {
        this.setState({ rentalDialog: false, carId: null, carName: null })
    }
    //Login
    handleCadastroUOpen = () => {
        this.setState({ cadastroUDialog: true })
    }
    handleCadastroUClose = () => {
        this.setState({ cadastroUDialog: false, })
    }
    //Cadastro Usuario
    handleEdicaoUOpen = () => {
        this.setState({ edicaoUDialog: true })
    }
    handleEdicaoUClose = () => {
        this.setState({ edicaoUDialog: false })
    }
    //Edicao Usuario
    handleEdicaoVOpen = () => {
        //implement vehicle edition - difficulty expected -> update the car image on cloudinary
    }
    //Edicao Veiculo
    sendCars = () => {
        let validate = this.dataCall('GET', 'http://localhost:90/allVeiculo', null)
        let components = []
        for (let i in validate.car) {
            let image = validate.car[i].imgUrl_veiculo
            components[i] = (<Grid item key={i}><Car
                handleRentalDialogOpen={this.handleRentalDialogOpen}
                handleRentalDialogClose={this.handleRentalDialogClose}
                state={this.state} carName={validate.car[i].nome_veiculo}
                desc={validate.car[i].desc_veiculo} key={i} ano={validate.car[i].ano_veiculo} carId={validate.car[i].id_veiculo}
                image={Cloudinary.url(image)} /></Grid>)
        }
        return components
    }
    //Car Card Handler
    sendMyRentals = (filter) => {
        let response
        if (filter === "Confirmado") {
            let data = new Object()
            data.status = 1
            data.userId = this.state.userId
            response = this.dataCall("POST", "http://localhost:90/getRentals", JSON.stringify(data))
        }
        else if (filter === "Cancelado") {
            let data = new Object()
            data.status = 2
            data.userId = this.state.userId
            response = this.dataCall("POST", "http://localhost:90/getRentals", JSON.stringify(data))
        }
        else if (filter === "Terminado") {
            let data = new Object()
            data.status = 3
            data.userId = this.state.userId
            response = this.dataCall("POST", "http://localhost:90/getRentals", JSON.stringify(data))
        }
        else {
            let data = new Object()
            data.userId = this.state.userId
            response = this.dataCall("POST", "http://localhost:90/allRentals", JSON.stringify(data))
        }
        console.log(response);
        this.setState({
            rentals: response,
            filter: filter,
            filterMenu: false
        })
        
    }
    buildComponents = () => {
        if(this.state.rentals === null){
            let data = new Object()
            data.status = 1
            data.userId = this.state.userId
            let response = this.dataCall("POST", "http://localhost:90/getRentals", JSON.stringify(data))
            let components = []
            for (let i in response) {
                components[i] = (<MyRental sendMyRentals={this.sendMyRentals} dataCall = {this.dataCall} key={i} id={response[i].id_locacao} car={response[i].nome_veiculo} inicio={response[i].inicio_locacao} termino={response[i].termino_locacao} motivo={response[i].motivo_locacao} motorista={response[i].motorista_locacao} status={response[i].nome_status} />)
            }
            return components
        }
        else{
            let components = []
            for (let i in this.state.rentals) {
                components[i] = (<MyRental dataCall = {this.dataCall} sendMyRentals={this.sendMyRentals} key={i} id={this.state.rentals[i].id_locacao} car={this.state.rentals[i].nome_veiculo} inicio={this.state.rentals[i].inicio_locacao} termino={this.state.rentals[i].termino_locacao} motivo={this.state.rentals[i].motivo_locacao} motorista={this.state.rentals[i].motorista_locacao} status={this.state.rentals[i].nome_status} />)
            }
            return components
        }
    }
    handleFilterMenuChange = () => {
        let filterMenu = this.state.filterMenu
        this.setState({
            filterMenu: !filterMenu,
        })
    }
    //My Rentals Handler
    handleSnackOpen = (message) => {
        this.setState({ snackOpen: true, snackMessage: message })
    }
    handleSnackClose = (reason) => {
        if (reason === 'clickaway') return
        this.setState({ snackOpen: false })
    }
    dataCall = (method, url, data) => {
        let call = new XMLHttpRequest()
        let response = null
        call.open(method, url, false)
        call.setRequestHeader('Content-type', 'application/json')
        call.onload = () => {
            if (call.status === 200 && call.readyState === 4) {
                response = JSON.parse(call.responseText)
            }
        }
        if (method === 'POST') call.send(data)
        else call.send()
        return response
    }
    render() {
        const { value } = this.state
        const open = Boolean(this.state.menu)
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
                            <Tab label="Meus Aluguéis" icon={<Receipt />} />
                            {this.state.admin && (<Tab label='Analytics' icon={<Storage />} />)}
                        </Tabs>

                        {this.state.admin && (<div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                arai-haspopup='true'
                                onClick={this.handleMenuOpen}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={this.state.menu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleMenuClose}
                            >
                                <MenuItem onClick={this.handleCadastroUOpen}>Cadastre um Usuário</MenuItem>
                                <MenuItem onClick={this.handleEdicaoUOpen}>Edite um Usuário</MenuItem>
                            </Menu>
                        </div>)}
                    </Toolbar>
                </AppBar>
                {/*TABS*/}
                {value === 0 &&
                    <Grid container spacing={16} >
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                {this.sendCars()}
                            </Grid>
                        </Grid>
                    </Grid>
                }
                {value === 1 && (
                    <div>
                        <div>
                            <div>
                                <Menu open={this.state.filterMenu} onClose={this.handleFilterMenuChange}  >
                                    <MenuItem onClick={() => this.sendMyRentals("Confirmado")}>Confirmados</MenuItem>
                                    <MenuItem onClick={() => this.sendMyRentals("Cancelado")}>Cancelados</MenuItem>
                                    <MenuItem onClick={() => this.sendMyRentals("Terminado")}>Terminados</MenuItem>
                                    <MenuItem onClick={() => this.sendMyRentals("Todo")}>Todos</MenuItem>
                                </Menu>
                            </div>
                            <Button onClick={this.handleFilterMenuChange} style={{ marginTop: '4vh' }} variant='outlined'>
                                Filtros
                            </Button>
                        </div>
                        <div>
                            {this.buildComponents()}
                        </div>
                    </div>
                )}
                {value === 2 && <React.Fragment>Hellos</React.Fragment>}
                {/*TABS*/}
                {!this.state.auth && <Login state={this.state}
                    handleClickLogin={this.handleClickLogin}
                    handleLoginDialogClose={this.handleLoginDialogClose} />}
                {/*LOGIN*/}
                {this.state.rentalDialog && <Rental
                    rentalDialog={this.state.rentalDialog}
                    handleRentalDialogClose={this.handleRentalDialogClose}
                    carId={this.state.carId}
                    carName={this.state.carName}
                    dataCall={this.dataCall}
                    handleSnackOpen={this.handleSnackOpen}
                    handleSnackClose={this.handleSnackClose}
                    userId={this.state.userId}
                />}
                {/*RENTAL*/}
                {this.state.cadastroUDialog && (
                    <CadastroU
                        cadastroUDialog={this.state.cadastroUDialog}
                        //states
                        handleCadastroUOpen={this.handleCadastroUOpen}
                        handleCadastroUClose={this.handleCadastroUClose}
                        dataCall={this.dataCall}
                        handleSnackOpen={this.handleSnackOpen}
                        handleSnackClose={this.handleSnackClose}
                    //functions
                    />
                )}
                {/* CADASTRO USUARIO */}
                {this.state.edicaoUDialog && (
                    <EdicaoU
                        edicaoUDialog={this.state.edicaoUDialog}
                        dataCall={this.dataCall}
                        handleEdicaoUClose={this.handleEdicaoUClose}
                        handleSnackOpen={this.handleSnackOpen}
                    />
                )}
                {/* EDICAO USUARIO */}
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackOpen}
                    autoHideDuration={2500}
                    onClose={this.handleSnackClose}
                    message={<span>{this.state.snackMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleSnackClose}
                        >
                            <Close />
                        </IconButton>
                    ]}
                />
            </div>
        )
    }
}
