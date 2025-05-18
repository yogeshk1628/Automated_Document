import React, { useState, useEffect } from "react";
import API from "../../api/api"
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";

const UserSettings = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          fullName: parsedUser.fullName || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
        });
      } catch (err) {
        console.error("Error parsing stored user data:", err);
      }
    }
  }, []);

  // Form validation function
  const validate = (values) => {
    let errors = {};
    if (!values.fullName.trim()) errors.fullName = "Full Name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(values.phone)) {
      errors.phone = "Phone number is invalid";
    }
    return errors;
  };

  // Handle form submit (update user)
  const handleUpdate = async (values, { setSubmitting }) => {
    setServerError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Assuming your backend API URL and user ID are known
      // You can get user ID from localStorage or other auth means
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !storedUser._id) {
        setServerError("User not logged in properly");
        setLoading(false);
        setSubmitting(false);
        return;
      }

      const userId = storedUser._id;

      const response = await API.put(
        `/update/${userId}`,
        values
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message || "User updated successfully");
        // Update localStorage with new user data
        const updatedUser = response.data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUserData({
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          phone: updatedUser.phone,
        });
      } else {
        setServerError("Update failed");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Server error while updating"
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Settings
        </Typography>

        {serverError && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {serverError}
          </Typography>
        )}

        {successMessage && (
          <Typography color="primary" align="center" sx={{ mb: 2 }}>
            {successMessage}
          </Typography>
        )}

        <Formik
          enableReinitialize
          initialValues={userData}
          validate={validate}
          onSubmit={handleUpdate}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                margin="normal"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                label="Phone"
                name="phone"
                type="tel"
                fullWidth
                margin="normal"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Update"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserSettings;
