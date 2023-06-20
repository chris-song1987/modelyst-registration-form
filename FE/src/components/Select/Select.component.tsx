import MenuItem from "@mui/material/MenuItem";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import MUISelect from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

export type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  name: string;
  control: Control<any>;
  label?: string;
  errorText?: string;
  error?: boolean;
  options?: Option[];
  rules?: Record<string, any>;
};

const Select = ({
  name,
  control,
  rules = {},
  options = [],
  label = "",
  error = false,
  errorText = "",
  ...props
}: SelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl error={error}>
          <InputLabel id={`select-helper-label-${name}`}>{label}</InputLabel>
          <MUISelect
            labelId={`select-helper-label-${name}`}
            id={`select-helper-${name}`}
            label={label}
            {...field}
            {...props}
          >
            {options.map(({ value, label }: Option) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </MUISelect>
          <FormHelperText>{error && errorText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default Select;
