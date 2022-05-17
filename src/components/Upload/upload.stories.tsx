import React  from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Icon from '../Icon/icon'
import Button from '../Button'

// 上传前检测文件大小  直接返回布尔值
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 100) {
    alert('file too big')
    return false
  }
  return true
}

// 上传前 改变文件名 返回 promise
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '122', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '1211', size: 1234, name: 'test.md', status: 'error'},
  { uid: '1232', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '1223', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12141', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12322', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12233', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12144', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12325', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12236', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12147', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12328', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12239', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12140', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12320', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12239', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12148', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12327', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12236', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12145', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12323', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12234', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12142', size: 1234, name: 'test.md', status: 'error'},
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '122', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '1211', size: 1234, name: 'test.md', status: 'error'},
  { uid: '1232', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '1223', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12141', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12322', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12233', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12144', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12325', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12236', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12147', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12328', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12239', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12140', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12320', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12239', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12148', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12327', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12236', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12145', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12323', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12234', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12142', size: 1234, name: 'test.md', status: 'error'},
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '122', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '1211', size: 1234, name: 'test.md', status: 'error'},
  { uid: '1232', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '1223', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12141', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12322', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12233', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12144', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12325', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12236', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12147', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12328', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12239', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12140', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12320', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12239', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12148', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12327', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12236', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12145', size: 1234, name: 'test.md', status: 'error'},
  { uid: '12323', size: 1234, name: 'hello.md', status: 'uploading', percent: 40 },
  { uid: '12234', size: 1234, name: 'yzk.md', status: 'success'},
  { uid: '12142', size: 1234, name: 'test.md', status: 'error'},
]

const SimpleUpload = () =>{
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      beforeUpload={checkFileSize}
      defaultFileList={defaultFileList}
    >
      <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于100Kb！ </Button>
    </Upload>  
  )
}

const DrageUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      defaultFileList={defaultFileList}
      onRemove={action('removed')}
      beforeUpload={filePromise}
      name="fileName"
      data={{ 'key': 'value' }}
      headers={{'X-Powered-By': 'cherryship'}}
      accept=".jpg"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>Drag file over to upload</p>
    </Upload>
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
  .add('拖拽上传的Upload', DrageUpload)
  // .add('Upload', DrageUpload)
