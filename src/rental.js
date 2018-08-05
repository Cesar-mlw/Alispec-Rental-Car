import React, { Fragment } from 'react';
import { Button, Dialog, DialogTitle, TextField, withStyles, Stepper, StepLabel, Step, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
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
const getStepContent = (stepIndex, props) => {
    switch (stepIndex) {
        case 0: //Fazer if para saber se tem horario, se nao tiver coloca uma tela para avisar que nao tem horario
            let dateI = props.dataI.toLocaleDateString('en-GB')
            locacao = JSON.parse(props.dataCall('POST','http://localhost:90/confirmedRental', '{"dataI": "'+dateI+'"}'))
            
            return (
                <div>
                <Typography style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }} align={'center'} variant={'title'} color={'inherit'}>Selecione os horários!</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={BR}>
                    <DatePicker
                        label="Quando você vai precisar dele?"
                        format="DD/MM/YYYY"
                        placeholder="25/03/2018"
                        value={props.dataI}
                        onChange={props.handleRentalDataChange}
                        disableOpenOnEnter
                        disablePast
                        style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}
                        animateYearScrolling={false}
                    />
                    <div style={{ alignContent: 'center' }}>
                        <InputLabel style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}>A que horas?</InputLabel>
                        <Select
                            value={props.inicioSelect}
                            onChange={props.handleRentalInicioChange}
                            style={{ marginLeft: '4%', marginBottom: '4%', width: '30%' }}
                        >
                            <MenuItem value={0}><em>hh:mm</em></MenuItem>
                            {props.sendAvailableHours(locacao)}
                        </Select>
                    </div>
                    <div style={{ alignContent: 'center', flex: 'wrap'}}>
                        <InputLabel style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}>Por Quanto tempo?</InputLabel>
                        <Select
                            value={props.duracaoSelect}
                            onChange={props.handleRentalDuracaoChange}
                            style={{ marginLeft: '4%', marginBottom: '4%', width: '30%' }}
                        >
                            <MenuItem value={0}><em>None</em></MenuItem>
                            {props.sendAvailableDuration()}
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
                        value={props.motorista}
                        onChange={props.handleMotoristaChange}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                    />
                    <TextField
                        id='motivo_locacao'
                        label='Motivo do aluguel.'
                        multiline
                        placeholder='Buscar peças na Maré'
                        value={props.motivo}
                        onChange={props.handleMotivoChange}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                    />
                </div>
            )
        default:
            return 'Wrong StepIndex - Contact Cesar and ask him to fix it (11)99488-1864, or fix it yourself :3'
    }
}
const RentalDialog = (props) => {
    const steps = getSteps()
    const { activeStep } = props.activeStep
    const { classes } = props
    return (
        <div className={classes.root}>
            <Dialog
                open={props.rentalDialog}
                onClose={props.handleRentalDialogClose}
                fullWidth>
                <DialogTitle>Rental</DialogTitle>
                {props.activeStep === steps.length ? (
                    <div>
                        <Typography align={'center'} variant={'title'} color={'inherit'}>
                            Resumo do Aluguel 
                        </Typography>
                        <div>
                        <TextField
                        id='carro'
                        label='Motorista'
                        defaultValue={props.motorista}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                        <TextField
                        id='carro'
                        label='Veículo'
                        defaultValue={props.carNome}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id='data'
                        label='Data'
                        defaultValue={props.dataI.toLocaleDateString('en-GB')}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '30%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id='horario_inicio'
                        label='Início'
                        defaultValue={props.inicio.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '25%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id='horario_inicio'
                        label='Término'
                        defaultValue={props.termino.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '25%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                        </div>
                        <Stepper
                            activeStep={props.activeStep} alternativeLabel>
                            {steps.map(label => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                        <Button onClick={props.handleClickRental} className={classes.button}>
                            Alugar
                        </Button>
                    </div>
                ) : (
                        <div>
                            {getStepContent(props.activeStep, props)}
                            <div>
                                <Stepper
                                    activeStep={props.activeStep} alternativeLabel>
                                    {steps.map(label => {
                                        return (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        )
                                    })}
                                </Stepper>
                                <Button
                                    disabled={props.activeStep === 0}
                                    onClick={props.handleRentalBack}
                                    className={classes.button}
                                >
                                    Voltar
                            </Button>
                                <Button className={classes.button} variant='raised' color='primary' onClick={props.handleRentalNext}>
                                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                                </Button>
                            </div>
                        </div>
                    )}
            </Dialog>
        </div>
    )
}



export default withStyles(styles)(RentalDialog)
