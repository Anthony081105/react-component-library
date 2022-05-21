import React from 'react'
import { storiesOf } from '@storybook/react'
import { FixedSizeList as List } from 'react-window';
 
const Row = ({ index, style }) => (
  <div style={style} id={index}>Row {index}</div>
);
 
const Example = () => (
  <List
    height={150}
    itemCount={20}
    itemSize={35}
    // width={300}
    className="test"
  >
    {Row}
  </List>
);


storiesOf('Welcome', module)
  .add('welcome', () => {
    return (
        <Example/>
    )
  }, { info : { disable: true }})
