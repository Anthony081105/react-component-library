import React from 'react'
import DatePicker from './DatePicker'

export default function InputDatePicker() {
    return (
        <DatePicker 
            calendar={{year: 2021, monthIndex: 10}} 
            selectedDate={new Date(2021, 10, 10)} 
        />
    )
}

