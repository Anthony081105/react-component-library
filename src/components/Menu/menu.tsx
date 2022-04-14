import React, { useState, createContext } from "react";
import classNames from "classnames";
import {MenuItemProps} from './menuItem';

// 字符串字面量
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: number) => void;
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("cherry-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode: mode,
  };

  // 为了操控children，必须拿到同属于MenuItem的合法实例
  const renderChildren = ()=>{
    return React.Children.map(children,(child,index)=>{
      // 无法直接拿到child.type，因此需要类型断言成 FunctionComponent 实例
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === "MenuItem" || "SubMenu") {
        // cloneElement 用于自动生成 index ，不需要使用者手动添加 index
        return React.cloneElement(childElement,{index});
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component");
      }
    })
  } 
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
