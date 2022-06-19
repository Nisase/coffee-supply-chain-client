import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const TextfieldWrapper = ({ name, disabled, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextfield = {
    ...field,
    ...disabled,
    // ...value,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
