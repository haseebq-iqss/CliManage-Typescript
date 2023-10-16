import { Box, Divider, Modal as RootModal, Typography } from "@mui/material";

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
          width: {xs:"90vw",sm:"90vw",md:"75vw",lg:"50vw"},
          height: "auto",
          backgroundColor: "white",
          borderRadius: 2,
          gap: 2,
          // p: "2.5% 2.5%",
          p: {xs:"5% 5%",sm:"5% 5%",md:"5% 2.5%",lg:"2.5% 2.5%"},
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
