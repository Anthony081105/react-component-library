import { getDate, getMonth, isSameDay} from 'date-fns';
import dateFnsIsToday from "date-fns/isToday";
import React,{useMemo} from 'react';
import PropTypes from 'prop-types';
import { buildWeeks, buildDayNames } from './generator';
import { TertiaryButton } from '../Button';
import styled, { css } from 'styled-components';
import { neutral, spacing, defaultTheme } from '../../utils';
import { tint } from 'polished';
import { selectedStyle } from './minins';

const CalendarTable = styled.table`
    position: relative;
    width: 100%;
`;

const CalendarHeader = styled.tr`
    &:after{
        content: "";
        width: 100%;
        border-bottom: 0.1rem solid ${neutral[300]};
        position: absolute;
        left: 0;
        top: 2.3rem;
    }
    th {
        padding-bottom: ${spacing.padding.small};
    }
`;

const CalendarRow = styled.tr`
    height: 3.6rem;
    text-align: center;
`;

const CalendarDay = styled(TertiaryButton)`
    height: 2.4rem;
    width: 2.4rem;
    line-height: 2.4rem;
    padding: 0;
    border: none;
    border-radius: 50%;

    ${props => props.isToday 
        &&
        css`
            background-color: ${tint(0.9, defaultTheme.primaryColor)}; // tint: 将一个颜色和白色混合，得到一个混合色
            border: 0.1rem solid ${defaultTheme.primaryColor};  
        `}
    ${props => !props.isCurrentMonth && css`
        opacity: 0.5;    
    `}
    
    ${selectedStyle}
`;

export default function DatePicker(props) {
    const {selectedDate, calendar} = props;
    const { year, monthIndex} = calendar;
    const weeks = useMemo(() => buildWeeks(year, monthIndex), [year, monthIndex]);
    const dayNames = useMemo(() => buildDayNames(0), []);
    return (
        <CalendarTable>
            <thead>
                <CalendarHeader>
                    {dayNames.map((dayName, i)=> (
                        <th key={i}>{dayName}</th>
                    ))}
                </CalendarHeader>
            </thead>
            <tbody>
                {weeks.map((week, i) => 
                    <CalendarRow key={i}>
                        {week.map((day, j)=> {
                            const isToday = dateFnsIsToday(day);
                            const isCurrentMonth = getMonth(day) === monthIndex;
                            const isSelected = isSameDay(day, selectedDate);
                            return <td key={j}>
                                <CalendarDay isToday={isToday} isCurrentMonth={isCurrentMonth} isSelected={isSelected}>{getDate(day)}</CalendarDay>
                            </td>
                        }      
                    )}
                    </CalendarRow>
                )}
            </tbody>
        </CalendarTable>
    )
}

DatePicker.propTypes = {
    calendar: PropTypes.shape({
        year: PropTypes.number,
        monthIndex: PropTypes.number,
    }),
    selectedDate:PropTypes.instanceOf(Date)
}
