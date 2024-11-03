import { useState } from "react";
import { Container, Typography, TextField } from "@mui/material";
import { QrReader } from "react-qr-reader";

const CheckInPage = ({ showScanner, showSearch }) => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <Container
      sx={{
        padding: "0px !important",
        margin: "0px !important",
        width: "100%",
        height: "100vh",
        maxWidth: "unset !important",
      }}
    >
      {showScanner && (
        <QrReader
          onResult={(result, error) => {
            if (result) {
              setScannedData(result?.text);
              setError(null); // Clear any previous error
            }
            if (error) {
              console.error(error);
              setError("Scanning failed. Please try again.");
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
          videoContainerStyle={{
            // height: "100vh",
            paddingTop: "0px",
          }}
          videoStyle={{ height: "100vh", position: "unset" }}
        />
      )}

      {showSearch && (
        <TextField
          label="Enter Student ID"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ marginTop: "20px" }}
        />
      )}

      {/* Feedback display */}
      {scannedData && (
        <Typography variant="h6" color="primary" align="center">
          Scanned Data: {scannedData}
        </Typography>
      )}

      {error && (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      )}

      {!showScanner && !showSearch && !scannedData && !error && (
        <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
          Choose an action with the buttons below to get started.
        </Typography>
      )}
    </Container>
  );
};

export default CheckInPage;
