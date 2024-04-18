import { allCities } from "../utils/all-cities";

export const FunctionalCityInput = ({ labelText, inputProps }) => {
  return (
    <div className="input-wrap">
      <label>{labelText}</label>
      <select style={{ width: "310px" }} {...inputProps}>
        <option value="">Select a City</option>
        {allCities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};
