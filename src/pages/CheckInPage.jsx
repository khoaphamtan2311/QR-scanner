import { useState } from "react";
import {
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { QrReader } from "react-qr-reader";

function QRScannerComponent() {
  const [showScanner, setShowScanner] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApiCall = () => {
    // Replace this with your API call logic
    console.log("Calling API with scanned data:", scannedData);
    setDialogOpen(false);
  };

  return (
    <Container
      sx={{
        padding: "0px !important",
        margin: "0px !important",
        width: "100vw",
        height: "100vh",
        maxWidth: "unset !important",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {showScanner && (
        <QrReader
          onResult={(result, error) => {
            if (result) {
              setScannedData(result?.text);
              setError(null);
              setDialogOpen(true); // Open dialog on success
            }
            if (error) {
              console.error(error);
              setError("Scanning failed. Please try again.");
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
          videoContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          videoStyle={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {/* Centered error message */}
      {error && (
        <Typography
          variant="h6"
          color="error"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {error}
        </Typography>
      )}

      {/* Dialog for scanned data */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Scanned Data</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Data: {scannedData}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApiCall} color="primary" variant="contained">
            Check Attendance
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default QRScannerComponent;
