import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
export interface subMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<subMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {

  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  // 用于控制显隐
  const isOpened = (index && context.mode ==="vertical") ? openedSubMenus.includes(index):false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    // is-opended is-vertical 用于垂直模式下，下拉图标的动画效果的添加判定
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical"
  });

  // 纵向模式：通过点击，控制二级标题显隐
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  // 横向模式：鼠标移入移出事件，控制二级标题显隐
  let timer: any;
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
      console.log("设置开关", toggle);
    }, 300);
  };

  // 纵向时，通过点击进行触发
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  // 横向模式，通过hover进行触发
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            console.log("enter");

            handleHover(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            console.log("leave");
            handleHover(e, false);
          },
        }
      : {};

  // 用于渲染下拉框的内容
  const renderChildren = () => {
    const subMenuClasses = classNames("cherry-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement,{
          index: `${index}-${i}`
        });
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component"
        );
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
        <Icon icon="arrow-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
