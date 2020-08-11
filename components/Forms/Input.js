import React from 'react';
import { Label, Input, FormGroup } from 'reactstrap';

import styles from '../../styles/util.module.css';

const AppInput = (props) => {
  let inputElement = null;

  switch (props.type) {
    case 'input':
      inputElement = (
        <Input
          {...props.config}
          value={props.value}
          onChange={(e) => props.changed(e, props.label)}
        ></Input>
      );
    default:
      inputElement = (
        <Input
          {...props.config}
          value={props.value}
          onChange={(e) => props.changed(e, props.label)}
        ></Input>
      );
  }
  return (
    <FormGroup>
      <Label className={styles.capitalize}>{props.label}</Label>
      {inputElement}
    </FormGroup>
  );
};

export default AppInput;
