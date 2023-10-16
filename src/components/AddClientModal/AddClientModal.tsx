import { useMutation } from "@apollo/client";
import { Add, Email, Person, Phone } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { ADD_CLIENT_GQ } from "../../mutations/clientMutations";
import { GET_CLIENTS_GQ } from "../../queries/clientQueries";
import Form from "../../ui/Form/Form";
import InputField from "../../ui/InputField/InputField";
import Modal from "../../ui/Modal/Modal";

interface AddClientModalInterface {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

function AddClientModal({ openModal, setOpenModal }: AddClientModalInterface) {
  const [clientName, setClientName] = React.useState<string>("");
  const [clientEmail, setClientEmail] = React.useState<string>("");
  const [clientPhone, setClientPhone] = React.useState<number | null>();

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
  );
}

export default AddClientModal;
