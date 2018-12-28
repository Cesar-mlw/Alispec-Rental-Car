import React from 'react'
import { ExpansionPanel, withStyles, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
const styles = {
    media: {
        height: 0,
        paddingTop: '56.35%'
    },
    panel: {
        marginLeft: '10vw',
    },
    div: {
        marginTop: '5vh',
        width: '90vw'
    }
}
class myRentals extends React.Component {
    state = {
        extended: null
    }
    handleChange = panel => (event, extended) => {
        this.setState({
            extended: extended ? panel : false,
        })
    }
    render() {
        const { classes } = this.props
        const { extended } = this.state
        return (
            <div className={classes.div}>
                <ExpansionPanel extended={extended === 'panel1'} onChange={this.handleChange('panelChange')} className={classes.panel}>
                    <ExpansionPanelSummary>
                        <Typography className={classes.heading}>General settings</Typography>
                        <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                            maximus est, id dignissim quam.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

export default withStyles(styles)(myRentals)