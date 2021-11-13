import React from 'react'
import styled from 'styled-components'
import DateView from './DateView'
import {neutral, spacing} from '../../utils'

const Picker = styled.div`
    width: 29rem;
    height: 35rem;
    padding: ${spacing.padding.normal};
    border: 0.1rem solid ${neutral[300]};
`
export default function InputDatePicker() {
    return (
        <Picker>
            <DateView />
        </Picker>
    )
}

