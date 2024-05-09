export default function SortOptionItem(props) {
  return (
    <div
      onClick={(e) => {
        props.setSortText(props.option);
        props.setIsSortOpen(false);
      }}
    >
      <p>{props.option}</p>
    </div>
  );
}
