import { useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React from "react";
import {
  FadeInAnimator,
  SlideInAnimator,
} from "../../animation-engine/AnimatorPresets";
import AddClientModal from "../../components/AddClientModal/AddClientModal";
import AddProjectModal from "../../components/AddProjectModal/AddProjectModal";
import ClientTable from "../../components/ClientTable/ClientTable";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { GET_CLIENTS_GQ } from "../../queries/clientQueries";
import { GET_PROJECTS_GQ } from "../../queries/projectQueries";
import { Project } from "../../types/ProjectTypes";
import SButton from "../../ui/Button/Button";
import Navbar from "../../ui/Navbar/Navbar";
import "./DashboardStyles.scss";

interface GetProjectsInterface {
  allProjects: [Project];
}

function Dashboard() {
  const { loading, error, data } = useQuery(GET_CLIENTS_GQ);

  const [openAddClientModal, setOpenAddClientModal] =
    React.useState<boolean>(false);
  const [openAddProjModal, setOpenAddProjModal] =
    React.useState<boolean>(false);

  const {
    data: allProjects,
    loading: projectsLoading,
    error: projectsError,
  } = useQuery<GetProjectsInterface>(GET_PROJECTS_GQ);

  return (
    <FadeInAnimator time={0.25}>
      <div className="dashboardContainer">
        <Navbar />
        <div className="addButtonsContainer">
          <h3
            style={{
              fontFamily: "Inter",
              fontWeight: 500,
              padding: "10px",
              marginRight: "auto",
            }}
          >
            Projects ({allProjects?.allProjects.length})
          </h3>
          <SButton
            callback={() => setOpenAddClientModal(!openAddClientModal)}
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
            allProjects?.allProjects.map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })
          )}
        </div>
        <AnimatePresence mode="wait">
          {/* CLIENT TABLE */}
          {loading ? (
            <>
            <LinearProgress color="inherit" sx={{ width: "100%" }} />
            <h3 style={{fontWeight:500}}>Hosted on Free Server ; {"("}</h3>
            <h3 style={{}}>Servers are slow (might take over 30 seconds)</h3>
            </>
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

        <AddClientModal
          openModal={openAddClientModal}
          setOpenModal={setOpenAddClientModal}
        />
      </div>
    </FadeInAnimator>
  );
}

export default Dashboard;
