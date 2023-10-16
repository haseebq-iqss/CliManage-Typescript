import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SButton from "../../ui/Button/Button";

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
