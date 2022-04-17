import React from "react";
import { storiesOf } from "@storybook/react";
import {Story, Meta} from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

import Button, { ButtonType, ButtonSize } from "./button";


const styles: React.CSSProperties = {
  textAlign: "center"
}

const CenterDecorator = (storyFn:any) => <div style={styles}>{storyFn()}</div>


const defaultButton = () =>{
  return <Button onClick={action('click')}>default button</Button>
}
const buttonWithSize = () =>{
  return (
    <>
      <Button size={ButtonSize.Large}>Large button</Button>
      <Button size={ButtonSize.Small}>Small button</Button>
    </>
  )
}
const buttonWithType = () =>{
  return (
    <>
      <Button btnType={ButtonType.Default}>Default button</Button>
      <Button btnType={ButtonType.Primary}>Primary button</Button>
      <Button btnType={ButtonType.Danger}>Danger button</Button>
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">Link button</Button>
    </>
  )
}

const disabledButton = () =>(
  <>
    <Button btnType={ButtonType.Default} disabled>Default button</Button>
    <Button btnType={ButtonType.Primary} disabled>Primary button</Button>
    <Button btnType={ButtonType.Danger} disabled>Danger button</Button>
    <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>Link button</Button>
  </>
)
  


storiesOf("Button Component", module)
  .addDecorator(CenterDecorator)
  // @ts-ignore
  .addDecorator(withInfo)
  .addParameters({
    info:{
      text:"组件描述",
      inline:true
    }
  })
  .add('默认 Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
  .add('禁用的 Button',disabledButton)

