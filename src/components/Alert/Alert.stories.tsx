import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Alert from "./alert";

const AlertPage = () => (
  <div>
    <Alert type="success" title="测试">
      Alert组件
    </Alert>
    <Alert type="primary">Alert组件</Alert>
    <Alert type="warning">Alert组件</Alert>
    <Alert type="danger">Alert组件</Alert>
  </div>
);
storiesOf("Alert组件 Test",module).add('测试Alert',AlertPage);
