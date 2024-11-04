import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import database from "../../firebaseConfig";

const LandingPage = () => {
  const [totalCheckIns, setTotalCheckIns] = useState(0);

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
      } else {
        setTotalCheckIns(0);
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Landing Page</h1>
      <p>Total Check-Ins: {totalCheckIns}</p>
    </div>
  );
};

export default LandingPage;
