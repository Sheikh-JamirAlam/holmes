import { useNavigate } from "react-router-dom";
import { Loading } from "../Icons";

export default function OfferItem(props) {
  const navigate = useNavigate();

  if (props.loading)
    return (
      <div className="popular-loading-svg-container offer-loading">
        <Loading className="loading-svg" />
      </div>
    );
  else
    return (
      <div>
        <div style={{ backgroundImage: `url(${props.background})` }}></div>
        <div className="details">
          <p>₹{props.price}</p>
          <div>
            <span>
              {props.rooms} Room{props.rooms > 1 ? "s" : ""}
            </span>
            <span>
              {props.bath} Bathroom{props.bath > 1 ? "s" : ""}
            </span>
            <span>{props.guests} Guests</span>
            <span>{props.rating} Rating</span>
          </div>
          <span>{props.location}</span>
          <button className="btn" onClick={() => navigate(`/rooms/${props.id}`)}>
            View Details
          </button>
        </div>
      </div>
    );
}
