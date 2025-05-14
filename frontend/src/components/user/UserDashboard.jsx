import React, { useState } from 'react';
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
  Alert
} from '@mui/material';

const UserDashboard = () => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('');
  const [recipient, setRecipient] = useState('');
  const [signed, setSigned] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSigned(false);
  };

  const handleSign = () => {
    if (file && docType && recipient) {
      setSigned(true);
      setShowConfirmation(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Document Authorization & Digital Signature
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
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

        <Button variant="outlined" component="label">
          Upload Document
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {file && (
          <Typography variant="body2" color="text.secondary">
            Uploaded: {file.name}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSign}
          disabled={!file || !recipient || !docType}
        >
          Sign & Authorize
        </Button>

        {signed && (
          <Alert severity="success">Document signed and sent for authorization!</Alert>
        )}
      </Box>

      <Snackbar
        open={showConfirmation}
        autoHideDuration={4000}
        onClose={() => setShowConfirmation(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Document Successfully Authorized!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserDashboard;
