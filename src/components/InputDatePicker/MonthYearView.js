import React from 'react'
import PropTypes from 'prop-types'
import MonthPicker from './MonthPicker'
import ViewLayout from './ViewLayout'
import { TertiaryButton } from '../Button'
import YearPicker from './YearPicker'
import HeaderTitle from './HeaderTitle'

function MonthYearView(props) {
    const { calendar, onSelectMonth, onBackClick, onSelectYear } = props;
    const { monthIndex, year } = calendar;
    return (
        <ViewLayout
            header={{
                leftElement:<TertiaryButton onClick={onBackClick}>←</TertiaryButton>,
                middleElement:<HeaderTitle {...calendar} onSelectYear={onSelectYear}/>,
                // rightElement:<TertiaryButton> </TertiaryButton>
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
    onSelectYear: PropTypes.func,
    onBackClick: PropTypes.func
}

export default MonthYearView

