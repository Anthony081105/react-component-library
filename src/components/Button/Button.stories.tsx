import React from "react";
import Button, { ButtonType, ButtonSize } from "./button";
export default {
  title: "Button",
  component: Button,
};

export const ButtonPage = () => (
  <div>
    <div>
      <p>基础 Button</p>
      <div>
        <Button>Hello World</Button>
      </div>
    </div>
    <div>
      <p>大 Button</p>
      <div>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello World
        </Button>
      </div>
    </div>
    <div>
      <p>链接 Button</p>
      <div>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          Hello World
        </Button>
      </div>
    </div>
    <div>
      <p>禁用 Button</p>
      <div>
        <Button disabled>Hello World</Button>
      </div>
    </div>
  </div>
);
