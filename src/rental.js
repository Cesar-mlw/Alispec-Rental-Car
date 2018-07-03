import React from 'react'
import { Typography } from '@material-ui/core';

export default class Rental extends React.Component {
    state = {
        value: 0
    }

    render() {
        const { value } = this.state
        return (
            <div style={{ marginTop: 20 }}>
                <div>
                    <Typography>2</Typography>
                </div>
            </div>
        )
    }
}