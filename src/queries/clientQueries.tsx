import { gql } from "@apollo/client";

const GET_CLIENTS_GQ = gql`
  query {
    allClients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS_GQ };
