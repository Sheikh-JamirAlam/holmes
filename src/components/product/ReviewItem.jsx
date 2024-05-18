import { Avatar, Rating } from "@mui/material";

export default function ReviewItem() {
  return (
    <div className="review-item">
      <div>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div>
          <h3>Remy Sharp</h3>
          <p>Indore, India</p>
        </div>
      </div>
      <div>
        <Rating name="size-small" defaultValue={5} size="small" readOnly />
      </div>
      <p>Such a great stay! Place is exactly what is being described, no disturbances nothing just peaceful stay. Always gonna prefer the place if travelling to Mumbai!!</p>
    </div>
  );
}
