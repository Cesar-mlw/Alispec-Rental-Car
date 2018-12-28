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

class EdicaoDialog extends React.Component {
    state = {
        ediId: 0,
        ediNome: '',
        ediEmail: '',
        ediAdminCheck: false,
        ediRamal: '',
        ediDepartamento: 0,
        edicaoStep: 0
    }
    handleEdicaoNomeChange = (event) => {
        this.setState({ ediNome: event.target.value })
    }
    handleEdicaoEmailChange = (event) => {
        this.setState({ ediEmail: event.target.value })
    }
    handleEdicaoDepartamentoChange = (event) => {
        this.setState({ ediDepartamento: event.target.value })
    }
    handleEdicaoRamalChange = (event) => {
        this.setState({ ediRamal: event.target.value })
    }
    handleEdicaoAdminChange = (event) => {
        if (event.target.checked) this.setState({ ediTipoUsuario: 1 })
        else this.setState({ ediTipoUsuario: 2 })
        this.setState({ ediAdminCheck: event.target.checked })
    }
    handleEdicaoNext = () => {
        let edicaoStep = this.state.edicaoStep
        if (edicaoStep === 0) {
            let answer = this.props.dataCall('POST', 'http://localhost:90/searchUsuario', '{"email": "' + this.state.ediEmail + '"}')
            if (answer.length === 0) {
                this.setState({ ediEmail: '' })
                this.props.handleSnackOpen('Usuário não encontrado')
                return
            }
            else {
                if (answer[0].fk_tipo_usuario_id === 1) this.setState({ ediAdminCheck: true })
                this.setState({ ediNome: answer[0].nome_usuario, 
                                ediEmail: answer[0].email_usuario, 
                                ediRamal: answer[0].ramal_usuario, 
                                ediDepartamento: answer[0].fk_departamento_id, 
                                ediId: answer[0].id_usuario })
            }

        }
        else if (edicaoStep === 1) {
            this.handleClickEdicao()
        }
        this.setState({ edicaoStep: edicaoStep + 1 })
    }
    handleClickEdicao = () => {
        let edicao = new Object()
        edicao.nome = this.state.ediNome
        edicao.ramal = this.state.ediRamal
        edicao.email = this.state.ediEmail
        edicao.depto = this.state.ediDepartamento
        edicao.id = this.state.ediId
        edicao.tipoUsuario = this.state.ediAdminCheck ? '1' : '2'
        console.log(edicao.tipoUsuario);
        let response = this.props.dataCall('POST', 'http://localhost:90/editUsuario', JSON.stringify(edicao))
        if(response.update.affectedRows === 1){
            this.props.handleSnackOpen('Dados alterados com sucesso')
        }
        this.props.handleEdicaoUClose()
    }
    handleEdicaoBack = () => {
        let edicaoStep = this.state.edicaoStep
        this.setState({ edicaoStep: edicaoStep - 1 })
    }
    getStepContent = (stepIndex, props) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <Typography style={{ marginLeft: '4%', marginBottom: '4%', width: '90%' }} align={'center'} variant={'title'} color={'inherit'}>E-mail</Typography>
                        <TextField
                            id='email_edi'
                            label='E-mail do usuário'
                            placeholder='mario_quintana@alispec.com.br'
                            value={this.state.ediEmail}
                            onChange={this.handleEdicaoEmailChange}
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
                            value={this.state.ediNome}
                            onChange={this.handleEdicaoNomeChange}
                            margin='normal'
                            required
                            style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                        />
                        <TextField
                            id='email_usuario'
                            label='E-mail do Usuário'
                            placeholder='manoel_bandeira@alispec.com.br'
                            value={this.state.ediEmail}
                            onChange={this.handleEdicaoEmailChange}
                            margin='normal'
                            required
                            style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                        />
                        <TextField
                            id='ramal_usuario'
                            label='Ramal do Usuário'
                            placeholder='1234 '
                            value={this.state.ediRamal}
                            onChange={this.handleEdicaoRamalChange}
                            margin='normal'
                            style={{ marginLeft: '4%', marginBottom: '2%', width: '90%' }}
                        />
                        <InputLabel required style={{ marginLeft: '4%', marginBottom: '4%', width: '50%' }}>Qual o departamento desse Usuário?</InputLabel>
                        <Select
                            value={this.state.ediDepartamento}
                            onChange={this.handleEdicaoDepartamentoChange}
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
                        <Typography style={{ marginLeft: '4%', marginBottom: '2%', width: '80%' }} variant={'body2'} color={'inherit'}>{props.ediNome} é um(a) administrador(a)?</Typography>
                        <InputLabel style={{ marginLeft: '4%', marginBottom: '2%', width: '80%' }}>Sim</InputLabel>
                        <Checkbox
                            checked={this.state.ediAdminCheck}
                            onClick={this.handleEdicaoAdminChange}
                            color={'primary'}
                        />
                    </div>
                )
            default:
                return 'Wrong StepIndex - Contact Cesar and ask him to fix it (11)99488-1864, or fix it yourself :3'
        }
    }
    render() {
        const steps = getSteps()
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.edicaoUDialog}
                    onClose={this.props.handleEdicaoUClose}
                    fullWidth>
                    <DialogTitle>Edição de Usuário</DialogTitle>
                    <div>
                        {this.getStepContent(this.state.edicaoStep, this.props)}
                        <div>
                            <Stepper
                                activeStep={this.state.edicaoStep} alternativeLabel>
                                {steps.map(label => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    )
                                })}
                            </Stepper>
                            <Button
                                disabled={this.state.edicaoStep === 0}
                                onClick={this.handleEdicaoBack}
                                className={classes.button}
                            >
                                Voltar
                            </Button>
                            <Button className={classes.button} variant='raised' color='primary' onClick={this.handleEdicaoNext}>
                                {this.props.edicaStem === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}



export default withStyles(styles)(EdicaoDialog)
