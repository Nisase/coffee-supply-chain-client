import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

const roles = [
  'Agricultor',
  'Procesador',
  'Catador',
  'Vendedor de Grano',
  'Bodega',
  'Transportista a Empacador ',
  'Empacador',
  'Transportista a Retailer',
  'Retailer',
];

function getStyles(role, personRole, theme) {
  return {
    fontWeight:
      personRole.indexOf(role) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const MultipleRolesSelect = () => {
  const theme = useTheme();
  const [personRole, setPersonRole] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonRole(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-role-label">Rol</InputLabel>
        <Select
          labelId="demo-multiple-role-label"
          id="demo-multiple-role"
          multiple
          value={personRole}
          onChange={handleChange}
          input={<OutlinedInput label="role" />}
          MenuProps={MenuProps}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role} style={getStyles(role, personRole, theme)}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleRolesSelect;
