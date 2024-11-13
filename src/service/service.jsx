import { ref, update, get, child, set, onValue } from "firebase/database";
import database from "../../firebaseConfig";

// Function to store scanned QR code data
export const storeQRData = async (id) => {
  const qrRef = ref(database, `/${id}`);
  const snapshot = await get(qrRef);

  if (snapshot.exists()) {
    // If record exists, update it with the QR code and timestamp
    await update(qrRef, {
      qrCode: id,
      timestamp: Date.now(),
    });
    return "QR data stored successfully.";
  } else {
    throw new Error("Record not found.");
  }
};

export const checkInUserByID = async (id) => {
  try {
    const attendanceRef = ref(database, "/");
    const snapshot = await get(attendanceRef);

    if (snapshot.exists()) {
      const attendanceData = snapshot.val();
      // Find the matching entry
      let updated = false;
      Object.keys(attendanceData).forEach((key) => {
        const record = attendanceData[key];
        if (record["MSCB_MSSV"].toString() === id.toString()) {
          // Update the check-in status and QR code used
          attendanceData[key].checkedIn = true;
          updated = true;
        }
      });

      if (updated) {
        // Push the updated attendance data back to Firebase
        await set(attendanceRef, attendanceData);
        return "Check-in successful!";
      } else {
        return "ID not found in the database.";
      }
    } else {
      return "No data available.";
    }
  } catch (error) {
    console.error("Error during check-in:", error);
    return "Failed to check in. Please try again.";
  }
};

export const checkOutUserByID = async (id) => {
  try {
    const attendanceRef = ref(database, "/");
    const snapshot = await get(attendanceRef);

    if (snapshot.exists()) {
      const attendanceData = snapshot.val();
      let updated = false;
      Object.keys(attendanceData).forEach((key) => {
        const record = attendanceData[key];
        if (record["MSCB_MSSV"].toString() === id.toString()) {
          attendanceData[key].checkedOut = true;
          updated = true;
        }
      });

      if (updated) {
        await set(attendanceRef, attendanceData);
        return "Check-out successful!";
      } else {
        return "ID not found in the database.";
      }
    } else {
      return "No data available.";
    }
  } catch (error) {
    console.error("Error during check-out:", error);
    return "Failed to check out. Please try again.";
  }
};

// Function to get total number of entries
export const getTotalAttendance = async () => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, "attendance"));
  if (snapshot.exists()) {
    return Object.keys(snapshot.val()).length;
  } else {
    return 0; // Return 0 if no data exists
  }
};

export const resetDatabase = async () => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, "/"));

  console.log(snapshot);

  if (snapshot.exists()) {
    const updates = {};

    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      // Set `checkedIn` and `checkedOut` fields to `null` to delete them
      updates[`${key}/checkedIn`] = null;
      updates[`${key}/checkedOut`] = null;
    });

    console.log("Updates to be made:", updates);

    try {
      await update(dbRef, updates);
      console.log(
        "Database reset: 'checkedIn' and 'checkedOut' fields removed."
      );
    } catch (error) {
      console.error("Failed to reset database:", error);
    }
  } else {
    console.log("No attendance data found to reset.");
  }
};

const onAttendanceByThanhPhan = (thanhPhanValue, callback) => {
  const dbRef = ref(database, "/");

  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      const attendanceData = snapshot.val();
      const filteredAttendance = Object.values(attendanceData).filter(
        (record) =>
          record.ThanhPhan === thanhPhanValue && record.checkedIn === true
      );
      callback(filteredAttendance.length);
    } else {
      callback(0);
    }
  });
};

// Usage examples with real-time updates
export const onAttendanceDuongNhien = (callback) => {
  onAttendanceByThanhPhan("Đương nhiên", callback);
};

export const onAttendanceChiDinh = (callback) => {
  onAttendanceByThanhPhan("Chỉ định", callback);
};

export const onAttendanceChinhThuc = (callback) => {
  onAttendanceByThanhPhan("Chính thức", callback);
};

export const onAttendanceDuKhuyet = (callback) => {
  onAttendanceByThanhPhan("Dự khuyết", callback);
};
