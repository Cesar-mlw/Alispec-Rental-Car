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
class LoginDialog extends React.Component {
    state={
        email: null,
        senha: null
    }
    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }
    handleSenhaChange = event => {
        this.setState({
            senha: event.target.value
        })
    }
    render() {
        return (
            <div className={styles.div}>
                <Dialog
                    open={this.props.state.loginDialog}
                    disableBackdropClick
                    disableEscapeKeyDown
                    onClose={this.props.handleLoginDialogClose}
                    fullWidth>
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Seja Bem vindo ao RentalSpec!
                        </DialogContentText>
                        <TextField
                            required
                            id='usuario'
                            label='Nome Completo'
                            placeholder='Fernando Pessoa'
                            type='text'
                            className={styles.textField}
                            fullWidth
                            margin='dense'
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            required
                            id='senha'
                            label='RG (somente os números)'
                            placeholder='1234'
                            type='text'
                            className={styles.textField}
                            fullWidth
                            margin='dense'
                            onChange={this.handleSenhaChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.handleClickLogin(this.state.nome, this.state.senha)} color='primary'>Entrar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}



export default withStyles(styles)(LoginDialog)
