import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Fab } from "@mui/material";
import { CameraAlt, Search, Home, ExitToApp } from "@mui/icons-material";

const Layout = ({ onScannerActivate, onSearchActivate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Floating Action Buttons */}
      <Fab
        color="primary"
        onClick={onScannerActivate}
        style={{ position: "fixed", bottom: 80, right: 20 }}
      >
        <CameraAlt />
      </Fab>
      <Fab
        color="secondary"
        onClick={onSearchActivate}
        style={{ position: "fixed", bottom: 150, right: 20 }}
      >
        <Search />
      </Fab>

      {/* Main content area */}
      <div style={{ paddingBottom: 60 }}>
        <Outlet /> {/* Render child routes here */}
      </div>

      {/* Bottom navigation bar */}
      <BottomNavigation
        value={value}
        onChange={handleNavigationChange}
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <BottomNavigationAction label="Landing" value="/" icon={<Home />} />
        <BottomNavigationAction
          label="Check-In"
          value="/check-in"
          icon={<CameraAlt />}
        />
        <BottomNavigationAction
          label="Check-Out"
          value="/check-out"
          icon={<ExitToApp />}
        />
      </BottomNavigation>
    </div>
  );
};

export default Layout;
