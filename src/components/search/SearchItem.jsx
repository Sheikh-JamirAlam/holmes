import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Bed, House, Profile } from "../Icons";

export default function SearchItem(props) {
  const navigate = useNavigate();

  return (
    <div className="search-item-container" onClick={() => navigate(`/rooms/${props.rid}`)}>
      <div className="search-item-img" style={{ backgroundImage: `url(data:image/jpeg;base64,${props.image})` }}></div>
      <div className="search-item-details">
        <h1>
          ₹<NumericFormat className="reserve-cost" displayType="text" value={props.price} thousandsGroupStyle="lakh" thousandSeparator="," />
        </h1>
        <div>
          <p>{props.location}</p>
          <span>
            <NumericFormat displayType="text" value={props.rating} decimalScale={1} fixedDecimalScale />
          </span>
        </div>
        <div className="divider"></div>
        <div className="search-item-features">
          <div>
            <House /> {props.type}
          </div>
          <div>
            <Bed /> {props.bedroom}
          </div>
          <div>
            <Profile /> {props.guests}
          </div>
        </div>
      </div>
    </div>
  );
}
