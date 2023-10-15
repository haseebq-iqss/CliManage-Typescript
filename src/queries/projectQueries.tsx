import { gql } from "@apollo/client";

const GET_PROJECTS_GQ = gql`
  query {
    allProjects {
      id
      name
      description
      status
    }
  }
`;

const GET_PROJECT_GQ = gql`
  query getProject($id: ID!){
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS_GQ, GET_PROJECT_GQ };
