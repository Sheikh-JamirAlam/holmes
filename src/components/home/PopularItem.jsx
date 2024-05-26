import { useNavigate } from "react-router-dom";
import { Loading } from "../Icons";

export default function PopularItem(props) {
  const navigate = useNavigate();

  if (props.loading)
    return (
      <div className="popular-loading-svg-container">
        <Loading className="loading-svg" />
      </div>
    );
  else
    return (
      <div onClick={() => navigate(`/rooms/${props.id}`)}>
        <div style={{ backgroundImage: `url(${props.background})` }}></div>
        <div className="details">
          <span>{props.location}</span>
          <span>•</span>
          <span>Kolkata</span>
        </div>
      </div>
    );
}
