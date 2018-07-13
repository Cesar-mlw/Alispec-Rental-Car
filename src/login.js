import React from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, } from '@material-ui/core';

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
export default class LoginDialog extends React.Component {
    state = {
        open: true
    }
    render() {
        return (
            <div className={styles.div}>
                <Dialog
                    open={this.state.open}
                    onClose = {this.handleClose}
                    disableBackdropClick
                    disableEscapeKeyDown>
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText> 
                            Seja Bem vindo ao RentalSpec! Por favor efetue seu Login antes de continuar
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
                        />
                    </DialogContent>
                    <DialogActions> 
                        <Button onClick={this.handleClickLogin} color='primary'>Entrar</Button>
                        <Button onClick={this.handleClickCadastro} color='primary'>Cadastre-se</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}



