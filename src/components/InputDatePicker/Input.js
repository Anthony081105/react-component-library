import React, { useContext, forwardRef } from "react";
import DebounceInput from "react-debounce-input";
import DateContext from "./Context";

function Input(props, ref) {
  const { value, onInputChange } = useContext(DateContext);
  return (
    <DebounceInput
      placeholder="YYYY-MM-DD"
      debounceTimeout={300}
      value={value.textInput}
      onChange={onInputChange}
      inputRef={ref}
    />
  );
}

export default forwardRef(Input);
