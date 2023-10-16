import "./NotFound.scss";
import BackButton from "../../components/BackButton/BackButton";
import { FadeInAnimator } from "../../animation-engine/AnimatorPresets";

function NotFound() {
  return (
    <FadeInAnimator time={0.25}>
      <div className="notFoundContainer">
        <h1>404</h1>
        <h2>Page Not Found!</h2>
        <BackButton />
      </div>
    </FadeInAnimator>
  );
}

export default NotFound;
