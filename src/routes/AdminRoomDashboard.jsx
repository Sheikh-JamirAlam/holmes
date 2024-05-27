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

export default function AdminRoomDashboard() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [nrooms, setNrooms] = useState("");
  const [guest, setGuest] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [reserved, setReserved] = useState("");
  const [type, setType] = useState("");
  const [editRoom, setEditRoom] = useState(null);

  const handleClose = () => {
    document.getElementById("admin-backdrop").classList.add("invisible");
  };

  const handleOpen = (room) => {
    document.getElementById("admin-backdrop").classList.remove("invisible");
    setEditRoom(room);
    setName(room.roomName ? room.roomName : "");
    setOwner(room.roomOwner ? room.roomOwner : "");
    setAddress(room.roomAddress ? room.roomAddress : "");
    setRating(room.roomRating ? room.roomRating : "");
    setPrice(room.roomPrice ? room.roomPrice : "");
    setDescription(room.roomDescription ? room.roomDescription : "");
    setNrooms(room.roomRooms ? room.roomRooms : "");
    setGuest(room.roomGuests ? room.roomGuests : "");
    setBathrooms(room.roomBathroom ? room.roomBathroom : "");
    setReserved(room.roomReserve ? room.roomReserve : "");
    setType(room.roomType ? room.roomType : "");
  };

  const handleDelete = async (room) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/rooms/deleteroom=${room.roomId}`);
      if (res.data === "Room deleted successfully") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/rooms/editroom`, {
        roomId: editRoom.roomId,
        roomName: name,
        roomAddress: address,
        roomBathroom: bathrooms,
        roomDescription: description,
        roomGuests: guest,
        roomOwner: owner,
        roomPrice: price,
        roomRating: rating,
        roomReserve: reserved,
        roomRooms: nrooms,
        roomType: type,
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
    { id: "rid", label: "rid" },
    { id: "rname", label: "rname" },
    { id: "raddress", label: "raddress" },
    { id: "rowner", label: "rowner" },
    { id: "rrating", label: "rrating" },
    { id: "rprice", label: "rprice" },
    { id: "rdescription", label: "rdescription" },
    { id: "rrooms", label: "rrooms" },
    { id: "rguests", label: "rguests" },
    { id: "rbathroom", label: "rbathroom" },
    { id: "rtype", label: "rtype" },
    { id: "rreserve", label: "rreserve" },
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
        const res = await axios.get(`http://localhost:8080/api/rooms/getall`);
        if (res.data) {
          setRooms(res.data);
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
            {rooms.map((room, ind) => (
              <TableRow key={ind} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{room.roomId}</TableCell>
                <TableCell>{room.roomName}</TableCell>
                <TableCell>{room.roomAddress}</TableCell>
                <TableCell>{room.roomOwner}</TableCell>
                <TableCell>{room.roomRating}</TableCell>
                <TableCell>{room.roomPrice}</TableCell>
                <TableCell sx={{ width: "30rem" }}>{room.roomDescription}</TableCell>
                <TableCell>{room.roomRooms}</TableCell>
                <TableCell>{room.roomGuests}</TableCell>
                <TableCell>{room.roomBathroom}</TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{String(room.roomReserve)}</TableCell>
                <TableCell>
                  <button className="edit-btn" onClick={() => handleOpen(room)}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={() => handleDelete(room)}>
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
            <p>Address</p>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <p>Owner</p>
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
            <p>Rating</p>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            <p>Price</p>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <p>Description</p>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <p>No. of Rooms</p>
            <input type="number" value={nrooms} onChange={(e) => setNrooms(e.target.value)} />
            <p>No. of Guest</p>
            <input type="number" value={guest} onChange={(e) => setGuest(e.target.value)} />
            <p>No. of Bathrooms</p>
            <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
            <p>Type</p>
            <input type="number" value={type} onChange={(e) => setType(e.target.value)} />
            <p>Reserved / Not Reserved</p>
            <input type="text" value={reserved} onChange={(e) => setReserved(e.target.value)} />
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
