import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { NumericFormat } from "react-number-format";

export default function SearchOptionPrice(props) {
  const [price, setPrice] = useState([15000, 25000]);

  const minDistance = 100;
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  useEffect(() => {
    props.setPriceText(`${document.getElementById("min-price-option").innerText} - ${document.getElementById("max-price-option").innerText}`);
  }, [price, props]);

  return (
    <div className="hero-search-option-price">
      <p id="min-price-option">
        ₹ <NumericFormat displayType="text" value={price[0]} thousandsGroupStyle="lakh" thousandSeparator="," />
      </p>
      <p id="max-price-option">
        ₹ <NumericFormat displayType="text" value={price[1]} thousandsGroupStyle="lakh" thousandSeparator="," />
      </p>
      <Slider value={price} onChange={handleChange} step={100} min={5000} max={50000} valueLabelDisplay="auto" disableSwap />
      <button className="btn" onClick={() => props.setIsPriceOptionsOpen(false)}>
        Done
      </button>
    </div>
  );
}
