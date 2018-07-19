import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, withStyles } from '@material-ui/core';
const styles= {
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
function CarCard(props) {
    const {classes} = props
    return(
        <div className={classes.div}>
                <Card className={classes.card} >
                    <CardMedia 
                    className = {classes.media} 
                    image = {props.image}
                    title={props.name}/>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {props.name}
                        </Typography>
                        <Typography component='p'>
                            {props.desc}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Reservar
                        </Button>
                    </CardActions>
                </Card>
            </div>
    )
}

export default withStyles(styles)(CarCard)