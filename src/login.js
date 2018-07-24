import React from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, withStyles, } from '@material-ui/core';

const styles = theme => ({
    loginDiv: {
        textAlign: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,

    },
})
const LoginDialog = (props) => {  
    return (
            <div className={styles.div}>
                <Dialog
                    open={props.state.loginDialog}
                    disableBackdropClick
                    disableEscapeKeyDown
                    onClose = {props.handleLoginDialogClose}>
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText> 
                            Seja Bem vindo ao RentalSpec! Por favor efetue seu Login antes de continuar.
                        </DialogContentText>
                        <TextField
                            required
                            id='usuario'
                            label='Usuário'
                            type='text'
                            className={styles.textField}
                            helperText='Insira seu Login'
                            fullWidth
                            margin='dense'
                            onChange = {props.handleLoginChange}
                        />
                        <TextField
                            required
                            id='senha'
                            label='Senha'
                            type='password'
                            className={styles.textField}
                            helperText='Insira Sua Senha'
                            fullWidth
                            margin='dense'
                            onChange={props.handleSenhaChange}
                        />
                    </DialogContent>
                    <DialogActions> 
                        <Button onClick={props.handleClickLogin} color='primary'>Entrar</Button>
                        <Button onClick={props.handleClickCadastro} color='primary'>Cadastre-se</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }



export default withStyles(styles)(LoginDialog)
