import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module)
  .add('welcome', () => {
    return (
      <>
        <h1>首页页面</h1>

      </>
    )
  }, { info : { disable: true }})
