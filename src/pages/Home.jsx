import * as React from "react";
import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import UpcomingOutlinedIcon from "@mui/icons-material/UpcomingOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { fetchUserAttributes } from "aws-amplify/auth";
import { format } from "date-fns";
import {
  LinearProgress,
  Typography,
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Container,
  Divider,
  ButtonBase,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import VeteranPic from "../assets/Dashboard/veteran.webp";
import { useNavigate } from "react-router-dom";
import { listWorkouts } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import {
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../graphql/mutations";
const client = generateClient();

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const Home = () => {
  const [progress, setProgress] = React.useState(10);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_birth: "",
    height: "",
    weight: "",
    gender: "",
    health_goal: "",
  });
  const [getWorkouts, setGetWorkout] = useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutReps, setWorkoutReps] = useState("");
  const [workoutTime, setWorkoutTime] = useState("");
  const [feeling, setFeeling] = useState("Amazing");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch user attributes and workouts
  useEffect(() => {
    const handleFetchUserAttributes = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        setFormData({
          first_name: userAttributes["custom:Name"] || "",
          last_name: userAttributes["custom:LastName"] || "",
          date_birth: userAttributes["custom:DOB"] || "",
          height: userAttributes["custom:height"] || "",
          weight: userAttributes["custom:weight"] || "",
          gender: userAttributes["custom:gender"] || "",
          health_goal: userAttributes["custom:Goals"] || "",
        });
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    const handleWorkoutDisplay = async () => {
      try {
        const result = await client.graphql({ query: listWorkouts });
        setGetWorkout(result.data.listWorkouts.items);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    handleFetchUserAttributes();
    handleWorkoutDisplay();
  }, []);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Add your workout submit logic here
  //Submit data to the DB
  const handleWorkoutSubmit = async () => {
    console.log("Submitting workout:", { workoutName, feeling });
    setWorkoutName("");
    setFeeling("");
    try {
      const result = await client.graphql({
        query: createWorkout,
        variables: {
          input: {
            workout_name: workoutName,
            feel: feeling,
          },
        },
      });
      console.log(result); // Process the result as needed
    } catch (error) {
      console.error("Error adding todo", error);
    }

    // Add your submit logic here
    handleModalClose();
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "end" }}>
          Dashboard Overview
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(to left, #fff, #E1FAF6,#91C7DB)",
            width: "100%",
            maxWidth: 800,
            height: "auto",
            boxShadow: 1,
            borderRadius: 2,
            mb: 3,
            mt: 2,
            p: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ m: 1 }}>
              Hello, {formData.first_name}
            </Typography>
            <Typography variant="body1" sx={{ m: 1 }}>
              Have a nice day and don't forget to take care of your health!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/veteran_profile")}
              sx={{ mt: isMobile ? 2 : 0 }}
            >
              Update Your Profile!
            </Button>
          </Box>
          <Box
            sx={{
              width: isMobile ? "100%" : 180,
              height: isMobile ? "auto" : 180,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              mt: isMobile ? 2 : 0,
            }}
          >
            <img
              src={VeteranPic}
              alt="Veteran"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: 4,
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: 3,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <ButtonBase
            onClick={handleModalOpen}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(to left, #E1FAF6, #91C7DB)",
              width: isMobile ? "80%" : 250,
              height: 120,
              boxShadow: 1,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <AddCircleOutlinedIcon />
            <Typography sx={{ m: 2 }}>Add Exercise</Typography>
          </ButtonBase>
          <ButtonBase
            onClick={() => navigate("/mental_health")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(to right, #E1FAF6, #91C7DB)",
              width: isMobile ? "80%" : 250,
              height: 120,
              boxShadow: 1,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <UpcomingOutlinedIcon />
            <Typography sx={{ m: 2 }}>Mental Health Resources</Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(to top, #E1FAF6, #91C7DB)",
              width: isMobile ? "80%" : 250,
              height: 120,
              boxShadow: 1,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <PhoneOutlinedIcon />
            <Typography sx={{ mt: 2 }}>Suicide Prevention</Typography>
            <Typography sx={{}}>
              Dial/Text <b>998</b>
            </Typography>
          </ButtonBase>
        </Box>

        <Box
          sx={{
            position: "relative",
            m: 8,
            background: "linear-gradient(to right, #fff, #E1FAF6,#91C7DB)",
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", pb: 7 }}>
            Your Last Workouts
          </Typography>

          <TableContainer
            sx={{
              width: 800,
              background: "linear-gradient(to bottom, #E1FAF6, #91C7DB)",
            }}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Workout Name</TableCell>
                  <TableCell align="right">Feeling</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getWorkouts.map((getWorkout, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell component="th" scope="row">
                        {getWorkout.workout_name}
                      </TableCell>
                      <TableCell align="right">{getWorkout.feel}</TableCell>
                      <TableCell align="right">
                        {format(new Date(getWorkout.createdAt), "dd MMM yyyy")}
                      </TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              background: "linear-gradient(to bottom, #E1FAF6, #91C7DB)",
              boxShadow: 24,
              borderRadius: 5,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Workout
            </Typography>
            <TextField
              label="Workout Name"
              variant="outlined"
              fullWidth
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Workout Repetitions"
              variant="outlined"
              fullWidth
              value={workoutReps}
              onChange={(e) => setWorkoutReps(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Workout Time"
              variant="outlined"
              fullWidth
              value={workoutTime}
              onChange={(e) => setWorkoutTime(e.target.value)}
              sx={{ mt: 2 }}
            />
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">How are you feeling?</FormLabel>
              <RadioGroup
                row
                aria-label="feeling"
                name="row-radio-buttons-group"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
              >
                <FormControlLabel
                  value="Amazing"
                  control={<Radio />}
                  label="Amazing"
                />
                <FormControlLabel
                  value="Okay"
                  control={<Radio />}
                  label="Okay"
                />
                <FormControlLabel
                  value="Tired"
                  control={<Radio />}
                  label="Tired"
                />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleWorkoutSubmit}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};
