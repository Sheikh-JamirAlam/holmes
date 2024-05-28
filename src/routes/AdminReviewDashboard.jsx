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

export default function AdminReviewDashboard() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewLocation, setReviewLocation] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewRate, setReviewRate] = useState("");
  const [editReview, setEditReview] = useState(null);

  const handleClose = () => {
    document.getElementById("admin-backdrop").classList.add("invisible");
  };

  const handleOpen = (review) => {
    document.getElementById("admin-backdrop").classList.remove("invisible");
    setEditReview(review);
    setRoomId(review.roomId ? review.roomId : "");
    setReviewAuthor(review.reviewAuthor ? review.reviewAuthor : "");
    setReviewLocation(review.reviewLocation ? review.reviewLocation : "");
    setReviewDesc(review.reviewDesc ? review.reviewDesc : "");
    setReviewRate(review.reviewRate ? review.reviewRate : "");
  };

  const handleDelete = async (review) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/reviews/deletereview=${review.reviewId}`);
      if (res.data === "Review deleted successfully") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/reviews/editreview`, {
        reviewId: editReview.reviewId,
        roomId,
        reviewAuthor,
        reviewLocation,
        reviewDesc,
        reviewRate,
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
    { id: "reid", label: "reid" },
    { id: "rid", label: "rid" },
    { id: "rauthor", label: "rauthor" },
    { id: "rlocation", label: "rlocation" },
    { id: "rdesc", label: "rdesc" },
    { id: "rrate", label: "rrate" },
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
        const res = await axios.get(`http://localhost:8080/api/reviews/getall`);
        if (res.data) {
          setReviews(res.data);
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
            {reviews.map((review, ind) => (
              <TableRow key={ind} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{review.reviewId}</TableCell>
                <TableCell>{review.roomId}</TableCell>
                <TableCell>{review.reviewAuthor}</TableCell>
                <TableCell>{review.reviewLocation}</TableCell>
                <TableCell sx={{ width: "60rem" }}>{review.reviewDesc}</TableCell>
                <TableCell>{review.reviewRate}</TableCell>
                <TableCell>
                  <button className="edit-btn" onClick={() => handleOpen(review)}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={() => handleDelete(review)}>
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
            <p>Room ID</p>
            <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <p>Author</p>
            <input type="text" value={reviewAuthor} onChange={(e) => setReviewAuthor(e.target.value)} />
            <p>Location</p>
            <input type="text" value={reviewLocation} onChange={(e) => setReviewLocation(e.target.value)} />
            <p>Description</p>
            <input type="text" value={reviewDesc} onChange={(e) => setReviewDesc(e.target.value)} />
            <p>Rate</p>
            <input type="number" value={reviewRate} onChange={(e) => setReviewRate(e.target.value)} />
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
