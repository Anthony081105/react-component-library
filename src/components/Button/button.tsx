import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

interface BascButtonProps {
  /**
   * the size of this button
   */
   size?: ButtonSize;
   /**
    * the type of this button
    */
   btnType?: ButtonType;
   /**
    * whether the button can be clicked
    */
   disabled?: boolean;
   /**
    * button name
    */
   children: React.ReactNode;
   /**
    * href url
    */
   href?: string;
   /**
    * classes
    */
   className?: string;
}

// 联合类型 补充button及a标签原生属性的支持提示
type NativeButtonProps = BascButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BascButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// Partial 使得其泛型属性中包含的属性全为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;

  // btn
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled,
  });

  if (btnType === ButtonType.Link) {
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
  btnType: ButtonType.Default,
};

export default Button;
