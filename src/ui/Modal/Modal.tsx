import { Box, Divider, Modal as RootModal, Typography } from "@mui/material";
import React from "react";

function Modal({ children, openModal, setOpenModal, header }: any) {
  return (
    <RootModal
      sx={{ display: "grid", placeItems: "center" }}
      open={openModal}
      onClose={() => setOpenModal(!openModal)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "50vw",
          height: "auto",
          backgroundColor: "white",
          borderRadius: 2,
          gap: 2,
          p: "2.5% 2.5%",
        }}
      >
        <Typography sx={{ fontWeight: 500 }} variant="h5" component="h5">
          {header}
        </Typography>
        <Divider sx={{ width: "100%" }} />
        {children}
      </Box>
    </RootModal>
  );
}

export default Modal;