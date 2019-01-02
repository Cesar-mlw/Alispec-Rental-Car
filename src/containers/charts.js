import React from 'react'
import { Typography, Paper, withStyles, Button } from '@material-ui/core'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'  

const styles = theme => ({
    root:{
        display: 'flex',
        flexWrap: 'wrap'
    },
    paper: {
        height: '100%',
        marginTop: '5vh',
        marginLeft: '1vw'
    },
    text: {
        marginBottom: '5vh',
        marginLeft: '5vw',
    },
    button: {
        margin: theme.spacing.unit
    }
})
class Charts extends React.Component {
    state = {
        rentalsPerCar: this.props.dataCall("POST", "http://localhost:90/rentalsPerCar"),
        rentalsPerMonth: this.props.dataCall("POST", "http://localhost:90/rentalsPerMonth"),

    }
    handleData = () => {
        let response = this.props.dataCall("POST", "http://localhost:90/rentalsPerMonth")
        this.setState({
            rentalsPerMonth: response
        })
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography className={classes.text} variant='headline'>Demanda por veículo</Typography>
                    <div>
                        <BarChart
                            width={380}
                            height={600}
                            data={this.state.rentalsPerCar}
                            margin={{top: 5, left: 10, bottom: 20, right: 40}}
                        >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="Nome do Veículo" label={{ value: "Nome do Veículo", position: 'bottom' }}/>
                        <YAxis label={{ value: "Número de Aluguéis", angle: -90, position: 'insideLeft' }}/>
                        <Tooltip/>
                        <Bar dataKey="Número de Reservas" fill="#8884d8" Legend="Numero de alugueis"/>
                        </BarChart>
                    </div>
                </Paper>
                <Paper className={classes.paper} elevation={3}>
                    <Typography className={classes.text} variant='headline'>Demanda por veículo</Typography>
                    <div>
                        <LineChart width={730} height={250} data={this.state.rentalsPerMonth} 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="Mês"/>
                        <YAxis dataKey="Número de reservas"/>
                        <Tooltip/>
                        <Line dataKey="Número de reservas" type="monotone" stroke="#8884d8"/>
                        </LineChart>
                        <Button variant='outlined' className={classes.button} onClick={this.handleData}>
                            Plot
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Charts)