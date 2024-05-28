import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ContactUs from "./routes/ContactUs";
import AboutUs from "./routes/AboutUs";
import Profile from "./routes/Profile";
import Product from "./routes/Product";
import Payment from "./routes/Payment";
import AdminLogin from "./routes/AdminLogin";
import Review from "./routes/Review";
import FAQPage from "./routes/Faq";
import TermsandConditions from "./routes/TermsandConditions";
import PrivacyPolicy from "./routes/Privacy";
import ForgotPass from "./routes/ForgotPass";
import AdminDashboard from "./routes/AdminDashboard";
import AdminUserDashboard from "./routes/AdminUserDashboard";
import AdminRoomDashboard from "./routes/AdminRoomDashboard";
import AdminOwnerDashboard from "./routes/AdminOwnerDashboard";
import AdminFacilityDashboard from "./routes/AdminFacilityDashboard";
import AdminAddRoomDashboard from "./routes/AdminAddRoomDashboard";
import AdminPaymentDashboard from "./routes/AdminPaymentDashboard";
import AdminReviewDashboard from "./routes/AdminReviewDashboard";
import AdminRoomImageDashboard from "./routes/AdminRoomImageDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/rooms/:rid",
    element: <Product />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/review",
    element: <Review />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
  {
    path: "/terms",
    element: <TermsandConditions />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/forgot-pass",
    element: <ForgotPass />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/userdb",
    element: <AdminUserDashboard />,
  },
  {
    path: "/admin/roomdb",
    element: <AdminRoomDashboard />,
  },
  {
    path: "/admin/ownerdb",
    element: <AdminOwnerDashboard />,
  },
  {
    path: "/admin/facilitydb",
    element: <AdminFacilityDashboard />,
  },
  {
    path: "/admin/paymentdb",
    element: <AdminPaymentDashboard />,
  },
  {
    path: "/admin/reviewdb",
    element: <AdminReviewDashboard />,
  },
  {
    path: "/admin/roomimagedb",
    element: <AdminRoomImageDashboard />,
  },
  {
    path: "/admin/addroom",
    element: <AdminAddRoomDashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
