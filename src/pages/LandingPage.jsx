import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import database from "../../firebaseConfig";
import bg from "../assets/kp.png";
import { Box } from "@mui/material";
import "./LandingPage.css";

const LandingPage = () => {
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const attendanceRef = ref(database, "/");

    // Set up a real-time listener on the attendance reference
    const unsubscribe = onValue(attendanceRef, (snapshot) => {
      if (snapshot.exists()) {
        const attendanceData = snapshot.val();
        // Count entries where checkedIn is true
        const checkInCount = Object.values(attendanceData).filter(
          (record) => record.checkedIn
        ).length;
        setTotalCheckIns(checkInCount);
        setIsUpdated(true);
      } else {
        setTotalCheckIns(0);
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isUpdated) {
      const timeout = setTimeout(() => setIsUpdated(false), 500); // Adjust duration as needed
      return () => clearTimeout(timeout);
    }
  }, [isUpdated]);

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <img src={bg} alt="bg" style={{ display: "block" }} />
      <Box
        // className="layered-text teko-normal"
        className="animate-charcter teko-normal"
      >
        {totalCheckIns}
      </Box>
    </Box>
  );
};

export default LandingPage;
