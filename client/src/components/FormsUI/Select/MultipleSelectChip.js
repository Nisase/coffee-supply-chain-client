import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useField, useFormikContext } from 'formik';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(item, items, theme) {
  return {
    fontWeight:
      items.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ name, options, ...otherProps }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const theme = useTheme();
  const [items, setItems] = React.useState([]);

  const handleChange = (event) => {

    const {
      target: { value },
    } = event;
    setFieldValue(name, typeof value === 'string' ? value.split(',') : value);
    setItems(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const configSelect = {
    ...field,
    ...otherProps,
    multiple: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }  

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">{name}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}

          {...configSelect}
        >
          {options.map((item) => (
            <MenuItem
              key={item.key}
              value={item.key}
              style={getStyles(item.key, items, theme)}
            >
              {item.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
