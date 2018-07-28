import React, { Fragment } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, withStyles, Stepper, StepLabel, Step, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import BR from 'date-fns/locale/pt'

const locacao = {
    'locacao': [
        {'id': 1, 'duracao': '02:00:00', 'data': '2018/07/25', 'inicio': '13:00:00', 'termino': '15:00:00', 'usu_id': 1, 'vei_id': 1, 'status': 1},
        {'id': 2, 'duracao': '01:00:00', 'data': '2018/07/25', 'inicio': '15:00:00', 'termino': '16:00:00', 'usu_id': 1, 'vei_id': 1, 'status': 1},
        {'id': 3, 'duracao': '01:00:00', 'data': '2018/07/25', 'inicio': '18:00:00', 'termino': '19:00:00', 'usu_id': 1, 'vei_id': 1, 'status': 1},,
    ]
}
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
        marginLeft: '4%'
    },
    instructions: {
        marginBottom: '4%',
        marginLeft: '4%'
    }
}
const getSteps = () => {
    return ['Selecione os horários', 'Confirme os dados', 'Finalize o aluguel']
}
const getStepContent = (stepIndex, props) => {
    switch (stepIndex) {
        case 0: //Fazer if para saber se tem horario, se nao tiver coloca uma tela para avisar que nao tem horario
            return (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={BR}>
                    <DatePicker
                        label="Quando você vai precisar dele?"
                        format="DD/MM/YYYY"
                        placeholder="25/03/2018"
                        value={props.data}
                        onChange={props.handleRentalDataChange}
                        disableOpenOnEnter
                        disablePast
                        style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}
                        animateYearScrolling={false}
                    />
                    <InputLabel style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }}>A que horas você quer pegar ele?</InputLabel>
                    <Select
                        value={props.menuIndex}
                        onChange={props.handleRentalInicioChange}
                        style={{ marginLeft: '4%', marginBottom: '4%', width: '20%' }}
                    >
                        <MenuItem value={14}><em>None</em></MenuItem>
                        {props.sendAvailableHours(locacao)}
                    </Select>
                    
                </MuiPickersUtilsProvider>
            )

        case 1:
            return //confirm user and car info
        case 2:
            return //Funny Image or car image
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
                onClose={props.handleRentalDialogClose}>
                <DialogTitle>Rental</DialogTitle>
                {props.activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Tudo Certo! Agora é só confirmar o aluguel
                        </Typography>
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
                                    Back
                            </Button>
                                <Button className={classes.button} variant='raised' color='primary' onClick={props.handleRentalNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </Dialog>
        </div>
    )
}



export default withStyles(styles)(RentalDialog)
