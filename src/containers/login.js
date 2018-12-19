import React from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, withStyles, Typography, } from '@material-ui/core';

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
                onClose={props.handleLoginDialogClose}
                fullWidth>
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Seja Bem vindo ao RentalSpec!
                        </DialogContentText>
                    <TextField
                        required
                        id='usuario'
                        label='E-mail Corporativo'
                        placeholder='fernando_pessoa@alispec.com.br'
                        type='text'
                        className={styles.textField}
                        fullWidth
                        margin='dense'
                        onChange={props.handleEmailChange}
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
