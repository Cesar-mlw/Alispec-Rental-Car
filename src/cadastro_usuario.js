import React, { Fragment } from 'react';
import { Button, Dialog, DialogTitle, TextField, withStyles,  Typography, InputLabel, Select, MenuItem, Checkbox, AppBar, Toolbar, Tabs, Tab } from '@material-ui/core';

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
const CadastroDialog = (props) => {
    const { cadValue } = props.cadValue
    const { classes } = props
    return (
        <div className={classes.root}>
            <Dialog
                open={props.cadastroUDialog}
                onClose={props.handleCadastroUClose}
                fullWidth>
                <DialogTitle>Usuário</DialogTitle>
                <AppBar>
                    <Toolbar>
                        <Tabs
                            value={props.cadValue}
                            onChange={props.handleCadTabs}
                            indicatorColor='secondary'
                            textColor='inherit'
                            fullWidth
                        >
                            <Tab label='Cadastrar usuário' />
                            <Tab label='Editar usuário' />
                        </Tabs>

                    </Toolbar>
                </AppBar>
                {props.cadValue === 0 && (
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
                )}
                {props.cadValue === 1 && (
                    //FAZER PAGINA DE EDICAO
                    <Typography>NOTHING HERE</Typography>    
                )}
            </Dialog>
        </div>
    )
}



export default withStyles(styles)(CadastroDialog)
