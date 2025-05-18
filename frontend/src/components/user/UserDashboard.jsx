import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";

const UserDashboard = () => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signed, setSigned] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSigned(false);
  };

  const handleSign = () => {
    if (file && docType && recipient) {
      // Save document info to localStorage
      const savedDocs = JSON.parse(localStorage.getItem("userDocuments")) || [];
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: docType,
        recipient,
        signedAt: new Date().toLocaleString(),
      };
      savedDocs.push(newDoc);
      localStorage.setItem("userDocuments", JSON.stringify(savedDocs));

      setSigned(true);
      setShowConfirmation(true);

      // Clear inputs
      setFile(null);
      setDocType("");
      setRecipient("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
          Document Authorization & Digital Signature
        </Typography>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Recipient Email"
            variant="outlined"
            fullWidth
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="doc-type-label">Document Type</InputLabel>
            <Select
              labelId="doc-type-label"
              value={docType}
              label="Document Type"
              onChange={(e) => setDocType(e.target.value)}
            >
              <MenuItem value="NDA">NDA</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Invoice">Invoice</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" component="label" sx={{ textTransform: "none" }}>
            Upload Document
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          {file && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              Uploaded: {file.name}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSign}
            disabled={!file || !recipient || !docType}
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            Sign & Authorize
          </Button>

          {signed && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Document signed and sent for authorization!
            </Alert>
          )}
        </Box>

        <Snackbar
          open={showConfirmation}
          autoHideDuration={4000}
          onClose={() => setShowConfirmation(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Document Successfully Authorized!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UserDashboard;
