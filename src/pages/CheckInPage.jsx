import { Container, Typography, TextField } from "@mui/material";
import { QrReader } from "react-qr-reader";

const CheckInPage = ({ showScanner, showSearch }) => {
  return (
    <Container>
      {showScanner && (
        <QrReader
          onResult={(result, error) => {
            if (result) console.log(result?.text);
            if (error) console.error(error);
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "100%", marginTop: "20px" }}
        />
      )}

      {showSearch && (
        <TextField
          label="Enter Student ID"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}

      {!showScanner && !showSearch && (
        <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
          Choose an action with the buttons below to get started.
        </Typography>
      )}
    </Container>
  );
};

export default CheckInPage;
