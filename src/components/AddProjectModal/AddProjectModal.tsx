import { useMutation } from "@apollo/client";
import {
  Add,
  Description,
  Note,
  Percent,
  PersonAdd,
} from "@mui/icons-material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent } from "react";
import { SlideInAnimator } from "../../animation-engine/AnimatorPresets";
import { ADD_PROJECT_GQ } from "../../mutations/projectMutation";
import { GET_PROJECTS_GQ } from "../../queries/projectQueries";
import { Client } from "../../types/ClientTypes";
import SButton from "../../ui/Button/Button";
import Form from "../../ui/Form/Form";
import InputField from "../../ui/InputField/InputField";
import Modal from "../../ui/Modal/Modal";
import { ProjectStatus } from "../../types/ProjectTypes";

interface AddProjectModalInterface {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  clientData: [Client];
}

function AddProjectModal({
  openModal,
  setOpenModal,
  clientData,
}: AddProjectModalInterface) {
  const [projectName, setProjectName] = React.useState<string | null>("");
  const [projectDescription, setProjectDescription] = React.useState<
    string | null
  >("");
  const [projectClientId, setProjectClientId] = React.useState<string>("");
  const [projectStatus, setProjectStatus] =
    React.useState<ProjectStatus>("new");

  const [addProject] = useMutation(ADD_PROJECT_GQ);

  function HandleAddProject(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();

    if (projectClientId !== "") {
      addProject({
        variables: {
          name: projectName,
          description: projectDescription,
          clientId: projectClientId,
          status: projectStatus,
        },
        refetchQueries: [{ query: GET_PROJECTS_GQ }],
      });
      setOpenModal(!openModal);
    } else {
      alert("Please provide a client!");
    }
  }

  return (
    <SlideInAnimator time={0.15}>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        header={"Add Project"}
      >
        <Form handleFunction={HandleAddProject}>
          <InputField
            required
            defaultValue={projectName}
            type="text"
            label={"Name"}
            onChangeCb={(e: ChangeEvent<HTMLInputElement>) =>
              setProjectName(e.target.value)
            }
            endIcon={<Note />}
          />
          <InputField
            required
            defaultValue={projectDescription}
            type="text"
            multiline
            label={"Description"}
            onChangeCb={(e: ChangeEvent<any>) =>
              setProjectDescription(e.target.value)
            }
            endIcon={<Description />}
          />
          {/* SELECT STATUS */}
          <Select
            value={projectStatus}
            label="Age"
            variant="standard"
            onChange={(e: SelectChangeEvent<any>) =>
              setProjectStatus(e.target.value)
            }
            startAdornment={<Percent sx={{ marginRight: 2 }} />}
          >
            <MenuItem value={"new"}>Not Started</MenuItem>
            <MenuItem value={"progress"}>In Progress</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
          </Select>
          {/* SELECT CLIENT */}
          <Select
            startAdornment={<PersonAdd sx={{ marginRight: 2 }} />}
            value={projectClientId}
            label="Client"
            variant="standard"
            onChange={(e: SelectChangeEvent<any>) =>
              setProjectClientId(e.target.value)
            }
          >
            {clientData?.map((client) => {
              return (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              );
            })}
          </Select>

          {/* SUBMIT BUTTON */}
          <SButton type="submit" variant="outlined" startIcon={<Add />}>
            Add Project
          </SButton>
        </Form>
      </Modal>
    </SlideInAnimator>
  );
}

export default AddProjectModal;
