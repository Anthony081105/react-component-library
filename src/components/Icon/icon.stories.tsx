import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Icon from './icon'
import Button from '../Button/button'
import ConfigProvider from '../ConfigProvider'
const defaultIcon = () => (
  <>
    <Icon icon="check" size="3x" />
    <Icon icon="anchor" size="3x" />
    <Icon icon="trash" size="3x" />
    <Icon icon="times" size="3x" />
    <Button
      btnType="primary"
      disabled={false}
      size="lg"
    >
      <Icon icon="check" />
      check
    </Button>
  </>
)

const iconWithTheme = () => (
  <ConfigProvider colors={["#fff",'#31d131']}>
    <div>
      <Icon icon="check" size="3x" theme="primary" />
      <Icon icon="info" size="3x" theme="secondary" />
      <Icon icon="tree" size="3x" theme="success" />
      <Icon icon="umbrella" size="3x" theme="info" />
      <Icon icon="exclamation-circle" size="3x" theme="warning" />
      <Icon icon="spinner" size="3x" spin theme="danger" />
    </div>
  </ConfigProvider>
)

const iconWithAction = () => (
  <>
    <Icon icon="spinner" size="3x" spin theme="primary" />
    <Icon icon="spinner" pulse size="3x" theme="success" />
  </>
)


storiesOf('Icon Component', module)
  .add('Icon', defaultIcon)
  .add('不同主题的 Icon', iconWithTheme)
  .add('更多行为的 Icon', iconWithAction)
