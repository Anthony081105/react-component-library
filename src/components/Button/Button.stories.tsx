import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'
import ConfigProvider from '../ConfigProvider'

const defaultButton = () => (
  <ConfigProvider colors={["#fff",'#31d131']}>
    <Button onClick={action('clicked')}>Default button</Button>
  </ConfigProvider>
  
)

const buttonWithSize = () => (
  <>
    <Button size="lg">Large button</Button>
    <Button size="sm">Small button</Button>
  </>
)

const buttonWithType = () => (
  <ConfigProvider colors={["#fff",'#36d627']}>
    <div>
      <Button btnType="primary">Primary button</Button>
      <Button btnType="default">Default Button</Button>
      <Button btnType="danger">Danger button</Button>
      <Button btnType="link" href="https://google.com">Link button</Button>
    </div>
  </ConfigProvider>
)

const buttonWithTypeAndDisabled = () => (
  <>
    <Button btnType="primary" disabled>Primary button</Button>
    <Button btnType="default" disabled>Default Button</Button>
    <Button btnType="danger" disabled>Danger button</Button>
    <Button btnType="link" href="https://google.com" disabled>Link button</Button>
  </>
)

storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
  .add('不同类型的禁用 Button', buttonWithTypeAndDisabled)