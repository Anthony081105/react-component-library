import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes,useEffect, useContext } from "react";
import classNames from "classnames";

import {ConfigContext} from "../ConfigProvider/index";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  /**设置 Link 类型的跳转链接 */
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 */
export const Button: FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, children, className, href, ...restProps } =
    props;
  // 用于色彩变幻的configure
  let configure = useContext(ConfigContext);
  
  // btn, btn-lg, btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  useEffect(()=>{
    const {colors} = configure;
    console.log('计算后的colors',colors);
    
    if(colors.length >= 2){
      for (let i = 0; i < document.getElementsByClassName("btn").length; i++) {
        let dom = document.getElementsByClassName("btn")[i] as HTMLElement;
        // 避免多余的换色操作
        if(dom.style.getPropertyValue("--btn-default-background")==="red") continue;

        dom.style.setProperty("--btn-default-background", "red");
        console.log('执行换色',dom,"个数",document.getElementsByClassName("btn").length,dom.style.getPropertyValue("--textcolor"));
      }
    }
  })

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};


Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
