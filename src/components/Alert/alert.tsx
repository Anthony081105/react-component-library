import React, { useState,FC } from "react";
import classnames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";

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
