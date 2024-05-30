import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { Bed, House, Profile, ImageLoading } from "../Icons";
import { useEffect, useState } from "react";

export default function SearchItem(props) {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRoomImage() {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:8080/api/images/byroom/rid=${props.rid}`);
      setImage(res.data);
      setIsLoading(false);
    }
    if (props.rid) {
      getRoomImage();
    }
  }, [props.rid]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-item-container" onClick={() => navigate(`/rooms/${props.rid}`)}>
      {isLoading ? (
        <div className="search-item-img">
          <ImageLoading className="loading-svg" />
        </div>
      ) : (
        <div className="search-item-img" style={{ backgroundImage: `url(data:image/jpeg;base64,${image?.iImage})` }}></div>
      )}
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
