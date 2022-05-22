import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Alert from './alert'
import ConfigProvider from '../ConfigProvider'

export const defaultAlert = () => (
  <ConfigProvider colors={["#fff",'#31d131']}>
    <Alert closable title="this is alert!" type="primary" />
  </ConfigProvider>
)

export const alertWithType = () => (
  <>
    <Alert type="success" closable title="this is Success" />
    <Alert type="danger" closable title="this is Danger!" />
    <Alert type="warning" closable={false} title="this is Warning!" />
  </>
)

export const alertWithChildren = () => (
  <Alert
    type="primary"
    closable
    title="提示标题"
    children="this is a long description"
    onClose={function noRefCheck(){}}
  />
)

storiesOf('Alert Component', module)
  .add('Alert', defaultAlert)
  .add('不同样式的 Alert', alertWithType)
  .add('添加描述的 Alert', alertWithChildren)
