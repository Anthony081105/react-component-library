import React from 'react'
import PropTypes from 'prop-types'
import MonthPicker from './MonthPicker'
import ViewLayout from './ViewLayout'
import { TertiaryButton } from '../Button'

function MonthYearView(props) {
    const { calendar, onSelectMonth, onBackClick } = props;
    const { monthIndex, year } = calendar;
    return (
        <ViewLayout
            header={{
                leftElement:<TertiaryButton onClick={onBackClick}>←</TertiaryButton>,
                middleElement:<span>{monthIndex} 月{year}年</span>,
                rightElement:<TertiaryButton> </TertiaryButton>
            }}
            bodyElement={<MonthPicker selectedMonthIndex = {monthIndex} onSelect={onSelectMonth} />}
            footerElement={<TertiaryButton>Today</TertiaryButton>}
        />
    )
}

MonthYearView.propTypes = {
    calendar: PropTypes.shape({
        year: PropTypes.number,
        monthIndex: PropTypes.number,
    }),
    onSelectMonth: PropTypes.func,
    onBackClick: PropTypes.func
}

export default MonthYearView

