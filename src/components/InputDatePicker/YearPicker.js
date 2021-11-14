import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { buildYears } from './generator';
import { TertiaryButton } from '../Button';
import styled from 'styled-components';

const YearPickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ScrollIconButton = styled(TertiaryButton)`
    width: 100%;
`

const YearsList = styled.ul`
    list-style: none;
    padding: 0;
`

function YearPicker(props) {
    const { selectedYear, onSelectYear } = props;
    // 滚动时，通过改变数据形成虚拟滚动的效果
    const [yearsWindow, setyearsWindow] = useState(buildYears(selectedYear, 3))
    function getMiddleYear() {
        return yearsWindow[Math.floor(yearsWindow.length / 2)];
    }
    function scroll(pace) {
        setyearsWindow(buildYears(getMiddleYear() + pace, 3))
    }
    function onScroll(event, direction) {
        event.stopPropagation();
        if (direction === 'up') {
            scroll(-1);
        } else {
            scroll(1);
        }
    }
    function onWhell(e) {
        e.preventDefault();
        // 滚动距离
        const { deltaY } = e;
        // 滚动距离过大
        const absolutePath = Math.round(Math.log(Math.abs(deltaY)));
        // 滚动距离过小
        let pace = deltaY > 0 ? 1 : -1;
        if (absolutePath > 5) {
            pace = pace * Math.floor(absolutePath / 2);
        }
        scroll(pace);
    }
    return (
        <YearPickerContainer onWheel={onWhell}>
            <ScrollIconButton onClick={(e) => onScroll(e, 'up')}>↑</ScrollIconButton>
            <YearsList>
                {yearsWindow.map((year, i) => {
                    return <li key={i}><TertiaryButton modifiers={'small'} onClick={()=>onSelectYear(year)}>{year}</TertiaryButton></li>
                })}
            </YearsList>
            <ScrollIconButton onClick={(e) => onScroll(e, 'down')}>↓</ScrollIconButton>
        </YearPickerContainer>
    )
}

YearPicker.propTypes = {
    selectedYear: PropTypes.number,
    onSelectYear: PropTypes.func
}

export default YearPicker

