import React from 'react'
import PropTypes from 'prop-types'
import { TertiaryButton } from '../Button'
import { format } from 'date-fns';

function HeaderTitle(props) {
    const {year, monthIndex, onTitleClick} = props;
    const firstDayofMonth = new Date(year, monthIndex);
    const monthLabel = format(firstDayofMonth,'MMMM')
    const yearLabel = format(firstDayofMonth,'yyyy')
    return (
        <TertiaryButton modifiers={['small']} onClick={onTitleClick}>{monthLabel} {yearLabel}</TertiaryButton>
    )
}

HeaderTitle.propTypes = {
    year:PropTypes.number,
    monthIndex: PropTypes.number,
    onTitleClick: PropTypes.func
}

export default HeaderTitle

