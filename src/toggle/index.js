import React from 'react'
import {Container} from './styles'

export default function TOGGLE(props) {
    const { state, submitToggle = () =>  {} } = props
    return (
        <Container>
            <div className={state ? 'toggle-btn active' : 'toggle-btn'} onClick={() => submitToggle()}>
                <div className='inner-circle'>
                </div>
            </div>
        </Container>
    )
}