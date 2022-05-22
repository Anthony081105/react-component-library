import React, { useState, createContext,useContext,useEffect } from "react";
import classNames from "classnames";
import {MenuItemProps} from './menuItem';
import {ConfigContext} from "../ConfigProvider/index";

// 字符串字面量
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  /** 	菜单类型 横向或者纵向 */
  mode?: MenuMode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback;
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children,defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("cherry-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  // 为了操控children，必须拿到同属于MenuItem的合法实例
  const renderChildren = ()=>{
    return React.Children.map(children,(child,index)=>{
      // 无法直接拿到child.type，因此需要类型断言成 FunctionComponent 实例
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === "MenuItem" || "SubMenu") {
        // cloneElement 用于自动生成 index ，不需要使用者手动添加 index
        return React.cloneElement(childElement,{index: index.toString()});
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component");
      }
    })
  }
  let configure = useContext(ConfigContext);
  useEffect(()=>{
    const {colors} = configure;
    let menuItemDOMS = document.getElementsByClassName("menu-item");
    if(colors.length >= 2){
      for (let i = 0; i < menuItemDOMS.length; i++) {
        let dom = menuItemDOMS[i] as HTMLElement;
        // 避免多余的换色操作
        if(dom.style.getPropertyValue("--menu-item-active-color")===colors[3]) continue;
        dom.style.setProperty("--menu-item-active-color", colors[3]);
      }
    }
  })
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
