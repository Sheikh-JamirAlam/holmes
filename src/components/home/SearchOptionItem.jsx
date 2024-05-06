import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Location } from "../Icons";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 30,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(10px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 14,
    height: 14,
    borderRadius: 7,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function SearchOptionItem(props) {
  return (
    <div
      className={`${props.setTypeText && "hero-search-option-type"}`}
      onClick={(e) => {
        if (props.setLocationText) {
          props.setLocationText(`${props.city}, ${props.state}`);
          props.setIsLocationOptionsOpen(false);
        }
      }}
    >
      {props.setLocationText && (
        <>
          <Location />
          <div>
            <h2>{props.city}</h2>
            <p>{props.state}</p>
          </div>
        </>
      )}
      {props.setTypeText && (
        <>
          <div>
            <AntSwitch
              id="flat-input"
              onClick={(e) => {
                if (document.getElementById("pg-input").checked) {
                  if (e.target.checked) props.setTypeText("Flat, Paying Guest");
                  else props.setTypeText("Paying Guest");
                } else {
                  if (e.target.checked) props.setTypeText("Flat");
                  else props.setTypeText("");
                }
              }}
            />
            <p>Flat</p>
          </div>
          <div>
            <AntSwitch
              id="pg-input"
              onClick={(e) => {
                if (document.getElementById("flat-input").checked) {
                  if (e.target.checked) props.setTypeText("Flat, Paying Guest");
                  else props.setTypeText("Flat");
                } else {
                  if (e.target.checked) props.setTypeText("Paying Guest");
                  else props.setTypeText("");
                }
              }}
            />
            <p>Paying Guest</p>
          </div>
          <div>
            <button className="btn" onClick={() => props.setIsTypeOptionsOpen(false)}>
              Done
            </button>
          </div>
        </>
      )}
    </div>
  );
}
