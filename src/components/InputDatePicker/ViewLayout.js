import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { neutral, spacing } from '../../utils'

const ViewLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const ViewLayoutHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: ${spacing.padding.small};
`
const ViewLayoutBody = styled.div`
    flex: 1;
` 
const ViewLayoutFooter = styled.div`
    border-top: 0.1rem solid ${neutral[300]};
    padding-top: ${spacing.padding.small};
`


function ViewLayout(props) {
    const {header, bodyElement, footerElement} = props;
    const {leftElement, rightElement, middleElement} = header;
    return <ViewLayoutContainer>
        <ViewLayoutHeader>
            <div>{leftElement}</div>
            <div>{middleElement}</div>
            <div>{rightElement}</div>
        </ViewLayoutHeader>
        <ViewLayoutBody>{bodyElement}</ViewLayoutBody>
        <ViewLayoutFooter>{footerElement}</ViewLayoutFooter>
    </ViewLayoutContainer>
}

ViewLayout.propTypes = {
    header: PropTypes.shape({
        leftElement: PropTypes.node,
        middleElement: PropTypes.node,
        rightElement: PropTypes.node,
    }),
    bodyElement: PropTypes.node,
    footerElement: PropTypes.node,
}

export default ViewLayout

