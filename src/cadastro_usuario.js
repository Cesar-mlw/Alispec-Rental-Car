import React, { Fragment } from 'react';
import { Button, Dialog, DialogTitle, TextField, withStyles, Stepper, StepLabel, Step, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';

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
    return ['Insira as Informações', 'Informações finais e confirmação']
}
const getStepContent = (stepIndex, props) => {
    switch (stepIndex) {
        case 0: 
            
            return (
                <div>
                    
                </div>
            )

        case 1:
            return (
                <div>
                    
                </div>
            )
        default:
            return 'Wrong StepIndex - Contact Cesar and ask him to fix it (11)99488-1864, or fix it yourself :3'
    }
}
const CadastroDialog = (props) => {
    const steps = getSteps()
    const { cadActiveStep } = props.cadActiveStep
    const { classes } = props
    return (
        <div className={classes.root}>
            <Dialog
                open={props.cadastroUDialog}
                onClose={props.handleCadastroUClose}
                fullWidth>
                <DialogTitle>Inserir Usuário</DialogTitle>
                {props.activeStep === steps.length ? (
                    <div>
                        //Last Page
                    </div>
                ) : (
                        <div>
                            {getStepContent(props.cadActiveStep, props)}
                            <div>
                                <Stepper
                                    activeStep={props.cadActiveStep} alternativeLabel>
                                    {steps.map(label => {
                                        return (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        )
                                    })}
                                </Stepper>
                                <Button
                                    disabled={props.cadActiveStep === 0}
                                    onClick={props.handleCadBack}
                                    className={classes.button}
                                >
                                    Voltar
                            </Button>
                                <Button className={classes.button} variant='raised' color='primary' onClick={props.handleCadNext}>
                                    {cadActiveStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                                </Button>
                            </div>
                        </div>
                    )}
            </Dialog>
        </div>
    )
}



export default withStyles(styles)(CadastroDialog)
