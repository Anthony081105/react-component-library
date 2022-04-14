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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

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
    return <ul className={subMenuClasses} >{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes}>
      <div className="submenu-title" onClick={handleClick}>{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
