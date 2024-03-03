import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ClippedDrawer from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MentalHealth } from "./pages/MentalHealth";
import Feedback from "./pages/Feedback";
import Workouts from "./pages/Workouts/Workouts";
import { LandingPage } from "./pages/LandingPage";
import Cardio from "./pages/Workouts/Cardio";
import Plyometrics from "./pages/Workouts/Plyometrics";
import Strength from "./pages/Workouts/Strength";
import Stretching from "./pages/Workouts/Stretching";
import { VeteranProfile } from "./pages/VeteranProfile";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

const ProtectedApp = ({ signOut, user }) => {
  // console.log(user);
  return (
    <>
      <ClippedDrawer signOut={signOut} />
      <Routes>
        <Route exact path="/home" element={<Home user={user} />} />
        <Route exact path="/mental_health" element={<MentalHealth />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route exact path="/workouts" element={<Workouts />} />
        <Route exact path="/cardio" element={<Cardio />} />
        <Route exact path="/plyometrics" element={<Plyometrics />} />
        <Route exact path="/strength" element={<Strength />} />
        <Route exact path="/stretching" element={<Stretching />} />
        <Route
          exact
          path="/veteran_profile"
          element={<VeteranProfile user={user} />}
        />
      </Routes>
    </>
  );
};

export default withAuthenticator(ProtectedApp);
