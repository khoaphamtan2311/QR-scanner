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
        onClick={onScannerActivate}
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          backgroundImage: "linear-gradient(-225deg, #ea6426 0%, #f1881b 100%)",
          boxShadow: "1px 1px 0 #f1881b, 2px 2px 0 #fff",
          color: "#fff",
        }}
      >
        <CameraAlt />
      </Fab>
      <Fab
        onClick={onSearchActivate}
        style={{
          position: "fixed",
          bottom: 150,
          right: 20,
          color: "#fff",
          backgroundImage: "linear-gradient(-225deg, #41c1ed 0%, #6fc7e9 100%)",
          boxShadow: " 2px 2px 0 #fff",
        }}
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
        <BottomNavigationAction
          value="/"
          icon={<Home sx={{ color: "rgba(231, 54, 20, 1)" }} />}
        />
        <BottomNavigationAction
          value="/check-in"
          icon={<CameraAlt sx={{ color: "rgba(231, 54, 20, 1)" }} />}
        />
        <BottomNavigationAction
          value="/check-out"
          icon={<ExitToApp sx={{ color: "rgba(231, 54, 20, 1)" }} />}
        />
      </BottomNavigation>
    </div>
  );
};

export default Layout;
