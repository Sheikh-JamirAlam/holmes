import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { CrossInCircle } from "../components/Icons";

export default function AdminFacilityDashboard() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [kitchen, setKitchen] = useState("");
  const [ac, setAc] = useState("");
  const [pvtbath, setPvtbath] = useState("");
  const [wifi, setWifi] = useState("");
  const [furnished, setFurnished] = useState("");
  const [geyser, setGeyser] = useState("");
  const [fridge, setFridge] = useState("");
  const [parking, setParking] = useState("");
  const [editFacility, setEditFacility] = useState(null);

  const handleClose = () => {
    document.getElementById("admin-backdrop").classList.add("invisible");
  };

  const handleOpen = (facility) => {
    document.getElementById("admin-backdrop").classList.remove("invisible");
    setEditFacility(facility);
    setKitchen(facility.hasKitchen !== null ? String(facility.hasKitchen) : "");
    setAc(facility.hasAc !== null ? String(facility.hasAc) : "");
    setPvtbath(facility.hasPvtbath !== null ? String(facility.hasPvtbath) : "");
    setWifi(facility.hasWifi !== null ? String(facility.hasWifi) : "");
    setFurnished(facility.hasFurnished !== null ? String(facility.hasFurnished) : "");
    setGeyser(facility.hasGeyser !== null ? String(facility.hasGeyser) : "");
    setFridge(facility.hasFridge !== null ? String(facility.hasFridge) : "");
    setParking(facility.hasParking !== null ? String(facility.hasParking) : "");
  };

  const handleDelete = async (facility) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/facilities/deletefacility=${facility.facilityId}`);
      if (res.data === "Facility deleted successfully") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/facilities/editfacility`, {
        roomId: editFacility.facilityId,
        hasAc: ac,
        hasFridge: fridge,
        hasFurnished: furnished,
        hasGeyser: geyser,
        hasKitchen: kitchen,
        hasParking: parking,
        hasPvtbath: pvtbath,
        hasWifi: wifi,
      });
      console.log(res.data);
      if (res.data === "Update successful") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { id: "fid", label: "fid" },
    { id: "kitchen", label: "kitchen" },
    { id: "ac", label: "ac" },
    { id: "pvtbath", label: "pvtbath" },
    { id: "wifi", label: "wifi" },
    { id: "furnished", label: "furnished" },
    { id: "geyser", label: "geyser" },
    { id: "fridge", label: "fridge" },
    { id: "parking", label: "parking" },
    { id: "Action", label: "Action" },
  ];

  useEffect(() => {
    if (!Cookies.get("adminauth")) {
      navigate("/admin-login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function findUser() {
      try {
        const res = await axios.get(`http://localhost:8080/api/facilities/getfacilities`);
        console.log(res.data);
        if (res.data) {
          setFacilities(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    findUser();
  }, []);

  return (
    <main>
      <section>
        <a className="admin-close close-cross" href="/admin/dashboard">
          <CrossInCircle />
        </a>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ededed" }}>
              {columns.map((column, ind) => {
                return (
                  <TableCell key={ind} sx={{ fontWeight: 700, fontSize: "18px" }}>
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility, ind) => (
              <TableRow key={ind} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{facility.facilityId}</TableCell>
                <TableCell>{String(facility.hasAc)}</TableCell>
                <TableCell>{String(facility.hasFridge)}</TableCell>
                <TableCell>{String(facility.hasFurnished)}</TableCell>
                <TableCell>{String(facility.hasGeyser)}</TableCell>
                <TableCell>{String(facility.hasKitchen)}</TableCell>
                <TableCell>{String(facility.hasParking)}</TableCell>
                <TableCell>{String(facility.hasPvtbath)}</TableCell>
                <TableCell>{String(facility.hasWifi)}</TableCell>
                <TableCell>
                  <button className="edit-btn" onClick={() => handleOpen(facility)}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={() => handleDelete(facility)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div id="admin-backdrop" className="admin-backdrop invisible">
          <div>
            <span onClick={handleClose}>Close</span>
            <p>Has Kitchen</p>
            <input type="text" value={kitchen} onChange={(e) => setKitchen(e.target.value)} />
            <p>Has Ac</p>
            <input type="text" value={ac} onChange={(e) => setAc(e.target.value)} />
            <p>Has Private Bath</p>
            <input type="text" value={pvtbath} onChange={(e) => setPvtbath(e.target.value)} />
            <p>Has Wifi</p>
            <input type="text" value={wifi} onChange={(e) => setWifi(e.target.value)} />
            <p>Is Furnished</p>
            <input type="text" value={furnished} onChange={(e) => setFurnished(e.target.value)} />
            <p>Has Geyser</p>
            <input type="text" value={geyser} onChange={(e) => setGeyser(e.target.value)} />
            <p>Has Fridge</p>
            <input type="text" value={fridge} onChange={(e) => setFridge(e.target.value)} />
            <p>Has Parking</p>
            <input type="text" value={parking} onChange={(e) => setParking(e.target.value)} />
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
