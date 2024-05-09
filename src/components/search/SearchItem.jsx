import { Bed, House, RoomSize } from "../Icons";

export default function SearchItem(props) {
  return (
    <div className="search-item-container">
      <div className="search-item-img"></div>
      <div className="search-item-details">
        <h1>{props.price}</h1>
        <div>
          <p>{props.location}</p>
          <span>{props.rating}</span>
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
            <RoomSize />{" "}
            <p>
              98 m<sup>2</sup>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
