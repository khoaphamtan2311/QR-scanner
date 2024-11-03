import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout";
import LandingPage from "./pages/LandingPage";
import CheckInPage from "./pages/CheckInPage";
// import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [showScanner, setShowScanner] = useState(false);
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
      element: (
        <Layout
          onScannerActivate={handleScannerActivate}
          onSearchActivate={handleSearchActivate}
        />
      ),
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "check-in",
          element: (
            <CheckInPage showScanner={showScanner} showSearch={showSearch} />
          ),
        },
        // {
        //   path: "check-out",
        //   element: <CheckoutPage />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
