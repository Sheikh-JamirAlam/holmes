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

export default function AdminPaymentDashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const [amount, setAmount] = useState("");
  const [editPayment, setEditPayment] = useState(null);

  const handleClose = () => {
    document.getElementById("admin-backdrop").classList.add("invisible");
  };

  const handleOpen = (payment) => {
    document.getElementById("admin-backdrop").classList.remove("invisible");
    setEditPayment(payment);
    setEmail(payment.umail ? payment.umail : "");
    setRoomId(payment.rid ? payment.rid : "");
    setAmount(payment.amount ? payment.amount : "");
  };

  const handleDelete = async (payment) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/payment/deletepayment=${payment.pid}`);
      if (res.data === "Payment deleted successfully") {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/payment/editpayment`, {
        pid: editPayment.pid,
        umail: email,
        rid: roomId,
        amount,
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
    { id: "pid", label: "pid" },
    { id: "umail", label: "umail" },
    { id: "rid", label: "rid" },
    { id: "amount", label: "amount" },
    { id: "Actions", label: "Actions" },
  ];

  useEffect(() => {
    if (!Cookies.get("adminauth")) {
      navigate("/admin-login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function findUser() {
      try {
        const res = await axios.get(`http://localhost:8080/api/payment/getall`);
        if (res.data) {
          setPayments(res.data);
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
            {payments.map((payment, ind) => (
              <TableRow key={ind} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{payment.pid}</TableCell>
                <TableCell>{payment.umail}</TableCell>
                <TableCell>{payment.rid}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <button className="edit-btn" onClick={() => handleOpen(payment)}>
                    Edit
                  </button>
                  <button className="del-btn" onClick={() => handleDelete(payment)}>
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
            <p>Email Address</p>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>Room ID</p>
            <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <p>Amount</p>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
