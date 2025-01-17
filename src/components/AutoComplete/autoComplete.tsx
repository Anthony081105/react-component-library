import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
} from "react";
import classNames from "classnames";
import { FixedSizeList as List } from 'react-window';
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** 返回推荐结果 */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选择选中某一项 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义渲染样式 */
  renderOption?: (item: DataSourceType) => ReactElement;
  /** 展示的最大行数 */
  maxSize?: number;
}

/**
 * 页面中最常用的的输入框元素，适合于完成特定的交互
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption,maxSize, ...restProps } =
    props;

  const [inputValue, setInputValue] = useState(value as string);
  // 自动补全列表
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  // 异步情况下的加载效果
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 300);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    // 修正当输入框中的值再次改变时，高亮位置的偏移
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  // 高亮行显示的索引判定
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      // up
      case 38:
        highlight(highlightIndex - 1);
        break;
      // down
      case 40:
        highlight(highlightIndex + 1);
        break;
      // esc
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = (maxSize?:number) => {
    console.log('maxSize',maxSize);
    let maxHeight,lessSuggestionLength;
    if(maxSize){
      maxHeight = maxSize *40;
    }
    // @ts-ignore
    const RowItem =({index,style}) =>{
      const classnames = classNames("suggestion-item", {
        "is-active": index === highlightIndex,
      });
      return (
        <li
          key={index}
          id = {index}
          className={classnames}
          style={style}
          onClick={() => handleSelect(suggestions[index])}
        >
          {renderTemplate(suggestions[index])}
        </li>
      );
    }
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        {/* <ul className="cherry-suggestion-list" style={{maxHeight:maxHeight,overflowY:"scroll"}}> */}
        <List className="cherry-suggestion-list" 
          height={maxHeight && (suggestions.length*40 >maxHeight)? maxHeight : suggestions.length*40}
          itemCount = {suggestions.length}
          itemSize={40}
          >
          {/* {loading && (
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )} */}
          {RowItem}
        </List>
      </Transition>
    );
  };

  return (
    <div className="cherry-auto-complete" ref={componentRef} >
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {suggestions.length > 0 && generateDropdown(maxSize)}
    </div>
  );
};


export default AutoComplete;
