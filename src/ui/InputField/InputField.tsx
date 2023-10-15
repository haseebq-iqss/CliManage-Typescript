import { TextField, InputProps, InputAdornment } from "@mui/material";

interface InputFieldProps extends InputProps {
  onChangeCb: (prop: any) => void;
  label: string | undefined;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function InputField({
  onChangeCb,
  label,
  startIcon,
  endIcon,
  ...rest
}: InputFieldProps) {
  return (
    <TextField
      InputProps={{
        ...rest,
        startAdornment: (
          <InputAdornment
            sx={{ width: "auto", height: "auto" }}
            position="start"
          >
            {startIcon}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            sx={{ width: "auto", height: "auto" }}
            position="start"
          >
            {endIcon}
          </InputAdornment>
        ),
      }}
      variant="standard"
      onChange={onChangeCb}
      sx={{ width: "100%" }}
      placeholder={label}
    />
  );
}

export default InputField;
