import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import AddProductPage from "./pages/addItem";
import AllProductsPage from "./pages/AllItem";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/user/home";
import RestaurantMenu from "./pages/user/RestaurantMenu";
import RestaurantDashboard from "./RestrauntDashBoard/Dashboard"; // Ensure this import is correct.
import FoodBroLandingPage from "./pages/Landingpage";
import {authService} from "./services/authuser";
import {useNavigate} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </>
  );
};


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <FoodBroLandingPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/restaurant/:restaurantId",
          element: <RestaurantMenu />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute requireAdmin={true}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard", // Default dashboard page
          element: <RestaurantDashboard />,
        },
        { path: "additem", element: <AddProductPage /> },
        { path: "allitems", element: <AllProductsPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
