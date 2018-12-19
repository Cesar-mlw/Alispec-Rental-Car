import React from 'react';
import { Button, Dialog, DialogTitle, TextField, withStyles, Typography, InputLabel, Select, MenuItem, Checkbox } from '@material-ui/core';

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
class CadastroDialog extends React.Component {
    state = {
        cadEmail: '',
        cadNome: '',
        cadDepartamento: 0,
        cadTipoUsuario: 0,
        cadRamal: '',
        cadValue: 0,
        cadAdminCheck: false,
    }
    handleCadastroU = () => {
        console.log(this.state.cadTipoUsuario);
        this.dataCall('POST', 'http://localhost:90/insertUsu', '{"usuario": "' + this.state.cadNome + '", "email": "' + this.state.cadEmail + '", "ramal": "' + this.state.cadRamal + '", "tipoUsuario": "' + this.state.cadTipoUsuario + '", "departamento": "' + this.state.cadDepartamento + '"}')
        this.setState({
            cadActiveStep: 0,
            cadNome: '',
            cadEmail: '',
            cadAdminCheck: false,
            cadRamal: '',
            cadDepartamento: 0
        })
    }
    handleCadastroNomeChange = (event) => {
        this.setState({ cadNome: event.target.value })
    }
    handleCadastroEmailChange = (event) => {
        this.setState({ cadEmail: event.target.value })
    }
    handleCadastroDepartamentoChange = (event) => {
        this.setState({ cadDepartamento: event.target.value })
    }
    handleCadastroRamalChange = (event) => {
        this.setState({ cadRamal: event.target.value })
    }
    handleCadastroAdminChange = (event) => {
        if (event.target.checked) this.setState({ cadTipoUsuario: 1 })
        else this.setState({ cadTipoUsuario: 2 })
        console.log("object");
        this.setState({ cadAdminCheck: event.target.checked })
    }
    //Cadastro Usuario
    handleEdicaoUOpen = () => {
        this.setState({ edicaoUDialog: true })
    }
    handleEdicaoUClose = () => {
        this.setState({ edicaoUDialog: false })
    }
    handleCadastroU = (user) => {
        console.log(this.state.cadTipoUsuario);
        this.props.dataCall('POST', 'http://localhost:90/insertUsu', '{"usuario": "' + user.cadNome + '", "email": "' + user.cadEmail + '", "ramal": "' + user.cadRamal + '", "tipoUsuario": "' + user.cadTipoUsuario + '", "departamento": "' + user.cadDepartamento + '"}')
        this.setState({
            cadActiveStep: 0,
            cadNome: '',
            cadEmail: '',
            cadAdminCheck: false,
            cadRamal: '',
            cadDepartamento: 0
        })
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={props.cadastroUDialog}
                    onClose={props.handleCadastroUClose}
                    fullWidth>
                    <DialogTitle>Cadastrar Usuário</DialogTitle>
                    <div>
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
                        <Typography style={{ marginLeft: '4%', marginBottom: '2%', width: '80%' }} variant={'body2'} color={'inherit'}>{props.cadNome} será um(a) administrador(a)?</Typography>
                        <InputLabel style={{ marginLeft: '4%', marginBottom: '2%', width: '80%' }}>Sim</InputLabel>
                        <Checkbox
                            checked={props.cadAdminCheck}
                            onClick={props.handleCadastroAdminChange}
                            color={'primary'}
                            value='0'
                        />

                    </div>
                    {<br />}
                    <Button onClick={props.handleCadastroU} color='primary' size='medium' variant='raised' style={{ margin: '0 auto', marginBottom: '4%', width: '20%' }}>
                        Cadastrar
                    </Button>
                </Dialog>
            </div>
        )
    }
}



export default withStyles(styles)(CadastroDialog)
