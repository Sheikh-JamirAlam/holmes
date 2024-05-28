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
import { CrossInCircle, Camera } from "../components/Icons";

export default function AdminRoomImageDashboard() {
  const navigate = useNavigate();
  const [roomImages, setRoomImages] = useState([]);
  const [iImage, setIImage] = useState();
  const [editRoomImage, setEditRoomImage] = useState(null);

  const handleClose = () => {
    document.getElementById("admin-backdrop").classList.add("invisible");
  };

  const handleOpen = (roomImage) => {
    document.getElementById("admin-backdrop").classList.remove("invisible");
    setEditRoomImage(roomImage);
    setIImage(roomImage.iImage ? `data:image/jpeg;base64,${roomImage.iImage}` : "");
  };

  const handleImageAdd = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setIImage(reader.result);
      }
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDelete = async (roomImage) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/images/deleteimage=${roomImage.iId}`);
      if (res.data === "Room Image deleted successfully") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/images/editroomimage`, {
        iId: editRoomImage.iId,
        rId: editRoomImage.rId,
        iImage: iImage,
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
    { id: "iid", label: "iid" },
    { id: "rid", label: "rid" },
    { id: "iimage", label: "iimage" },
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
        const res = await axios.get(`http://localhost:8080/api/images/getall`);
        if (res.data) {
          setRoomImages(res.data);
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
            {roomImages.map((roomImage, ind) => (
              <TableRow key={ind} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{roomImage.iId}</TableCell>
                <TableCell>{roomImage.rId}</TableCell>
                <TableCell>
                  <div style={{ width: "5rem", height: "5rem", backgroundImage: `url(data:image/jpeg;base64,${roomImage.iImage})`, backgroundSize: "cover" }}></div>
                </TableCell>
                <TableCell>
                  <button className="edit-btn" onClick={() => handleOpen(roomImage)}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={() => handleDelete(roomImage)}>
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
            <p>Room Images</p>
            <div className="input img-input">
              <label htmlFor="contact-img">
                <Camera />
              </label>
              <input id="contact-img" type="file" accept="image/*" onChange={handleImageAdd} />
              {iImage && <img src={iImage} alt="user-entered-images" />}
            </div>
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
