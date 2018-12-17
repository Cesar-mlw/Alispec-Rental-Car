import React from 'react';
import { Button, Dialog, DialogTitle, TextField, withStyles, Stepper, StepLabel, Step, Typography, InputLabel, Select, MenuItem, Checkbox } from '@material-ui/core';

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
    return ['Insira o e-mail do usuário', 'Altere os dados necessários']
}
const getStepContent = (stepIndex, props) => {
    switch (stepIndex) {
        case 0:
            return (
                <div>
                    <Typography style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }} align={'center'} variant={'title'} color={'inherit'}>E-mail</Typography>
                    <TextField
                        id='email_edi'
                        label='E-mail do usuário'
                        placeholder='mario_quintana@alispec.com.br'
                        value={props.cadEmail}
                        onChange={props.handleCadastroEmailChange}
                        margin='normal'
                        required
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                    />
                </div>
            )
        case 1:
            return (
                <div>
                    <Typography align={'center'} variant={'title'} color={'inherit'}>Edite os dados</Typography>
                    <TextField
                        id='nome_usuario'
                        label='Nome do Usuário'
                        placeholder='Manoel Bandeira'
                        value={props.cadNome}
                        onChange={props.handleCadastroNomeChange}
                        margin='normal'
                        required
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                    />
                    <TextField
                        id='email_usuario'
                        label='E-mail do Usuário'
                        placeholder='manoel_bandeira@alispec.com.br'
                        value={props.cadEmail}
                        onChange={props.handleCadastroEmailChange}
                        margin='normal'
                        required
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                    />
                    <TextField
                        id='ramal_usuario'
                        label='Ramal do Usuário'
                        placeholder='1234 '
                        value={props.cadRamal}
                        onChange={props.handleCadastroRamalChange}
                        margin='normal'
                        style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                    />
                    <InputLabel required style={{ marginLeft: '4%', marginBottom: '4%', width: '50%' }}>Qual o departamento desse Usuário?</InputLabel>
                    <Select
                        value={props.cadDepartamento}
                        onChange={props.handleCadastroDepartamentoChange}
                        style={{ marginLeft: '4%', marginBottom: '4%', width: '40%' }}
                    >
                        <MenuItem value={0}>Departamento</MenuItem>
                        <MenuItem value={7}>Compras</MenuItem>
                        <MenuItem value={5}>Direção</MenuItem>
                        <MenuItem value={10}>Financeiro</MenuItem>
                        <MenuItem value={3}>Marketing</MenuItem>
                        <MenuItem value={8}>Manutenção</MenuItem>
                        <MenuItem value={9}>Produção</MenuItem>
                        <MenuItem value={6}>Qualidade</MenuItem>
                        <MenuItem value={11}>RH</MenuItem>
                        <MenuItem value={1}>Supply Chain</MenuItem>
                        <MenuItem value={4}>TI</MenuItem>
                        <MenuItem value={2}>Vendas</MenuItem>
                    </Select>
                    <Typography style={{ marginLeft: '4%', marginBottom: '2%', width: '80%' }} variant={'body2'} color={'inherit'}>{props.cadNome} é um(a) administrador(a)?</Typography>
                    <InputLabel style={{ marginLeft: '4%', marginBottom: '2%', width: '80%' }}>Sim</InputLabel>
                    <Checkbox
                        checked={props.cadAdminCheck}
                        onClick={props.handleCadastroAdminChange}
                        color={'primary'}
                    />
                </div>
            )
        default:
            return 'Wrong StepIndex - Contact Cesar and ask him to fix it (11)99488-1864, or fix it yourself :3'
    }
}
const EdicaoDialog = (props) => {
    const steps = getSteps()
    const { classes } = props
    return (
        <div className={classes.root}>
            <Dialog
                open={props.edicaoUDialog}
                onClose={props.handleEdicaoUClose}
                fullWidth>
                <DialogTitle>Edição de Usuário</DialogTitle>
                {props.edicaoStep === steps.length ? (
                    <div>
                        <Stepper
                            activeStep={props.edicaoStep} alternativeLabel>
                            {steps.map(label => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                        <Button onClick={props.handleClickEdicao} className={classes.button}>
                            Editar
                        </Button>
                    </div>
                ) : (
                        <div>
                            {getStepContent(props.edicaoStep, props)}
                            <div>
                                <Stepper
                                    activeStep={props.edicaoStep} alternativeLabel>
                                    {steps.map(label => {
                                        return (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        )
                                    })}
                                </Stepper>
                                <Button
                                    disabled={props.edicaoStep === 0}
                                    onClick={props.handleEdicaoBack}
                                    className={classes.button}
                                >
                                    Voltar
                            </Button>
                                <Button className={classes.button} variant='raised' color='primary' onClick={props.handleEdicaoNext}>
                                    {props.edicaStem === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                                </Button>
                            </div>
                        </div>
                    )}
            </Dialog>
        </div>
    )
}



export default withStyles(styles)(EdicaoDialog)
