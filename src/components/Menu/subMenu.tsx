import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface subMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<subMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
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
      console.log('设置开关',toggle);
      
    }, 300);
  };

  // 纵向时，通过点击进行触发
  const clickEvents =
    context.mode === "vertical"
      ? {
          onclick: handleClick,
        }
      : {};
  // 横向模式，通过hover进行触发
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
              console.log('enter');
              
            handleHover(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            console.log('leave');
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
        return childElement;
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
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
