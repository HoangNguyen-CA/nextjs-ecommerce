import React from 'react';
import Input from './Input';

const InputGroup = (props) => {
  let inputElements = [];

  for (let el in props.controls) {
    let config = props.controls[el];
    inputElements.push(
      <Input
        id={el}
        label={el}
        type={config.type}
        config={config.config}
        value={config.value}
        changed={props.changed}
      ></Input>
    );
  }
  return <>{inputElements}</>;
};

export default InputGroup;
