import React from "react";
import SButton from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

function BackButton() {
  const navigate = useNavigate();
  return (
    <SButton
      startIcon={<ArrowBack />}
      callback={() => navigate(-1)}
      variant="outlined"
    >
      Go Back
    </SButton>
  );
}

export default BackButton;
