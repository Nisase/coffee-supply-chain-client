import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField, MenuItem, Select, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const SelectWrapper = ({ name, label, options, ...otherProps }) => {
  const theme = useTheme();
  const { setFieldValue } = useFormikContext();
  const [personName, setPersonName] = useState([]);

  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    setFieldValue(name, value);
  };
  const configSelect = {
    ...field,
    ...otherProps,

    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    // <div>
    <FormControl sx={{ m: 0, width: 250 }}>
      <InputLabel>{label}</InputLabel>
      <Select {...configSelect}>
        {options.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    // </div>
  );
};

export default SelectWrapper;
