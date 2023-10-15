import { gql } from "@apollo/client";

const DELETE_CLIENT_GQ = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const ADD_CLIENT_GQ = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export { DELETE_CLIENT_GQ, ADD_CLIENT_GQ };
