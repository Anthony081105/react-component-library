import React, { useContext,useEffect } from "react";
import classNames from "classnames";
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {library} from "@fortawesome/fontawesome-svg-core";
import {ConfigContext} from "../ConfigProvider/index";

// @ts-ignore
library.add(fas);

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  /**
   * 主题
   */
  theme?: ThemeProps
}

export const Icon: React.FC<IconProps> = (props) => {
  const {className, theme, ...restProps} = props;
  const classes = classNames('cherry-icon', className, {
    [`icon-${theme}`]: theme
  });
  let configure = useContext(ConfigContext);
  useEffect(()=>{
    const {colors} = configure;
    let iconDOMs = document.getElementsByClassName("icon-primary");
    if(colors.length >= 2){
      for (let i = 0; i < iconDOMs.length; i++) {
        let dom = iconDOMs[i] as HTMLElement;
        // 避免多余的换色操作
        if(dom.style.getPropertyValue("--menu-item-active-color")===colors[3]) continue;
        dom.style.setProperty("--menu-item-active-color", colors[3]);
      }
    }
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  );
}

export default Icon;