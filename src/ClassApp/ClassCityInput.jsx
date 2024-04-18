import React, { Component } from "react";
import { allCities } from "../utils/all-cities";

export class ClassCityInput extends Component {
    render() {
        const { labelText, inputProps } = this.props; // Assuming labelText and inputProps are passed as props
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
    }
}
