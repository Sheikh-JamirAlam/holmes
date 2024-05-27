import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Switch, Fab, Select, FormControl, MenuItem, InputLabel, FormControlLabel, FormGroup, TextField, ImageList, ImageListItem, Snackbar, Alert } from "@mui/material";
import { Add } from "../components/Icons";
import { Camera, CrossInCircle } from "../components/Icons";

export default function AdminAddRoomDashboard() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [roomAddress, setRoomAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerRating, setOwnerRating] = useState("");
  const [roomRating, setRoomRating] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomDesc, setRoomDesc] = useState("");
  const [roomNrooms, setRoomNrooms] = useState("");
  const [roomGuests, setRoomGuests] = useState("");
  const [roomBathrooms, setRoomBathrooms] = useState("");
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasAc, setHasAc] = useState(false);
  const [hasPvtBath, setHasPvtBath] = useState(false);
  const [hasWifi, setHasWifi] = useState(false);
  const [isFurnished, setisFurnished] = useState(false);
  const [hasGeyser, setHasGeyser] = useState(false);
  const [hasFridge, setHasFridge] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [roomImages, setRoomImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageAdd = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setRoomImages((prev) => [...prev, reader.result]);
      }
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmitRoom = async () => {
    try {
      const ownerRes = await axios.post(`http://localhost:8080/api/owners/addowner`, {
        ownerName,
        ownerRating,
      });
      if (ownerRes.data.ownerId) {
        const roomRes = await axios.post(`http://localhost:8080/api/rooms/addroom`, {
          roomName,
          roomAddress,
          roomOwner: ownerRes.data.ownerId,
          roomRating,
          roomPrice,
          roomDescription: roomDesc,
          roomRooms: roomNrooms,
          roomGuests,
          roomBathroom: roomBathrooms,
          roomType,
          roomReserve: false,
        });
        if (roomRes.data.roomId) {
          const facilityRes = await axios.post(`http://localhost:8080/api/facilities/addfacility`, {
            facilityId: roomRes.data.roomId,
            hasKitchen,
            hasAc,
            hasPvtbath: hasPvtBath,
            hasWifi,
            hasFurnished: isFurnished,
            hasGeyser,
            hasFridge,
            hasParking,
          });
          if (facilityRes.data.facilityId) {
            const imagesRes = await axios.post(`http://localhost:8080/api/images/upload/multiple`, {
              rid: roomRes.data.roomId,
              images: roomImages,
            });
            if (imagesRes.data === "Images uploaded successfully") {
              setOpenSnackbar(true);
              setTimeout(() => {
                navigate("/admin/roomdb");
              }, 2000);
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (!Cookies.get("adminauth")) {
      navigate("/admin-login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <section className="admin-add-section">
        <a className="admin-close close-cross" href="/admin/dashboard">
          <CrossInCircle />
        </a>
        <h1 className="admin-add-heading">Add Property</h1>
        <div className="admin-add-container">
          <div className="admin-room-info">
            <TextField label="Property Name" variant="outlined" fullWidth value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            <TextField label="Property Address" variant="outlined" fullWidth value={roomAddress} onChange={(e) => setRoomAddress(e.target.value)} />
            <TextField label="Owner Name" variant="outlined" fullWidth value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            <TextField type="number" label="Owner Rating" variant="outlined" fullWidth value={ownerRating} onChange={(e) => setOwnerRating(e.target.value)} />
            <TextField type="number" label="Property Rating" variant="outlined" fullWidth value={roomRating} onChange={(e) => setRoomRating(e.target.value)} />
            <TextField type="number" label="Property Price" variant="outlined" fullWidth value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} />
            <TextField label="Property Description" multiline rows={4} variant="outlined" fullWidth value={roomDesc} onChange={(e) => setRoomDesc(e.target.value)} />
            <TextField type="number" label="Number of Rooms" variant="outlined" fullWidth value={roomNrooms} onChange={(e) => setRoomNrooms(e.target.value)} />
            <TextField type="number" label="Number of Guests" variant="outlined" fullWidth value={roomGuests} onChange={(e) => setRoomGuests(e.target.value)} />
            <TextField type="number" label="Number of Bathrooms" variant="outlined" fullWidth value={roomBathrooms} onChange={(e) => setRoomBathrooms(e.target.value)} />
          </div>
          <div className="admin-room-info">
            <FormGroup>
              <FormControlLabel control={<Switch checked={hasKitchen} onChange={(e) => setHasKitchen(e.target.checked)} />} label="Has Kitchen" />
              <FormControlLabel control={<Switch checked={hasAc} onChange={(e) => setHasAc(e.target.checked)} />} label="Has AC" />
              <FormControlLabel control={<Switch checked={hasPvtBath} onChange={(e) => setHasPvtBath(e.target.checked)} />} label="Has Private Bath" />
              <FormControlLabel control={<Switch checked={hasWifi} onChange={(e) => setHasWifi(e.target.checked)} />} label="Has Wifi" />
              <FormControlLabel control={<Switch checked={isFurnished} onChange={(e) => setisFurnished(e.target.checked)} />} label="Is Furnished" />
              <FormControlLabel control={<Switch checked={hasGeyser} onChange={(e) => setHasGeyser(e.target.checked)} />} label="Has Geyser" />
              <FormControlLabel control={<Switch checked={hasFridge} onChange={(e) => setHasFridge(e.target.checked)} />} label="Has Fridge" />
              <FormControlLabel control={<Switch checked={hasParking} onChange={(e) => setHasParking(e.target.checked)} />} label="Has Parking" />
            </FormGroup>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={roomType} label="RoomType" onChange={(e) => setRoomType(e.target.value)}>
                <MenuItem value={1}>Flat</MenuItem>
                <MenuItem value={0}>Paying Guest</MenuItem>
              </Select>
            </FormControl>
            <div className="input img-input">
              <label htmlFor="contact-img">
                <Camera />
              </label>
              <input id="contact-img" type="file" accept="image/*" onChange={handleImageAdd} disabled={roomImages.length === 5} />
            </div>
            <ImageList sx={{ width: 360, height: 300 }} cols={3} rowHeight={120}>
              {roomImages.map((item, idx) => (
                <ImageListItem key={idx}>
                  <img src={`${item}`} alt={item.title} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          <div className="admin-add-btn">
            <Fab color="primary" aria-label="add" onClick={handleSubmitRoom}>
              <Add />
            </Fab>
          </div>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>
            "Property Added Successfully!"
          </Alert>
        </Snackbar>
      </section>
    </main>
  );
}
