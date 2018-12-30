import React from 'react'
import { ExpansionPanel, withStyles, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Divider, ExpansionPanelActions, Button, TextField } from '@material-ui/core';
const styles = theme =>({
    div: {
        marginTop: '5vh',
        width: '90vw',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    textField:{
        marginLeft: '10vw',
    },
    details:{
        flexWrap: 'wrap',
        display: 'flex',
    }
})

class myRentals extends React.Component {
    state = {
        extended: null,
        id: this.props.id,
        
    }
    handleChange = panel => (event, extended) => {
        this.setState({
            extended: extended ? panel : false,
        })
    }
    cancelRental = () =>{
        let rental = new Object()
        rental.id = this.props.id
        this.props.dataCall("POST", "http://localhost:90/cancelRental", JSON.stringify(rental))
        this.props.sendMyRentals("Confirmado")
        this.props.handleSnackOpen("Aluguel cancelado com sucesso")
    }
    render() {
        const { classes } = this.props
        const { extended } = this.state
        return (
                <ExpansionPanel expanded={extended === 'panel1'} onChange={this.handleChange('panel1')} className={classes.panel}>
                    <ExpansionPanelSummary>
                        <Typography className={classes.heading}>{this.props.car}</Typography>
                        <Typography className={classes.secondaryHeading}>{this.props.status}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <TextField className={classes.textField} variant="filled" id="veiculo" label="Veículo" value={this.props.car} InputProps={{readOnly: true}} />
                        <TextField className={classes.textField} id="motorista" label="Motorista" value={this.props.motorista} InputProps={{readOnly: true}} variant="filled"/>
                        <TextField className={classes.textField} id="motivo" label="Motivo" value={this.props.motivo} InputProps={{readOnly: true}} variant="filled"/>
                        <TextField className={classes.textField} id="inicio" label="Inicio" value={this.props.inicio} InputProps={{readOnly: true}} variant="filled"/>
                        <TextField className={classes.textField} id="termino" label="Terminado" value={this.props.termino} InputProps={{readOnly: true}} variant="filled"/>
                    </ExpansionPanelDetails>
                    {this.props.status === "Cancelado" || this.props.status === "Terminado" ? (this.state.id):<Divider/>}
                    <ExpansionPanelActions>
                    {this.props.status === "Cancelado" || this.props.status === "Terminado" ? (this.state.id):<Button size='small' color='secondary' variant='outlined' onClick={this.cancelRental}>Cancelar</Button>}
                        
                    </ExpansionPanelActions>)
                </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(myRentals)