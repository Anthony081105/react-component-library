import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Input } from './input'

const defaultInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      placeholder="placeholder"
      onChange={action('changed')}
    />
  </>
)
const inputWithDisabled = () => (
  <Input
    style={{width: '300px'}}
    placeholder="disabled input"
    disabled
  />
)

const inputWithIcon = () => (
  <Input
    style={{width: '300px'}}
    placeholder="input with icon"
    icon="search"
  />
)

const inputWithSize = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="large size"
      size="lg"
    />
    <Input
      style={{width: '300px'}}
      placeholder="small size"
      size="sm"
    />
  </>
)

const inputWithPad = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      style={{width: '300px'}}
      defaultValue="google"
      append=".com"
    />
  </>
)


storiesOf('Input component', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', inputWithDisabled)
  .add('带图标的 Input', inputWithIcon)
  .add('大小不同的 Input', inputWithSize)
  .add('带前后缀的 Input', inputWithPad)
