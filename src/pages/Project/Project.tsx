import { useMutation, useQuery } from "@apollo/client";
import { DeleteForever, Save, SwapVert } from "@mui/icons-material";
import {
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FadeInAnimator } from "../../animation-engine/AnimatorPresets";
import BackButton from "../../components/BackButton/BackButton";
import ClientCard from "../../components/ClientCard/ClientCard";
import {
  DELETE_PROJECT_GQ,
  UPDATE_PROJECT_GQ,
} from "../../mutations/projectMutation";
import { GET_PROJECTS_GQ, GET_PROJECT_GQ } from "../../queries/projectQueries";
import { Project as ProjectTypes } from "../../types/ProjectTypes";
import SButton from "../../ui/Button/Button";
import "./ProjectStyles.scss";

interface GetProjectInterface {
  project: ProjectTypes;
}

function Project() {
  const { pid } = useParams();

  const navigate = useNavigate();

  const [newStatus, setNewStatus] = React.useState("");

  const { data, loading, error } = useQuery<GetProjectInterface>(
    GET_PROJECT_GQ,
    {
      variables: {
        id: pid,
      },
    }
  );

  //  DELETE MUTATION
  const [deleteProject] = useMutation(DELETE_PROJECT_GQ, {
    variables: {
      id: pid,
    },
    onCompleted: () => {
      navigate("/dashboard");
    },
    refetchQueries: [{ query: GET_PROJECTS_GQ }],
  });

  // UPDATE MUTATION
  const [updateProject] = useMutation(UPDATE_PROJECT_GQ, {
    variables: {
      id: pid,
      status: newStatus,
    },
    refetchQueries: [{ query: GET_PROJECT_GQ }],
    onCompleted: () => {
      setNewStatus("");
    },
  });

  if (loading) {
    return <LinearProgress sx={{ width: "100%" }} />;
  }

  if (error) {
    return <h3>Error Occured!</h3>;
  }

  if (!loading && !error) {
    return (
      <AnimatePresence mode="wait">
        <FadeInAnimator time={0.25}>
          <div className="projectContainer">
            <div className="projectOptions">
              <BackButton />
              <SButton
                callback={deleteProject}
                variant="outlined"
                startIcon={<DeleteForever />}
              >
                Delete Project
              </SButton>
            </div>
            <h1>{data?.project?.name}</h1>

            <div className="statusOptions">
              <h2>
                Status:{" "}
                <span
                  style={{
                    color:
                      data?.project.status === "Not Started"
                        ? "crimson"
                        : data?.project.status === "In Progress"
                        ? "blueviolet"
                        : "green",
                  }}
                >
                  {data?.project.status}
                </span>
              </h2>
            </div>

            <h4>
              Description: <span>{data?.project.description}</span>
            </h4>
            <div className="changeStatus">
              <h3>Change Status: </h3>
              <Select
                value={newStatus}
                label="Age"
                variant="standard"
                onChange={(e: SelectChangeEvent<any>) =>
                  setNewStatus(e.target.value)
                }
                startAdornment={
                  <SwapVert sx={{ cursor: "pointer", marginRight: 2 }} />
                }
              >
                <MenuItem value={"new"}>Not Started</MenuItem>
                <MenuItem value={"progress"}>In Progress</MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
              </Select>
            </div>
            {newStatus !== "" && (
              <SButton
                callback={updateProject}
                variant="outlined"
                startIcon={<Save />}
              >
                Update Project ?
              </SButton>
            )}
            <br />
            <ClientCard client={data?.project.client} />
          </div>
        </FadeInAnimator>
      </AnimatePresence>
    );
  }
}

export default Project;
