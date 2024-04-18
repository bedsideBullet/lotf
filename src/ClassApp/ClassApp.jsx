import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    phone: ["", "", "", ""],
    city: "",
  };

  defaultUser = {
    email: this.state.email,
    firstName: "Default",
    lastName: "Default",
    phone: "1234567",
    city: "Hobbiton",
  };

  updateState = (
    firstNameValue,
    lastNameValue,
    emailValue,
    cityValue,
    phoneNumberValue
  ) => {
    this.setState({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      city: cityValue,
      phone: phoneNumberValue,
    });
  };
  userData = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    city: this.state.city,
    phoneNumber: this.state.phone,
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.userData} />
        <ClassForm updateState={this.updateState} />
      </>
    );
  }
}
