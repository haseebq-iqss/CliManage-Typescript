import { useNavigate } from "react-router-dom";
import SButton from "../../ui/Button/Button";
import "./ProjectCardStyles.scss";
import { Project } from "../../types/ProjectTypes";

interface ProjectCardInterface {
  project: Project;
}

function ProjectCard({ project }: ProjectCardInterface) {
  const navigate = useNavigate();

  return (
    <div className="projCardContainer">
      <div className="status-view-column">
        <h3>{project?.name}</h3>
        <SButton
          callback={() => navigate(`/project/${project?.id}`)}
          variant="outlined"
        >
          View
        </SButton>
      </div>
      <h4>
        Status: <span>{project?.status}</span>
      </h4>
      <h5>
        Description: <span>{project?.description?.slice(0, 150)}...</span>
      </h5>
    </div>
  );
}

export default ProjectCard;
