import React from 'react'
import PropTypes from 'prop-types'
import { TertiaryButton } from '../Button'
import { format } from 'date-fns';

function HeaderTitle(props) {
    const {year, monthIndex} = props;
    const firstDayofMonth = new Date(year, monthIndex);
    const monthLabel = format(firstDayofMonth,'MMMM')
    const yearLabel = format(firstDayofMonth,'yyyy')
    return (
        <TertiaryButton modifiers={['small']}>{monthLabel} {yearLabel}</TertiaryButton>
    )
}

HeaderTitle.propTypes = {

}

export default HeaderTitle

