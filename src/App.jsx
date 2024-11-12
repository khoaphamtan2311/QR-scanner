import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout";
import LandingPage from "./pages/LandingPage";
import CheckInPage from "./pages/CheckInPage";
import FileUpload from "./component/Loader";
import CheckOutPage from "./pages/NewCheckOutPage";
import "./App.css";

function App() {
  const [showScanner, setShowScanner] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const handleScannerActivate = () => {
    setShowScanner(true);
    setShowSearch(false);
  };

  const handleSearchActivate = () => {
    setShowSearch(true);
    setShowScanner(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/",
      element: (
        <Layout
          onScannerActivate={handleScannerActivate}
          onSearchActivate={handleSearchActivate}
        />
      ),
      children: [
        {
          path: "check-in",
          element: (
            <CheckInPage showScanner={showScanner} showSearch={showSearch} />
          ),
        },
        {
          path: "check-out",
          element: (
            <CheckOutPage showScanner={showScanner} showSearch={showSearch} />
          ),
        },
      ],
    },
    {
      path: "/private",
      element: <FileUpload />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
