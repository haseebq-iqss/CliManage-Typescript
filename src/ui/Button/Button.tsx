import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material";

interface SButtonProps extends ButtonProps {
  callback?: () => void;
}

function SButton({
  children,
  callback,
  variant,
  color,
  ...rest
}: SButtonProps) {
  return (
    <Button {...rest} color={color} onClick={callback} variant={variant}>
      {children}
    </Button>
  );
}

export default SButton;
