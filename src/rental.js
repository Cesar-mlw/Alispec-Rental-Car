import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, withStyles, Stepper, StepLabel, Step, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '90%'
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
})

const getSteps = () => {
    return ['Selecione os horários', 'Confirme os dados', 'Finalize o aluguel']
}
const getStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0:
            return //Pick time of start and ending 
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
    return (
        <div className={styles.root}>
            <Dialog
                open={props.rentalDialog}
                onClose={props.handleRentalDialogClose}>
                <DialogTitle>Rental</DialogTitle>
                <Stepper
                    activeStep={props.activeStep} alternativeLabel>
                    {steps.map(label => {
                        return(
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                {props.activeStep === steps.length ? (
                    <div>
                        <Typography className={styles.instructions}>
                            Tudo Certo! Agora é só confirmar o aluguel
                        </Typography>
                        <Button onClick={props.handleClickRental}>
                            Alugar
                        </Button>
                    </div>
                ): (
                    <div>
                        <Typography className={styles.instructions}>{getStepContent(props.activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={props.activeStep === 0}
                                onClick={props.handleRentalBack}
                                className={styles.backButton}>
                                Back
                            </Button>
                            <Button variant='raised' color='primary' onClick={props.handleRentalNext}>
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
