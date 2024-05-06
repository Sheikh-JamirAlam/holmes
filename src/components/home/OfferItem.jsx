export default function OfferItem(props) {
  return (
    <div>
      <div style={{ background: `url(${props.background})` }}></div>
      <div className="details">
        <p>₹10,000</p>
        <div>
          <span>2 Beds</span>
          <span>1 Bath</span>
          <span>3 Rooms</span>
          <span>Kitchen</span>
        </div>
        <span>Rajarhat, Kolkata</span>
        <button className="btn">View Details</button>
      </div>
    </div>
  );
}
