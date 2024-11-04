import { ref, update, get, child, set } from "firebase/database";
import database from "../../firebaseConfig";

// Function to store scanned QR code data
export const storeQRData = async (id) => {
  const qrRef = ref(database, `attendance/${id}`);
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

export const checkInUserByID = async (id, qrCode = "") => {
  try {
    const attendanceRef = ref(database, "/");
    const snapshot = await get(attendanceRef);

    if (snapshot.exists()) {
      const attendanceData = snapshot.val();
      // Find the matching entry
      let updated = false;
      Object.keys(attendanceData).forEach((key) => {
        const record = attendanceData[key];
        if (record["AttendanceID"] === id) {
          // Update the check-in status and QR code used
          attendanceData[key].checkedIn = true;
          attendanceData[key].qrCode = qrCode;
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

// Function to handle check-in
export const handleCheckIn = async (id) => {
  const dbRef = ref(database, `attendance/${id}`);
  const snapshot = await get(dbRef);

  console.log(snapshot);

  if (snapshot.exists()) {
    // Update the `checkIn` field to true
    // await update(dbRef, {
    //   checkIn: true,
    // });
    return "Check-in successful.";
  } else {
    throw new Error("Record not found.");
  }
};

// Function to handle check-out
export const handleCheckOut = async (id) => {
  const dbRef = ref(database, `attendance/${id}`);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    // Update the `checkOut` field to true
    await update(dbRef, {
      checkOut: true,
    });
    return "Check-out successful.";
  } else {
    throw new Error("Record not found.");
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
