export default function PopularItem(props) {
  return (
    <div>
      <div style={{ backgroundImage: `url(${props.background})` }}></div>
      <div className="details">
        <span>Rajarhat</span>
        <span>•</span>
        <span>Kolkata</span>
      </div>
    </div>
  );
}
