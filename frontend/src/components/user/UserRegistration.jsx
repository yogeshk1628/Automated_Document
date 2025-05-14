import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";

// Custom validation function
const validationSchema = (values) => {
  let errors = {};

  if (!values.fullName) {
    errors.fullName = "Full Name is required";
  } else if (values.fullName.length < 3) {
    errors.fullName = "Full Name must be at least 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be exactly 10 digits";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "You must accept the terms and conditions";
  }

  return errors;
};

export const UserRegistration = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Registration
        </Typography>

        {serverError && <Typography color="error" align="center">{serverError}</Typography>}
        {successMessage && <Typography color="primary" align="center">{successMessage}</Typography>}

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          validate={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setServerError("");
            setSuccessMessage("");

            try {
              const response = await axios.post("http://localhost:3000/signup", values);
              setSuccessMessage(response.data.message);
              resetForm();
            } catch (error) {
              setServerError(error.response?.data?.message || "Something went wrong!");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
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
                label="Phone Number"
                name="phone"
                fullWidth
                margin="normal"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
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

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="normal"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color="primary"
                  />
                }
                label="I accept the terms and conditions"
              />
              {touched.acceptTerms && errors.acceptTerms && (
                <Typography variant="body2" color="error">
                  {errors.acceptTerms}
                </Typography>
              )}

              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
                {isSubmitting ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
