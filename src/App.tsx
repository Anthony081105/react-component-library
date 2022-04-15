import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

export const ButtonPage = () => (
  <div>
    <div>
      <p>基础 Button</p>
      <div>
        <Button
          onClick={() => {
            console.log("点击！");
          }}
        >
          Hello World
        </Button>
        <Button disabled>Disabled Button</Button>
        <Button size={ButtonSize.Large} className="testClassName">
          Large Button
        </Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
          Large Primary Button
        </Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>
          Large DangerButton
        </Button>
        <Button size={ButtonSize.Small}>Small Button</Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.baidu.com"
          target="_blank"
        >
          Link Button
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          Disabld Link Button
        </Button>
      </div>
    </div>
  </div>
);
export const MenuPage = () => (
  <div>
    <div>
      <p>基础 Menu</p>
      <div>
        <Menu
          defaultIndex="2"
          onSelect={(index) => {
            console.log("触发select",index);
          }}
          mode="vertical"
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>test link1</MenuItem>
          <MenuItem disabled>test link2</MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem>二级 link1</MenuItem>
            <MenuItem>二级 link2</MenuItem>
            <MenuItem disabled>二级 link3</MenuItem>
          </SubMenu>
          <MenuItem>test link3</MenuItem>
        </Menu>
      </div>
    </div>
  </div>
);
function App() {
  return (
    <div className="App">
      <ButtonPage />
      <MenuPage />
    </div>
  );
}

export default App;
