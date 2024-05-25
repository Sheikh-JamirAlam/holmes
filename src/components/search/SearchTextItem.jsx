export default function SearchTextItem(props) {
  return (
    <div
      onClick={(e) => {
        props.setSearchLocation(props.option);
        props.setIsSearchOpen(false);
      }}
    >
      <p>{props.option}</p>
    </div>
  );
}
