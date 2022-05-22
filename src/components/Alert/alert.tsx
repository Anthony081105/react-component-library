import React, { useState,FC,useContext, useEffect } from "react";
import classnames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import { ConfigContext } from "../ConfigProvider";

export type AlertType = "success" | "primary" | "warning" | "danger";

export interface IAlertProps {
  /**
   * 标题
   */
  title?: string;
  /**
   * 按钮是否可关闭
   */
  closable?: boolean;
  /**
   * 自定义关闭按钮
   */
  customClose?: string;
  /**
   * 关闭按钮的回调
   */
  onClose?: () => void;
  /**
   * 描述信息
   */
  children?: React.ReactNode;
  /**
   * 类型
   */
  type: AlertType;
}

/**
 * This is an alert component. It can have multiple props like title, type, closeable,customClose.
 */
 export const Alert: FC<IAlertProps> = ({
  title,
  closable = true,
  type = "primary",
  customClose,
  onClose,
  children,
}) => {
  const customCloseP = customClose || (
    <Icon icon="times" className="window-close" size="lg" />
  );
  const classes = classnames("alert", {
    [`alert-${type}`]: type,
  });

  const handleCloseBtnClick = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };
  let configure = useContext(ConfigContext);
  useEffect(()=>{
    const {colors} = configure;
    let alertDOMs = document.getElementsByClassName("alert-primary");
    if(colors.length >= 2){
      for (let i = 0; i < alertDOMs.length; i++) {
        let dom = alertDOMs[i] as HTMLElement;
        // 避免多余的换色操作
        if(dom.style.getPropertyValue("--alert-primary")===colors[3]) continue;
        dom.style.setProperty("--alert-primary", colors[3]);
      }
    }
  })
  const [visible, setVisible] = useState(true);
  return (
    <Transition
      in={visible}
      animation="zoom-in-left"
      timeout={300}
      wrapper={true}
    >
      <div className={classes}>
        {title ? <h4 className="alert-title">{title}</h4> : null}
        <p className="alert-message">{children}</p>
        {closable ? <i onClick={handleCloseBtnClick}>{customCloseP}</i> : null}
      </div>
    </Transition>
  );
};

export default Alert;
