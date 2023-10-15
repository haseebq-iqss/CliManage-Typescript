import { Box } from "@mui/material";
import React from "react";

interface FormProps {
  handleFunction: Function;
  children: React.ReactNode;
}

function Form({ handleFunction, children }: FormProps) {
  return (
    <Box
      onSubmit={(e: React.FormEvent<HTMLDivElement>) => handleFunction(e)}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
      component={"form"}
    >
      {children}
    </Box>
  );
}

export default Form;
