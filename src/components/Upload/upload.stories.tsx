import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload from './upload'

const defaultUpload = () => (
  <Upload action='https://www.mocky.io/v2/5cc8019d300000980a055e76'>Default button</Upload>
)



storiesOf('Upload Component', module)
  .add('Upload', defaultUpload)
