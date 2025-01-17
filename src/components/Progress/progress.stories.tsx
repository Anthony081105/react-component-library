import React from "react";
import { storiesOf } from "@storybook/react";
import Progress from "./progress";
import ConfigProvider from "../ConfigProvider";

const defaultProcess = () => 
  (<ConfigProvider colors={["#fff",'#31d131']}>
    <div>
      <Progress percent={20} />
    </div>
   </ConfigProvider>)


const withTextProcess = () => <Progress percent={50} showText={false} />;

const strokeHeightProcess = () => (
  <div>
    <div style={{marginBottom:10}}>
      <Progress percent={20} strokeHeight={20} />
    </div>
    <div style={{marginBottom:10}}>
      <Progress percent={50} strokeHeight={50} />
    </div>
    <div>
      <Progress percent={70} strokeHeight={70} />
    </div>
  </div>
);
const difThemesProcess = () => (
  <div>
    <Progress percent={10}  styles={{marginBottom:3}}/>
    <Progress percent={20}  styles={{marginBottom:3}} theme="secondary"/>
    <Progress percent={30}  styles={{marginBottom:3}} theme="warning"/>
    <Progress percent={40}  styles={{marginBottom:3}} theme="info"/>
    <Progress percent={50}  styles={{marginBottom:3}} theme="dark"/>
    <Progress percent={60}  styles={{marginBottom:3}} theme="danger"/>
    <Progress percent={70}  styles={{marginBottom:3}} theme="light"/>
    <Progress percent={100}  styles={{marginBottom:3}} theme="success"/>
  </div>
);

storiesOf("Process Component", module)
  .add("Process", defaultProcess)
  .add("不显示百分比", withTextProcess)
  .add("不同的高度", strokeHeightProcess)
  .add("不同的主题", difThemesProcess);
