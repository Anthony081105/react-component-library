import React from 'react'
import PropTypes from 'prop-types'
import ViewLayout from './ViewLayout'
import DatePicker from './DatePicker'
import { TertiaryButton } from '../Button'
import HeaderTitle from './HeaderTitle'

// 取模
function modulo(m, n) {
    return (m % n + n) % n;
}
function DateView(props) {
    const { calendar, onSelectMonthYear } = props;
    const { monthIndex, year } = calendar;
    // 月份切换事件函数
    const gotoOtherMonth = (direction) => {
        const changedMonthIndex = (direction === 'prev') ? (modulo((monthIndex - 1), 12)) : (modulo((monthIndex + 1), 12));
        const changedYear = (direction === 'prev') ? (year + Math.floor((monthIndex - 1) / 12)) : (year + Math.floor((monthIndex + 1) / 12));
        onSelectMonthYear({
            year: changedYear,
            monthIndex: changedMonthIndex,
        })
    };
    return (
        <ViewLayout
            header={{
                leftElement: <TertiaryButton icon='arrowleft' onClick={() => { gotoOtherMonth('prev') }}>←</TertiaryButton>,
                middleElement: <p><HeaderTitle year={year} monthIndex={monthIndex}/></p>,
                rightElement: <TertiaryButton icon='arrowright' onClick={() => { gotoOtherMonth('next') }}>→</TertiaryButton>,
            }}
            bodyElement={
                <DatePicker
                    calendar={calendar}
                    selectedDate={new Date(2021, 10, 10)}
                />
            }
            footerElement={<TertiaryButton>Today</TertiaryButton>}
        />
    )
}

DateView.propTypes = {
    calendar: DatePicker.propTypes.calendar,
    onSelectMonthYear: PropTypes.func,
}

export default DateView

