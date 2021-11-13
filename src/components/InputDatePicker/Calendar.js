import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DateView from './DateView'
import MonthYearView from './MonthYearView'
import { neutral, spacing } from '../../utils'
import { getMonth, getYear } from 'date-fns'

const Picker = styled.div`
    width: 29rem;
    height: 35rem;
    padding: ${spacing.padding.normal};
    border: 0.1rem solid ${neutral[300]};
`
function Calendar(props) {
    const [isDateView, setDateView] = useState(true);
    const today = new Date();
    const initialCalendar = {
        year: getYear(today),
        monthIndex: getMonth(today),
    }
    const [calendar, setCalendar] = useState(initialCalendar)
    return (
        <Picker>
            {isDateView ? <DateView calendar={calendar} onSelectMonthYear={setCalendar} /> : <MonthYearView />}
        </Picker>
    )
}

Calendar.propTypes = {

}

export default Calendar

