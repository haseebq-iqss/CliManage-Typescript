import React from "react";
import "./LandingStyles.scss";
import { useNavigate } from "react-router-dom";
import { FadeInAnimator } from "../../animation-engine/AnimatorPresets";

function Landing() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      navigate("/dashboard");
      return clearInterval(interval);
    }, 3000);
  }, []);
  return (
    <>
    <FadeInAnimator time={0.25}>
      <div className="landingContainer">
        <h1>CL!MANAGE</h1>
        <h6>Project Management Made Easy.</h6>
      </div>
      </FadeInAnimator>
    </>
  );
}

export default Landing;
