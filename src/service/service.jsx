import { ref, update, get, child } from "firebase/database";
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

// Function to handle check-in
export const handleCheckIn = async (id) => {
  const dbRef = ref(database, `attendance/${id}`);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    // Update the `checkIn` field to true
    await update(dbRef, {
      checkIn: true,
    });
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
