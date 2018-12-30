import React from 'react'
import { Typography, Paper, withStyles } from '@material-ui/core'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'  

const styles = theme => ({
    paper: {
        width: '100%',
        height: '100%',
        marginTop: '5vh',
        marginLeft: '1vw'
    },
    text: {
        marginBottom: '5vh',
        marginLeft: '5vw',
    }
})
class Charts extends React.Component {
    state = {
        rentalsPerCar: this.props.dataCall("POST", "http://localhost:90/rentalsPerCar")

    }
    handleData = () => {
        let response = this.props.dataCall("POST", "http://localhost:90/rentalsPerCar")
        this.setState({ rentalsPerCar: JSON.stringify(response) })
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <Paper className={classes.paper} elevation={3}>
                    <Typography className={classes.text} variant='headline'>Demanda por veículo</Typography>
                    <div>
                        <BarChart
                            width={380}
                            height={600}
                            data={this.state.rentalsPerCar}
                            margin={{top: 5, left: 10, bottom: 20}}
                        >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="nome" label={{ value: "Nome do Veículo", position: 'bottom' }}/>
                        <YAxis label={{ value: "Número de Aluguéis", angle: -90, position: 'insideLeft' }}/>
                        <Tooltip/>
                        
                        <Bar dataKey="numero" fill="#8884d8" Legend="Numero de alugueis"/>
                        </BarChart>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Charts)