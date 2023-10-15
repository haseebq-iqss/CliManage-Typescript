import { useQuery } from "@apollo/client";
import {
  LinearProgress,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { Add, Email, Person, Phone } from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";
import React from "react";
import {
  FadeInAnimator,
  SlideInAnimator,
} from "../../animation-engine/AnimatorPresets";
import ClientTable from "../../components/ClientTable/ClientTable";
import { GET_CLIENTS_GQ } from "../../queries/clientQueries";
import Navbar from "../../ui/Navbar/Navbar";
import "./DashboardStyles.scss";
import { ADD_CLIENT_GQ } from "../../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS_GQ } from "../../queries/projectQueries";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import SButton from "../../ui/Button/Button";
import Modal from "../../ui/Modal/Modal";
import InputField from "../../ui/InputField/InputField";
import Form from "../../ui/Form/Form";
import AddProjectModal from "../../components/AddProjectModal/AddProjectModal";

function Dashboard() {
  const { loading, error, data } = useQuery(GET_CLIENTS_GQ);

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openAddProjModal, setOpenAddProjModal] =
    React.useState<boolean>(false);
  const [clientName, setClientName] = React.useState<string>("");
  const [clientEmail, setClientEmail] = React.useState<string>("");
  const [clientPhone, setClientPhone] = React.useState<number | null>();

  const {
    data: allProjects,
    loading: projectsLoading,
    error: projectsError,
  } = useQuery(GET_PROJECTS_GQ);

  const [addClient] = useMutation(ADD_CLIENT_GQ);

  function HandleAddClient(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    addClient({
      variables: {
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
      },
      refetchQueries: [{ query: GET_CLIENTS_GQ }],
    });
    setOpenModal(!openModal);

    // RESET FORM
    setClientName("");
    setClientEmail("");
    setClientPhone(null);
  }

  return (
    <FadeInAnimator time={0.25}>
      <div className="dashboardContainer">
        <Navbar />
        <div className="addButtonsContainer">
        <h3 style={{ fontFamily: "Inter", fontWeight: 500, padding: "10px", marginRight:"auto" }}>
          Projects ({allProjects?.allProjects.length})
        </h3>
          <SButton
            callback={() => setOpenModal(!openModal)}
            variant="outlined"
            startIcon={<Add />}
            color={"primary"}
          >
            Add Client
          </SButton>
          <SButton
            callback={() => setOpenAddProjModal(!openAddProjModal)}
            variant="outlined"
            startIcon={<Add />}
            color={"primary"}
          >
            Add Project
          </SButton>
        </div>
        {/* PROJECTS */}
        <div className="projectCardsContainer">
          {projectsLoading ? (
            <LinearProgress color="inherit" sx={{ width: "100%" }} />
          ) : projectsError ? (
            <h1>Error!</h1>
          ) : (
            allProjects &&
            allProjects?.allProjects.map((project: any) => {
              return <ProjectCard key={project.id} project={project} />;
            })
          )}
        </div>
        <AnimatePresence mode="wait">
          {/* CLIENT TABLE */}
          {loading ? (
            <LinearProgress color="inherit" sx={{ width: "100%" }} />
          ) : error ? (
            <h1>Error!</h1>
          ) : (
            data && (
              <SlideInAnimator time={0.25}>
                <ClientTable clients={data?.allClients} />
              </SlideInAnimator>
            )
          )}
        </AnimatePresence>

        <AddProjectModal
          openModal={openAddProjModal}
          setOpenModal={setOpenAddProjModal}
          clientData={data?.allClients}
        />

        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          header={"Add Client"}
        >
          <Form handleFunction={HandleAddClient}>
            <InputField
              required
              defaultValue={clientName}
              type="text"
              label={"Name"}
              onChangeCb={(e: any) => setClientName(e.target.value)}
              endIcon={<Person />}
            />
            <InputField
              required
              defaultValue={clientEmail}
              type="email"
              label={"Email"}
              onChangeCb={(e: any) => setClientEmail(e.target.value)}
              endIcon={<Email />}
            />
            <InputField
              required
              defaultValue={clientPhone}
              type="number"
              label={"Phone"}
              onChangeCb={(e: any) => setClientPhone(e.target.value)}
              endIcon={<Phone />}
            />
            <Button type="submit" variant="outlined" startIcon={<Add />}>
              Add Client
            </Button>
          </Form>
        </Modal>
      </div>
    </FadeInAnimator>
  );
}

export default Dashboard;
