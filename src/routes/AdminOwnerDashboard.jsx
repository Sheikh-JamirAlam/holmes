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

export default function AdminOwnerDashboard() {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [editOwner, setEditOwner] = useState(null);

  const handleClose = () => {
    document.getElementById("admin-backdrop").classList.add("invisible");
  };

  const handleOpen = (owner) => {
    document.getElementById("admin-backdrop").classList.remove("invisible");
    setEditOwner(owner);
    setName(owner.ownerName ? owner.ownerName : "");
    setRating(owner.ownerRating ? owner.ownerRating : "");
  };

  const handleDelete = async (owner) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/owners/deleteowner=${owner.ownerId}`);
      if (res.data === "Owner deleted successfully") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    console.log(editOwner.ownerId);
    try {
      const res = await axios.post(`http://localhost:8080/api/owners/editowner`, {
        ownerId: editOwner.ownerId,
        ownerName: name,
        ownerRating: rating,
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
    { id: "oid", label: "oid" },
    { id: "oname", label: "oname" },
    { id: "orating", label: "orating" },
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
        const res = await axios.get(`http://localhost:8080/api/owners/getowners`);
        console.log(res.data);
        if (res.data) {
          setOwners(res.data);
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
            {owners.map((owner, ind) => (
              <TableRow key={ind} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{owner.ownerId}</TableCell>
                <TableCell>{owner.ownerName}</TableCell>
                <TableCell>{owner.ownerRating}</TableCell>
                <TableCell>
                  <button className="edit-btn" onClick={() => handleOpen(owner)}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={() => handleDelete(owner)}>
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
            <p>Name</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <p>Rating</p>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
