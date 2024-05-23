import { useState, useEffect } from "react";
import { Avatar, Rating } from "@mui/material";
import axios from "axios";

export default function ReviewItem(props) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function getFacilities() {
      try {
        const res = await axios.get(`http://localhost:8080/api/reviews/getreviewbyroomid=${props.rid}`);
        if (res.data) {
          console.log(res.data);
          setReviews(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getFacilities();
  }, [props.rid]);

  return (
    <div>
      {reviews?.map((review, index) => {
        return (
          <div className="review-item" key={index}>
            <div>
              <Avatar alt={review.reviewAuthor} src="/static/images/avatar/1.jpg" />
              <div>
                <h3>{review.reviewAuthor}</h3>
                <p>{review.reviewLocation}</p>
              </div>
            </div>
            <div>
              <Rating name="size-small" defaultValue={review.reviewRate} size="small" readOnly />
            </div>
            <p>{review.reviewDesc}</p>
          </div>
        );
      })}
    </div>
  );
}
