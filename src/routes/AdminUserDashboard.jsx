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

export default function AdminUserDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("");
  const [editUser, setEditUser] = useState(null);

  const handleClose = () => {
    document.getElementById("admin-backdrop").classList.add("invisible");
  };

  const handleOpen = (user) => {
    document.getElementById("admin-backdrop").classList.remove("invisible");
    setEditUser(user);
    setName(user.userName ? user.userName : "");
    setContact(user.userContact ? user.userContact : "");
    setAddress(user.userAddress ? user.userAddress : "");
    setCity(user.userCity ? user.userCity : "");
    setLanguage(user.userLanguage ? user.userLanguage : "");
    setBio(user.userBio ? user.userBio : "");
  };

  const handleDelete = async (user) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/user/deleteuser=${user.userEmail}`);
      if (res.data === "User deleted successfully") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/user/edituser`, {
        userEmail: editUser.userEmail,
        userName: name,
        userContact: contact,
        userAddress: address,
        userCity: city,
        userLanguage: language,
        userBio: bio,
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
    { id: "uname", label: "uname" },
    { id: "umail", label: "umail" },
    { id: "ucontact", label: "ucontact" },
    { id: "uaddress", label: "uaddress" },
    { id: "ucity", label: "ucity" },
    { id: "ulanguage", label: "ulanguage" },
    { id: "ubio", label: "ubio" },
    { id: "action", label: "action" },
  ];

  useEffect(() => {
    if (!Cookies.get("adminauth")) {
      navigate("/admin-login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function findUser() {
      try {
        const res = await axios.get(`http://localhost:8080/api/user/getall`);
        if (res.data) {
          setUsers(res.data);
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
            {users.map((user, ind) => (
              <TableRow key={ind} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.userEmail}</TableCell>
                <TableCell>{user.userContact}</TableCell>
                <TableCell>{user.userAddress}</TableCell>
                <TableCell>{user.userCity}</TableCell>
                <TableCell>{user.userLanguage}</TableCell>
                <TableCell>{user.userBio}</TableCell>
                <TableCell>
                  <button className="edit-btn" onClick={() => handleOpen(user)}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={() => handleDelete(user)}>
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
            <p>Contact</p>
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
            <p>Address</p>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <p>City</p>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <p>Language</p>
            <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
            <p>Bio</p>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
