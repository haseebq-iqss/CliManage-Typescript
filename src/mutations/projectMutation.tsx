import { gql } from "@apollo/client";

const ADD_PROJECT_GQ = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      clientId
    }
  }
`;

const DELETE_PROJECT_GQ = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT_GQ = gql`
  mutation editProject($id: ID!, $status: ProjectStatusForUpdate!) {
    editProject(id: $id, status: $status) {
      id
      name
      description
      status
    }
  }
`;

export { ADD_PROJECT_GQ, DELETE_PROJECT_GQ, UPDATE_PROJECT_GQ };
