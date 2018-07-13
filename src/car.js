import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, withStyles } from '@material-ui/core';
import s10 from './s10.jpg'
const styles= {
    media: {
        height: 0,
        paddingTop: '56.35%'
    },
    card: {
        maxWidth: 345
    },
    div: {
        marginTop: 20
    }
}
function CarCard(props) {
    const {classes} = props
    return(
        <div className={classes.div}>
                <Card className={classes.card} >
                    <CardMedia 
                    className = {classes.media} 
                    image = {s10} 
                    title="Carro"/>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {props.name}
                        </Typography>
                        <Typography component='p'>
                            Picape Chevrolet com um motor de 206cv e feita para transporte de cargas pequenas
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Alugar
                        </Button>
                    </CardActions>
                </Card>
            </div>
    )
}

export default withStyles(styles)(CarCard)