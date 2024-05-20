import { useState, useEffect } from "react";
import axios from "axios";
import { AcUnit, Bathroom, Fridge, Kitchen, Parking, Shower, Wardrobe, Wifi } from "../Icons";

export default function Facilities(props) {
  const [facilities, setFacilities] = useState(null);

  useEffect(() => {
    async function getFacilities() {
      try {
        const res = await axios.get(`http://localhost:8080/api/facilities/getfacilitybyid=${props.rid}`);
        if (res.data.facilityId) {
          setFacilities(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getFacilities();
  }, [props.rid]);

  return (
    <div className="product-feature">
      <h3>What this place offers</h3>
      <div>
        {facilities?.hasKitchen && (
          <div>
            <Kitchen />
            <p>Kitchen available</p>
          </div>
        )}
        {facilities?.hasWifi && (
          <div>
            <Wifi />
            <p>Wifi enabled</p>
          </div>
        )}
        {facilities?.hasAc && (
          <div>
            <AcUnit />
            <p>AC unit</p>
          </div>
        )}
        {facilities?.hasPvtbath && (
          <div>
            <Bathroom />
            <p>Private Washroom</p>
          </div>
        )}
        {facilities?.hasFurnished && (
          <div>
            <Wardrobe />
            <p>Furnished</p>
          </div>
        )}
        {facilities?.hasGeyser && (
          <div>
            <Shower />
            <p>Geyser Enabled</p>
          </div>
        )}
        {facilities?.hasFridge && (
          <div>
            <Fridge />
            <p>Fridge Available</p>
          </div>
        )}
        {facilities?.hasParking && (
          <div>
            <Parking />
            <p>Parking Available</p>
          </div>
        )}
      </div>
    </div>
  );
}
