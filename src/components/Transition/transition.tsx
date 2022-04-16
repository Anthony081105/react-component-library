import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

export type TransitionProps<
  Ref extends undefined | HTMLElement = undefined
> = CSSTransitionProps<Ref> & {
  animation?: AnimationName;
  // 是否添加一个外层div，用于避免transition的冲突
  wrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, children, classNames, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
