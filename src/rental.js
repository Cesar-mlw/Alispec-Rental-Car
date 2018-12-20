import React, { Fragment } from 'react';
import { Button, Dialog, DialogTitle, TextField, withStyles, Stepper, StepLabel, Step, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import BR from 'date-fns/locale/pt'

var locacao = null
const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: '4%',
        marginBottom: '4%',

    },
    root: {
        width: '90%'
    },
    button: {
        marginBottom: '4%',
        marginLeft: '4%',
        align: 'center'
    },
    instructions: {
        marginBottom: '4%',
        marginLeft: '4%'
    }
}
const getSteps = () => {
    return ['Horários disponíveis', 'Informações finais e confirmação']
}
class RentalDialog extends React.Component {
    state = {
        activeStep: 0,
        inicioSelect: 0,
        duracaoSelect: 0,
        dataI: new Date(),
        inicio: new Date(),
        termino: new Date(),
        duracao: 0,
        motivo: '',
        motorista: '',
        Slots: Array(25).fill(null)
    }
    
    cleanSlots = () => {
        this.setState({ Slots: Array(25).fill(null) })
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
    handleRentDialogClose = () => {
        this.setState({
            activeStep: 0,
            inicioSelect: 0,
            duracaoSelect: 0,
            dataI: new Date(),
            inicio: new Date(),
            termino: new Date(),
            duracao: 0,
            motivo: '',
            motorista: ''
        })
    }

    handleRentalDataChange = (date) => {
        console.log(date)
        this.setState({ dataI: date })
        this.cleanSlots()
    }
    handleMotoristaChange = (event) => {
        this.setState({ motorista: event.target.value })
    }
    handleMotivoChange = (event) => {
        this.setState({ motivo: event.target.value })
    }
    handleRentalInicioChange = (event) => {
        let inicio = new Date(this.state.dataI.toDateString() + ' ' + event.target.value)
        this.setState({ inicio: inicio, inicioSelect: event.target.value })
        console.log(this.state.inicio)
    }
    handleRentalDuracaoChange = (event) => {
        let termino = new Date(Date.parse(this.state.inicio) + event.target.value)
        this.setState({ duracao: event.target.value, duracaoSelect: event.target.value, termino: termino })
    }
    handleRentalBack = () => {
        const { activeStep } = this.state
        this.setState({ activeStep: activeStep - 1 })
    }

    handleRentalNext = () => {//ADD SNACK HERE
        const { activeStep } = this.state
        if (activeStep === 0 && (this.state.inicioSelect === 0 || this.state.duracaoSelect === 0)) {
            this.props.handleSnackOpen("Por favor, preencha todos os campos antes de proseguir.")
            this.setState({ activeStep: 0})
        }
        else if (activeStep === 1 && (this.state.motivo === '' || this.state.motorista === '')) {
            this.props.handleSnackOpen("Por favor, preencha todos os campos antes de proseguir.")
            this.setState({ activeStep: 1})
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
        console.log(this.props.userId)
        let response = JSON.parse(this.props.dataCall('POST', 'http://localhost:90/insertRental', '{"duracao": "' + duracao + '", "dataI": "' + this.state.dataI.toJSON() + '", "dataT": "' + dataT + '" , "inicio": "' + inicio.toISOString().replace(/T/, ' ').replace(/\..+/, '') + '", "termino": "' + termino.toISOString().replace(/T/, ' ').replace(/\..+/, '') + '", "userId": ' + this.props.userId + ', "veiId": ' + this.props.carId + ', "motivo": "' + this.state.motivo + '", "motorista": "' + this.state.motorista + '"}'))
        if (response === 1) {
            this.props.handleSnackOpen("Aluguel efetuado com sucesso")
            this.setState({ rentalDialog: false, activeStep: 0, inicioSelect: 0, duracaoSelect: 0, })
        }
        else {
            this.props.handleSnackOpen("Ocorreu um Erro, tente novamente")
            this.setState({ activeStep: 0 })
        }// add snack error

    }
    getStepContent = (stepIndex, props) => {
        switch (stepIndex) {
            case 0:
                let dateI = this.state.dataI.toLocaleDateString('en-GB')
                locacao = props.dataCall('POST', 'http://localhost:90/confirmedRental', '{"dataI": "' + dateI + '"}')
                return (
                    <div>
                        <Typography style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }} align={'center'} variant={'title'} color={'inherit'}>Selecione os horários!</Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={BR}>
                            <DatePicker
                                label="Quando você vai precisar dele?"
                                format="DD/MM/YYYY"
                                placeholder="25/03/2018"
                                value={this.state.dataI}
                                onChange={this.handleRentalDataChange}
                                disableOpenOnEnter
                                disablePast
                                style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}
                                animateYearScrolling={false}
                            />
                            <div style={{ alignContent: 'center' }}>
                                <InputLabel style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}>A que horas?</InputLabel>
                                <Select
                                    value={this.state.inicioSelect}
                                    onChange={this.handleRentalInicioChange}
                                    style={{ marginLeft: '4%', marginBottom: '4%', width: '30%' }}
                                >
                                    <MenuItem value={0}><em>hh:mm</em></MenuItem>
                                    {this.sendAvailableHours(locacao)}
                                </Select>
                            </div>
                            <div style={{ alignContent: 'center', flex: 'wrap' }}>
                                <InputLabel style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}>Por Quanto tempo?</InputLabel>
                                <Select
                                    value={this.state.duracaoSelect}
                                    onChange={this.handleRentalDuracaoChange}
                                    style={{ marginLeft: '4%', marginBottom: '4%', width: '30%' }}
                                >
                                    <MenuItem value={0}><em>None</em></MenuItem>
                                    {this.sendAvailableDuration()}
                                </Select>
                            </div>
                        </MuiPickersUtilsProvider>
                    </div>
                )

            case 1:
                return (
                    <div>
                        <Typography align={'center'} variant={'title'} color={'inherit'}>Confirme seus dados!</Typography>

                        <TextField
                            id='motorista_locacao'
                            label='Quem será o motorista?'
                            placeholder='Fernando Pessoa'
                            value={this.state.motorista}
                            onChange={this.handleMotoristaChange}
                            margin='normal'
                            style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                        />
                        <TextField
                            id='motivo_locacao'
                            label='Motivo do aluguel.'
                            multiline
                            placeholder='Buscar peças na Maré'
                            value={this.state.motivo}
                            onChange={this.handleMotivoChange}
                            margin='normal'
                            style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                        />
                    </div>
                )
            default:
                return 'Wrong StepIndex - Contact Cesar and ask him to fix it +55(11)99488-1864, or fix it yourself :3'
        }
    }
    render() {
        const steps = getSteps()
        const { activeStep } = this.state.activeStep
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.rentalDialog}
                    onClose={this.props.handleRentalDialogClose}
                    fullWidth
                    onBackdropClick={this.props.handleRentDialogClose}>
                    <DialogTitle>Rental</DialogTitle>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography align={'center'} variant={'title'} color={'inherit'}>
                                Resumo do Aluguel
                        </Typography>
                            <div>
                                <TextField
                                    id='carro'
                                    label='Motorista'
                                    defaultValue={this.state.motorista}
                                    margin='normal'
                                    style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id='carro'
                                    label='Veículo'
                                    defaultValue={this.props.carName}
                                    margin='normal'
                                    style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id='data'
                                    label='Data'
                                    defaultValue={this.state.dataI.toLocaleDateString('en-GB')}
                                    margin='normal'
                                    style={{ marginLeft: '4%', marginBottom: '2%', width: '30%' }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id='horario_inicio'
                                    label='Início'
                                    defaultValue={this.state.inicio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    margin='normal'
                                    style={{ marginLeft: '4%', marginBottom: '2%', width: '25%' }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id='horario_inicio'
                                    label='Término'
                                    defaultValue={this.state.termino.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    margin='normal'
                                    style={{ marginLeft: '4%', marginBottom: '2%', width: '25%' }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                            <Stepper
                                activeStep={this.state.activeStep} alternativeLabel>
                                {steps.map(label => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    )
                                })}
                            </Stepper>
                            <Button onClick={this.handleClickRental} className={classes.button}>
                                Alugar
                        </Button>
                        </div>
                    ) : (
                            <div>
                                {this.getStepContent(this.state.activeStep, this.props, this.state)}
                                <div>
                                    <Stepper
                                        activeStep={this.state.activeStep} alternativeLabel>
                                        {steps.map(label => {
                                            return (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                </Step>
                                            )
                                        })}
                                    </Stepper>
                                    <Button
                                        disabled={this.state.activeStep === 0}
                                        onClick={this.handleRentalBack}
                                        className={classes.button}
                                    >
                                        Voltar
                            </Button>
                                    <Button className={classes.button} variant='raised' color='primary' onClick={this.handleRentalNext}>
                                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </Dialog>
            </div>
        )
    }
}



export default withStyles(styles)(RentalDialog)
