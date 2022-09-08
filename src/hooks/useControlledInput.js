import { useState } from 'react';

function useControlledInput(defaultInputValue = '', parseValue = undefined) {
  const [value, setValue] = useState(defaultInputValue);

  const handleChange = (event) => {
    if (typeof parseValue === 'function') {
      setValue(parseValue(event.target.value));
    }
    else {
      setValue(event.target.value);
    }
  };

  return [
    {
      value, onChange: handleChange,
    },
    value,
    setValue,
  ];
}

export default useControlledInput;
