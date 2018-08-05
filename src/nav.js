import React from 'react';
import { Typography, Toolbar, AppBar, Tabs, Tab, Grid, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import { DirectionsCar, Receipt, Close } from '@material-ui/icons'
import 'typeface-roboto'
import Login from './login'
import Cloudinary from 'cloudinary'
import Rental from './rental'
import Car from './car'
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
        email: '',
        senha: '',
        userId: 0,
        loginDialog: true, //CHANGE THIS TO TRUE BEFORE SHIPPING IT OUT
        //states that control the user login
        rentalDialog: false,
        duracao: 0,
        dataI: new Date(),
        inicio: new Date(),
        termino: new Date(),
        carId: 0,
        carNome: '',
        motivo: '',
        motorista: '',
        Slots: Array(25).fill(null),
        inicioSelect: 0,
        duracaoSelect: 0,
        //States that constrol the registry of rentals
        activeStep: 0,
        //state that controls stepper
        snackOpen: false,
        snackMessage: ''
        //states that controls snackbars
    };
    //Change tabs
    handleChange = (event, value) => {
        this.setState({ value })
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    handleSenhaChange = (event) => {
        this.setState({ senha: event.target.value })
    }
    handleLoginDialogClose = () => {
        this.setState({ loginDialog: false })
    }
    handleClickLogin = () => {
        //make text fields better
        let validate = JSON.parse(this.dataCall('POST', 'http://localhost:90/validaUsuario', '{"email": "' + this.state.email + '", "senha": "' + this.state.senha + '"}'))
        if (validate.length === 0) {
            alert("E-mail ou Senha errada")
        }
        else {
            this.setState({ loginDialog: false, userId: validate[0].id_usuario, auth: true })
        }
    }
    handleClickCadastro = () => {
        console.log('Hello World');
    }
    //Login
    sendCars = () => {
        let components = []
        let validate = JSON.parse(this.dataCall('GET', 'http://localhost:90/allVeiculo', null))
        for (let i in validate.car) {
            let image = validate.car[i].imgUrl_veiculo
            components[i] = (<Grid item key={i}><Car
                handleRentalDialogOpen={this.handleRentDialogOpen}
                state={this.state} name={validate.car[i].nome_veiculo}
                desc={validate.car[i].desc_veiculo} key={i} ano={validate.car[i].ano_veiculo} carId={validate.car[i].id_veiculo}
                image={Cloudinary.url(image)}/></Grid>)
        }
        return components
    }
    //Car Card Handler
    handleRentDialogOpen = (number, name) => {
        this.setState({ rentalDialog: true, carId: number, carNome: name })

    }
    handleRentDialogClose = () => {
        this.setState({ rentalDialog: false, 
                        activeStep: 0,  
                        inicioSelect: 0, 
                        duracaoSelect: 0, 
                        dataI: new Date(), 
                        inicio: new Date(), 
                        termino: new Date(), 
                        duracao: 0,
                        motivo: '',
                        motorista: ''})
    }

    handleRentalDataChange = (date) => {
        this.setState({ dataI: date })
        this.cleanSlots()
    }
    handleMotoristaChange = (event) => {
        this.setState({motorista: event.target.value})
    }
    handleMotivoChange = (event) => {
        this.setState({motivo: event.target.value})
    }
    handleRentalInicioChange = (event) => {
        let inicio = new Date(this.state.dataI.toDateString() + ' ' + event.target.value)
        this.setState({ inicio: inicio, inicioSelect: event.target.value })
    }
    handleRentalDuracaoChange = (event) => {
        let termino = new Date(Date.parse(this.state.inicio) + event.target.value)
        this.setState({ duracao: event.target.value, duracaoSelect: event.target.value, termino: termino })
    }
    handleRentalBack = () => {
        const { activeStep } = this.state
        this.setState({ activeStep: activeStep - 1 })
    }

    handleRentalNext = () => {
        const { activeStep } = this.state
        if (activeStep === 0 && (this.state.inicioSelect === 0 || this.state.duracaoSelect === 0)) {
            this.setState({ activeStep: 0, snackOpen: true, snackMessage: 'Por favor, preencha todos os campos antes de proseguir.' })
        }
        else if (activeStep === 1 && (this.state.motivo === '' || this.state.motorista === '')) {
            this.setState({ activeStep: 1, snackOpen: true, snackMessage: 'Por favor, preencha todos os campos antes de proseguir.' })
        }
        else this.setState({ activeStep: activeStep + 1 })
    }
    handleClickRental = () => {
        let termino = new Date(Date.parse(this.state.inicio) + this.state.duracao)
        let dataT = termino.toLocaleDateString('en-US')
        let inicio = new Date(this.state.inicio.getTime() - this.state.inicio.getTimezoneOffset() * 60000)
        let duracao = this.state.duracao / 3600000
        if (duracao === 0.5) duracao = '00:30:00'
        else if (duracao === 1) duracao = '01:00:00'
        else if (duracao === 1.5) duracao = '01:30:00'
        else if (duracao === 2) duracao = '02:00:00'
        else if (duracao === 6) duracao = '06:00:00'
        else if (duracao === 8) duracao = '08:00:00'
        else if (duracao === 12) duracao = '12:00:00'
        else duracao = '24:00:00'
        let response = JSON.parse(this.dataCall('POST', 'http://localhost:90/insertRental', '{"duracao": "' + duracao + '", "dataI": "' + this.state.dataI.toJSON() + '", "dataT": "' + dataT + '" , "inicio": "' + inicio.toISOString().replace(/T/, ' ').replace(/\..+/, '') + '", "termino": "' + termino.toISOString().replace(/T/, ' ').replace(/\..+/, '') + '", "userId": ' + this.state.userId + ', "veiId": ' + this.state.carId + ', "motivo": "'+this.state.motivo+'", "motorista": "'+this.state.motorista+'"}'))
        if (response === 1) this.setState({ rentalDialog: false, activeStep: 0, inicioSelect: 0, duracaoSelect: 0, snackMessage: 'Aluguel feito com Sucesso!', snackOpen: true })
        else this.setState({ activeStep: 0, snackMessage: 'Ocorreu um Erro, Tente Novamente', snackOpen: true })

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
        console.log(data);
        call.onreadystatechange = () => {
            if (call.readyState === 4 && call.status === 200) {
                response = call.responseText
            }
        }
        call.open(method, url, false)
        call.setRequestHeader('Content-type', 'application/json')
        if (method === 'POST') call.send(data)
        else call.send()
        return response
    }
    fillSlots = (loc) => {
        let now = new Date(Date.now())
        let hour = now.getHours()
        let Slot = this.state.Slots

        if (now.getDate() === this.state.dataI.getDate()) {
            for (let i = 0; i <= (hour - 8) * 2; i++) {
                if (Slot[i] === null) {
                    Slot[i] = 'X'
                }
            }
        }
        else {
            for (let i = 0; i <= (hour - 8) * 2; i++) {
                if (Slot[i] === 'X') {
                    Slot[i] = null
                }
            }
        }
        //HOURS ALREADY PASSED
        for (let i in loc.locacao) {
            let inicio = new Date(loc.locacao[i].inicio_locacao)
            let termino = new Date(loc.locacao[i].termino_locacao)
            let index = 0
            if (inicio.getDate() === termino.getDate()) {
                if (inicio.getMinutes() === 30 && termino.getMinutes() === 0) {
                    index = ((termino.getHours() - 8) * 2)
                    if (Slot[index] === 'I') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'T'
                    }
                    index = ((inicio.getHours() - 8) * 2) + 1
                    if (Slot[index] === 'T') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'I'
                    }
                }
                else if (termino.getMinutes() === 30 && inicio.getMinutes() === 0) {
                    index = ((termino.getHours() - 8) * 2) + 1
                    if (Slot[index] === 'I') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'T'
                    }
                    index = ((inicio.getHours() - 8) * 2)
                    if (Slot[index] === 'T') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'I'
                    }
                }
                else if (inicio.getMinutes() === 30 && termino.getMinutes() === 30) {
                    index = ((termino.getHours() - 8) * 2) + 1
                    if (Slot[index] === 'I') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'T'
                    }
                    index = ((inicio.getHours() - 8) * 2) + 1
                    if (Slot[index] === 'T') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'I'
                    }

                }
                else {
                    index = (termino.getHours() - 8) * 2
                    if (Slot[index] === 'I') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'T'
                    }
                    index = (inicio.getHours() - 8) * 2

                    if (Slot[index] === 'T') {
                        Slot[index] = 'I/T'
                    }
                    else {
                        Slot[index] = 'I'
                    }
                }
                if (termino.getHours() - inicio.getHours() > 0) {
                    let duracao = new Date(loc.locacao[i].data_inicio_locacao + ' ' + loc.locacao[i].duracao_locacao).getHours() * 2
                    index += 1
                    for (let i = 0; i < duracao; i++) {
                        if (Slot[index] !== 'I' && Slot[index] !== 'T' && Slot[index] !== 'I/T') {
                            Slot[index] = 'D'
                        }
                        index += 1
                    }
                }
            }
            else if (inicio.getDate() < termino.getDate()) {
                if (termino.getDate() === this.state.dataI.getDate()) {
                    if (termino.getMinutes() === 30) {
                        index = ((termino.getHours() - 8) * 2) + 1
                        if (Slot[index] === 'I') {
                            Slot[index] = 'I/T'
                        }
                        else {
                            Slot[index] = 'T'
                        }
                    }
                    else {
                        index = (termino.getHours() - 8) * 2
                        if (Slot[index] === 'I') {
                            Slot[index] = 'I/T'
                        }
                        else {
                            Slot[index] = 'T'
                        }
                    }
                    for (let i = 0; i < index; i++) {
                        if (Slot[i] !== 'I' && Slot[i] !== 'T' && Slot[i] !== 'I/T') {
                            Slot[i] = 'D'
                        }
                    }
                }
                else if (inicio.getDate() === this.state.dataI.getDate()) {
                    if (inicio.getMinutes() === 30) {
                        index = ((inicio.getHours() - 8) * 2) + 1
                        if (Slot[index] === 'T') {
                            Slot[index] = 'I/T'
                        }
                        else {
                            Slot[index] = 'I'
                        }
                    }
                    else {
                        index = (inicio.getHours() - 8) * 2
                        if (Slot[index] === 'T') {
                            Slot[index] = 'I/T'
                        }
                        else {
                            Slot[index] = 'I'
                        }

                    }
                    for (let i = index; i < Slot.length; i++) {
                        if (Slot[i] !== 'I' && Slot[i] !== 'T' && Slot[i] !== 'I/T') {
                            Slot[i] = 'D'
                        }
                    }
                }
            }
            //OCUPY SLOTS
        }
        console.log(this.state.Slots);
    }
    sendAvailableDuration = () => {
        let components = [(<MenuItem value={1800000} key={0}>30 minutos</MenuItem>), (<MenuItem value={3600000} key={1}>1 hora</MenuItem>), (<MenuItem value={5400000} key={2}>1 hora e meia</MenuItem>), (<MenuItem value={7200000} key={3}>2 horas</MenuItem>), (<MenuItem value={21600000} key={4}>6 horas</MenuItem>), (<MenuItem value={28800000} key={5}>8 horas</MenuItem>)]
        let index = 0
        if (this.state.inicio.getMinutes() === 30) { index = ((this.state.inicio.getHours() - 8) * 2) + 1 }
        else { index = ((this.state.inicio.getHours() - 8) * 2) }
        let fhour = 0 // counter of free hours ahead of start 
        for (let i = index + 1; i < this.state.Slots.length; i++) {
            if (this.state.Slots[i] === null) {
                fhour += 1
            }
            else {
                break
            }
        }
        if (fhour <= 4) {
            for (let i = 7; i >= fhour; i--) {
                components[i] = null
            }
        }
        if (fhour >= 4) {
            if (fhour < 12) {
                components[4] = null
                components[5] = null
            }
            else if (fhour < 16) {
                components[5] = null
            }
        }
        return components

    }
    sendAvailableHours = (loc) => {
        this.fillSlots(loc)
        let components = []
        let j = 0
        let label = 0
        for (let i = 0; i < this.state.Slots.length; i++) {
            if ((this.state.Slots[i] === null && this.state.Slots[i + 1] === null) || (this.state.Slots[i] === null && i === 24)) {
                label = i / 2 + 8
                if (i % 2 === 0) {
                    components[j] = (<MenuItem value={label + ':00:00'} key={i}><em>{label}:00</em></MenuItem>)
                    j++
                }
                else {
                    label = Math.floor(label)
                    components[j] = (<MenuItem value={label + ':30:00'} key={i}><em>{label}:30</em></MenuItem>)
                    j++
                }
            }
        }
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
                    handleEmailChange={this.handleEmailChange}
                    handleSenhaChange={this.handleSenhaChange}
                    handleLoginDialogClose={this.handleLoginDialogClose} />}
                {/*LOGIN*/}
                {this.state.rentalDialog && <Rental
                    rentalDialog={this.state.rentalDialog}
                    email={this.state.email}
                    duracao={this.state.duracao}
                    dataI={this.state.dataI}
                    termino = {this.state.termino}
                    inicio={this.state.inicio}
                    carId={this.state.carId}
                    carName={this.state.carName}
                    activeStep={this.state.activeStep}
                    handleRentalDialogClose={this.handleRentDialogClose}
                    handleRentalInicioChange={this.handleRentalInicioChange}
                    handleRentalDataChange={this.handleRentalDataChange}
                    handleRentalDuracaoChange={this.handleRentalDuracaoChange}
                    handleRentalDuracao={this.handleRentalDuracao}
                    handleRentalNext={this.handleRentalNext}
                    handleRentalBack={this.handleRentalBack}
                    handleClickRental={this.handleClickRental}
                    sendAvailableHours={this.sendAvailableHours}
                    inicioSelect={this.state.inicioSelect}
                    duracaoSelect={this.state.duracaoSelect}
                    dataCall={this.dataCall}
                    sendAvailableDuration={this.sendAvailableDuration}
                    motivo={this.state.motivo}
                    motorista={this.state.motorista}
                    handleMotoristaChange = {this.handleMotoristaChange}
                    handleMotivoChange = {this.handleMotivoChange}
                    carNome = {this.state.carNome}
                    handleRentalDialogExit = {this.handleRentalDialogExit}
                />}
                {/*RENTAL*/}

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
