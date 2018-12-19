import React from 'react';
import { Typography, Toolbar, AppBar, Tabs, Tab, Grid, MenuItem, Snackbar, IconButton, Menu } from '@material-ui/core';
import { DirectionsCar, Receipt, Close, AccountCircle, Storage } from '@material-ui/icons'
import 'typeface-roboto'
import Login from './login'
import Cloudinary from 'cloudinary'
import Rental from './rental'
import Car from './car'
import CadastroU from './cadastro_usuario'
import EdicaoU from './editar_usuario'
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
        email: '',
        userId: 0,
        admin: true, //CHANGE THIS TO FALSE BEFORE SHIPPING IT OUT
        menu: null,
        loginDialog: false, //CHANGE THIS TO TRUE BEFORE SHIPPING IT OUT
        activeStep: 0,
        //state that controls stepper
        snackOpen: false,
        snackMessage: '',
        //states that controls snackbars
        cadastroUDialog: false,
        //States that control the user insertion
        edicaoUDialog: false,
        edicaoStep: 0
        //States that control user manipulation
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
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
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
    //Login
    handleCadastroUOpen = () => {
        this.setState({ 
            cadastroUDialog: true 
        })
    }
    handleCadastroUClose = () => {
        this.setState({
            cadastroUDialog: false,
        })
    }
    //Cadastro Usuario
    handleEdicaoUOpen = () => {
        this.setState({ edicaoUDialog: true })
    }
    handleEdicaoUClose = () => {
        this.setState({ edicaoUDialog: false })
    }
    //Edicao Usuario
    handleCadastroVOpen = () => {
        console.log('Hello World');
    }
    //Cadastro Veiculo
    handleEdicaoVOpen = () => {

    }
    //Edicao Veiculo
    sendCars = () => {
        let validate = this.dataCall('GET', 'http://localhost:90/allVeiculo', null)
        let components = []
        for (let i in validate.car) {
            let image = validate.car[i].imgUrl_veiculo
            components[i] = (<Grid item key={i}><Car
                handleRentalDialogOpen={this.handleRentDialogOpen}
                state={this.state} name={validate.car[i].nome_veiculo}
                desc={validate.car[i].desc_veiculo} key={i} ano={validate.car[i].ano_veiculo} carId={validate.car[i].id_veiculo}
                image={Cloudinary.url(image)} /></Grid>)
        }
        return components

    }
    //Car Card Handler
    handleSnackOpen = (message) => {
        this.setState({snackOpen: true, snackMessage: message})
    }
    handleSnackClose = (reason) => {
        if (reason === 'clickaway') return
        this.setState({ snackOpen: false })
    }
    cleanSlots = () => {
        this.setState({ Slots: Array(25).fill(null) })
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
                                <MenuItem onClick={this.handleCadastroVOpen}>Cadastre um Veículo</MenuItem>
                                <MenuItem onClick={this.handleEdicaoVOpen}>Edite um Veículo</MenuItem>
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
                {value === 1 && <React.Fragment>Hellos</React.Fragment>}
                {value === 2 && <React.Fragment>Hellos</React.Fragment>}
                {/*TABS*/}
                {!this.state.auth && <Login state={this.state}
                    handleClickCadastro={this.handleClickCadastro}
                    handleClickLogin={this.handleClickLogin}
                    handleEmailChange={this.handleEmailChange}
                    handleLoginDialogClose={this.handleLoginDialogClose} />}
                {/*LOGIN*/}
                {this.state.rentalDialog && <Rental
                    dataCall={this.dataCall}
                    handleSnackOpen = {this.handleSnackOpen}
                    handleSnackClose = {this.handleSnackClose}
                //functions
                />}
                {/*RENTAL*/}
                {this.state.cadastroUDialog && (
                    <CadastroU
                        cadastroUDialog={this.state.cadastroUDialog}
                        cadEmail={this.state.cadEmail}
                        cadDepartamento={this.state.cadDepartamento}
                        cadNome={this.state.cadNome}
                        cadAdminCheck={this.state.cadAdminCheck}
                        cadTipoUsuario={this.state.cadTipoUsuario}
                        //states
                        handleCadastroUOpen={this.handleCadastroUOpen}
                        handleCadastroUClose={this.handleCadastroUClose}
                        handleCadastroU={this.handleCadastroU}
                        dataCall={this.dataCall}
                        handleCadastroNomeChange={this.handleCadastroNomeChange}
                        handleCadastroEmailChange={this.handleCadastroEmailChange}
                        handleCadastroDepartamentoChange={this.handleCadastroDepartamentoChange}
                        handleCadastroTipoUsuarioChange={this.handleCadastroTipoUsuarioChange}
                        handleCadastroRamalChange={this.handleCadastroRamalChange}
                        handleCadastroAdminChange={this.handleCadastroAdminChange}
                    //functions
                    />
                )}
                {/* CADASTRO USUARIO */}
                {this.state.edicaoUDialog && (
                    <EdicaoU
                        dataCall = {this.dataCall}
                        handleEdicaoUClose = {this.handleEdicaoUClose}
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
