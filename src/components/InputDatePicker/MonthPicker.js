import React from 'react'
import PropTypes from 'prop-types'
import { buildMonths } from './generator'
import styled, { css } from 'styled-components';
import { defaultTheme, neutral, spacing } from '../../utils';
import { TertiaryButton } from '../Button';
import { selectedStyle } from './minins';
import { prototype } from 'events';

const MonthTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${spacing.padding.small};
`

const MonthCell = styled.td`
    width: 33.3%;
    border: 0.1rem solid ${neutral[300]};
`

const MonthButton = styled(TertiaryButton)`
    height: 5.7rem;
    width: 100%;
    padding: 0;
    font-size: 1.2rem;

    ${selectedStyle}
`

function MonthPicker(props) {
    const { selectedMonthIndex, onSelect} = props;
    const months = buildMonths();
    return (
        <MonthTable>
            {months.map((row, i) =>
            (<tr key={i}>{row.map((month, j) => {
                const isSelected = month.index === selectedMonthIndex;
                return (
                <MonthCell>
                    <MonthButton isSelected={isSelected} onClick={()=>{onSelect(month.index)}}>{month.name}</MonthButton>
                </MonthCell>)
            }
            )}</tr>)
            )}
        </MonthTable>
    )
}

MonthPicker.propTypes = {
    selectedMonthIndex: PropTypes.number,
    onSelect: prototype.func
}

export default MonthPicker

