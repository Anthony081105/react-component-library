import React from 'react'
import PropTypes from 'prop-types'
import ViewLayout from './ViewLayout'
import DatePicker from './DatePicker'
import {TertiaryButton} from '../Button'

function DateView(props) {
    return (
        <ViewLayout 
            header={{
                leftElement: <TertiaryButton  icon='arrowleft'>←</TertiaryButton>,
                middleElement: <p>month year</p>,
                rightElement: <TertiaryButton  icon='arrowright'>→</TertiaryButton>,
            }}
            bodyElement={
                <DatePicker 
                    calendar={{year: 2021, monthIndex: 10}} 
                    selectedDate={new Date(2021, 10, 10)} 
                />
            }
            footerElement={<TertiaryButton>Today</TertiaryButton>}
        />
    )
}

DateView.propTypes = {

}

export default DateView

