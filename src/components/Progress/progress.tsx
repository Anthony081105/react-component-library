import React, { FC,useContext,useEffect } from 'react'
import { ThemeProps } from '../Icon/icon'
import {ConfigContext} from "../ConfigProvider/index";
export interface ProgressProps {
  /** 当前百分比 */
  percent: number;
  /** 高度 */
  strokeHeight?: number;
  /** 是否显示百分比数字 */
  showText?: boolean;
  /** 额外的样式 */
  styles?: React.CSSProperties;
  /** 主题 */
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  let configure = useContext(ConfigContext);
  useEffect(()=>{
    const {colors} = configure;
    let iconDOMs = document.getElementsByClassName("color-primary");
    if(colors.length >= 2){
      for (let i = 0; i < iconDOMs.length; i++) {
        let dom = iconDOMs[i] as HTMLElement;
        // 避免多余的换色操作
        if(dom.style.getPropertyValue("--theme-primary")===colors[3]) continue;
        dom.style.setProperty("--theme-primary", colors[3]);
      }
    }
  })
  return (
    <div className="cherry-progress-bar" style={styles}>
      <div className="cherry-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div
          className={`cherry-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary"
}

export default Progress
