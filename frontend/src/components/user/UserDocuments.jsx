import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem("userDocuments")) || [];
    setDocuments(savedDocs);
  }, []);

  const handleDelete = (id) => {
    const filteredDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(filteredDocs);
    localStorage.setItem("userDocuments", JSON.stringify(filteredDocs));
  };

  const handleClearAll = () => {
    localStorage.removeItem("userDocuments");
    setDocuments([]);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
          Your Authorized Documents
        </Typography>

        {documents.length === 0 ? (
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
            No documents signed yet.
          </Typography>
        ) : (
          <>
            <List>
              {documents.map(({ id, name, type, recipient, signedAt }) => (
                <React.Fragment key={id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${name} (${type})`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Recipient: {recipient}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.secondary">
                            Signed At: {signedAt}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>

            <Box textAlign="center" mt={3}>
              <Button variant="outlined" color="error" onClick={handleClearAll}>
                Clear All Documents
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default UserDocuments;
