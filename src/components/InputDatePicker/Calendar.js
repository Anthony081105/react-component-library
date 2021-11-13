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
    function onSelectMonth(selectedMonthIndex) {
        setCalendar({ ...calendar, monthIndex: selectedMonthIndex })
    }
    // 用于控制视图切换
    const onSetMonthYearView = setDateView.bind(null, false);
    const onSetDateView = setDateView.bind(null, true);
    return (
        <Picker>
            {isDateView ?
                <DateView calendar={calendar} onSelectMonthYear={setCalendar} onTitleClick={onSetMonthYearView}/> :
                <MonthYearView calendar={calendar} onSelectMonth={onSelectMonth} onBackClick={onSetDateView}/>}
        </Picker>
    )
}

Calendar.propTypes = {

}

export default Calendar

