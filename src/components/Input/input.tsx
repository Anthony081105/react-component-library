import React, {
  InputHTMLAttributes,
  ReactElement,
  FC,
  ChangeEvent,
  useContext,
  useEffect,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
import { ConfigContext, configContext} from "../ConfigProvider/index";

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用 Input*/
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const classes = classNames("cherry-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  let configure = useContext(ConfigContext);
  // 用于清除原生value属性对defaultValue的影响
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  useEffect(()=>{
    const {colors} = configure;
    if(colors.length>2){
      let inputDOMs = document.getElementsByClassName("cherry-input-inner");
      for (let i = 0; i < inputDOMs.length; i++) {
        let dom = inputDOMs[i] as HTMLElement;
        // 避免多余的换色操作
        if(dom.style.getPropertyValue("--input-focus")===colors[1]) continue;
        dom.style.setProperty("--input-focus", colors[1]);
      }
    }
  })
  return (
    <div className={classes} style={style}>
      {prepend && <div className="cherry-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`}></Icon>
        </div>
      )}
      <input
        className="cherry-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="cherry-input-group-append">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
