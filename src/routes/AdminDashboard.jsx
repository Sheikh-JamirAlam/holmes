import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import "../styles/Admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("adminauth")) {
      navigate("/admin-login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="admin-main-container">
      <h1>Admin Dashboard</h1>
      <section className="admin-dashboard-container">
        <Button variant="contained" onClick={() => navigate("/admin/userdb")}>
          User Database
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin/roomdb")}>
          Rooms Database
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin/roomimagedb")}>
          RoomImages Database
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin/ownerdb")}>
          Owners Database
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin/facilitydb")}>
          Facilities Database
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin/reviewdb")}>
          Reviews Database
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin/paymentdb")}>
          Payments Database
        </Button>
        <Button variant="contained" color="success" onClick={() => navigate("/admin/addroom")}>
          Add Rooms
        </Button>
      </section>
    </main>
  );
}
