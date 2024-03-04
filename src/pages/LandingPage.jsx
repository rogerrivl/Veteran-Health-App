import LogoImage from "../assets/LandingPage/logo.webp";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";

import { generateClient } from "aws-amplify/api";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { fetchUserAttributes } from "aws-amplify/auth";
import { updateUserAttributes } from "aws-amplify/auth";

export const LandingPage = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState(false); // Profile check
  const [email, setEmail] = useState();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_birth: "",
    height: "",
    weight: "",
    gender: "",
    health_goal: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function handleFetchUserAttributes() {
      try {
        const userAttributes = await fetchUserAttributes();
        setEmail(userAttributes.email);
        // Check if the profile is complete
        if (userAttributes.profile_complete) {
          navigate("/home"); // Redirect to Home page if profile is complete
        } else {
          setOpenModal(true); // Open the modal if profile is incomplete
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleFetchUserAttributes();
  }, [navigate]);

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    try {
      const attributes = await updateUserAttributes({
        userAttributes: {
          "custom:Name": formData.first_name,
          "custom:LastName": formData.last_name,
          "custom:DOB": formData.date_birth,
          "custom:Goals": formData.health_goal,
          "custom:height": formData.height,
          "custom:weight": formData.weight,
          "custom:gender": formData.gender,
        },
      });
      setOpenModal(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 18,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width="30%" // Adjusted logo size
          src={LogoImage}
          alt="Logo"
          style={{ borderRadius: "50px" }} // Adjusted border radius
        />
        <Box
          sx={{
            m: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Almost There!</Typography>
          <Typography varient="h6">
            Welcome to our community! As a valued veteran, we invite you to
            complete your profile to unlock the full potential of our platform.
            By providing your details, you'll gain access to personalized
            services, connect with fellow veterans, and receive tailored support
            for your unique needs. Let's get started on this journey together!
          </Typography>
          <Button
            sx={{ alignItems: "center" }}
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Complete Profile
          </Button>
        </Box>
      </Container>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
              Complete Profile
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleUserSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="first_name"
                    variant="outlined"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    variant="outlined"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Date of Birth"
                    name="date_birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={formData.date_birth}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Height (cm)"
                    name="height"
                    type="number"
                    variant="outlined"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Weight (kg)"
                    name="weight"
                    type="number"
                    variant="outlined"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Gender"
                    name="gender"
                    variant="outlined"
                    select
                    SelectProps={{ native: true }}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Health Goal"
                    name="health_goal"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formData.health_goal}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained">
                    Save Profile
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
};
