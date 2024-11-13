import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import database from "../../firebaseConfig";
import bg from "../assets/kp.png";
import { Box, Typography } from "@mui/material";
import "./LandingPage.css";
import {
  onAttendanceChiDinh,
  onAttendanceChinhThuc,
  onAttendanceDuKhuyet,
  onAttendanceDuongNhien,
} from "../service/service";

const LandingPage = () => {
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  const [duongNhienCount, setDuongNhienCount] = useState(0);
  const [chiDinhCount, setChiDinhCount] = useState(0);
  const [chinhThucCount, setChinhThucCount] = useState(0);
  const [duKhuyetCount, setDuKhuyetCount] = useState(0);

  useEffect(() => {
    onAttendanceDuongNhien(setDuongNhienCount);
    onAttendanceChiDinh(setChiDinhCount);
    onAttendanceChinhThuc(setChinhThucCount);
    onAttendanceDuKhuyet(setDuKhuyetCount);
  }, []);

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
      <Box className="right-info">
        {/* Single row for Tỷ lệ có mặt */}
        <Typography className="text-color oswald-normal">
          Tỷ lệ có mặt:{" "}
          <span className="animated-value">
            {(totalCheckIns / 200).toFixed(2)}%
          </span>
        </Typography>

        {/* Row with Đương nhiên and Chỉ định */}
        <Box className="pair-row">
          <Typography className="text-color oswald-normal">
            Đương nhiên:{" "}
            <span className="animated-value">{duongNhienCount}</span>
          </Typography>
          <Typography className="text-color  oswald-normal">
            Chỉ định: <span className="animated-value">{chiDinhCount}</span>
          </Typography>
        </Box>

        {/* Row with Chính thức and Dự khuyết */}
        <Box className="pair-row">
          <Typography className="text-color oswald-normal">
            Chính thức: <span className="animated-value">{chinhThucCount}</span>
          </Typography>
          <Typography className="text-color oswald-normal">
            Dự khuyết: <span className="animated-value">{duKhuyetCount}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
