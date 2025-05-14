import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// Custom validation function
const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const UserLogin = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Login
        </Typography>

        {serverError && (
          <Typography color="error" align="center">
            {serverError}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" align="center">
            {successMessage}
          </Typography>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError("");
            setSuccessMessage("");

            try {
              const response = await axios.post(
                "http://localhost:3000/login",
                values
              );
              console.log("Login Success:", response.data);

              if (response.data.user) {
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
                setSuccessMessage(response.data.message);
                // Add these lines to navigate after successful login
                setTimeout(() => {
                  navigate("/dashboard"); // Use the route path you defined for your appointment page
                }, 1000); // Short delay to show the success message
              } else {
                setServerError("Login failed: User data is missing");
              }
            } catch (error) {
              console.error("Login Error:", error);
              setServerError(
                error.response?.data?.message || "Invalid credentials!"
              );
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
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
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
