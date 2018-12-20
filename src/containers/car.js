import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, withStyles } from '@material-ui/core';
const styles = {
    media: {
        height: 0,
        paddingTop: '56.35%'
    },
    card: {
        maxWidth: 345,
    },
    div: {
        marginTop: 20
    }
}
class CarCard extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.div}>
                <Card className={classes.card} >
                    <CardMedia
                        className={classes.media}
                        image={this.props.image}
                        title={this.props.carName} />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.carName}
                        </Typography>
                        <Typography component='p'>
                            {this.props.desc}
                            {<br />}

                            Ano:{' ' + this.props.ano}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => this.props.handleRentalDialogOpen(this.props.carId, this.props.carName)}>
                            Reservar
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(CarCard)