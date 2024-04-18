import React, { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./ClassTextInput";
import { ClassCityInput } from "./ClassCityInput";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { isEmailValid, isNumberValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.emailRef = React.createRef();
    this.cityRef = React.createRef();
    this.phoneRef = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ];
    this.state = {
      phoneNumberInput: ["", "", "", ""],
      isSubmitted: false,
    };
  }

  handleError = () => {
    const { isSubmitted, phoneNumberInput } = this.state;
    const { firstNameRef, lastNameRef, emailRef, cityRef } = this;

    const isFirstNameValid = firstNameRef.current?.value.length > 2;
    const isLastNameValid = lastNameRef.current?.value.length > 2;
    const emailAddress = emailRef.current?.value;
    const cityInput = cityRef.current?.value;
    const formattedNumber = phoneNumberInput.join("");

    const shouldShowFirstNameError = isSubmitted && !isFirstNameValid;
    const shouldShowLastNameError = isSubmitted && !isLastNameValid;
    const shouldShowEmailError = isSubmitted && !isEmailValid(emailAddress);
    const shouldShowCityError = isSubmitted && !allCities.includes(cityInput);
    const shouldShowPhoneNumberError =
      isSubmitted && !isNumberValid(formattedNumber);
    if (
      shouldShowFirstNameError ||
      shouldShowLastNameError ||
      shouldShowEmailError ||
      shouldShowCityError ||
      shouldShowPhoneNumberError
    ) {
      return true;
    }
  };

  createOnChangehandler = (index) => (e) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.phoneRef[index + 1];
    const prevRef = this.phoneRef[index - 1];
    const value = e.target.value;
    const shouldGoToNextRef =
      currentMaxLength === value.length && nextRef?.current;
    const shouldGoToPrevRef = value.length === 0 && prevRef?.current;

    const newState = this.state.phoneNumberInput.map(
      (phoneInput, phoneInputIndex) => {
        return index === phoneInputIndex ? e.target.value : phoneInput;
      }
    );

    if (shouldGoToNextRef) {
      nextRef?.focus();
    }
    if (shouldGoToPrevRef) {
      prevRef?.focus();
    }

    if (index === 3 && value.length > 1) {
      return;
    }

    this.setState({ phoneNumberInput: newState });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const firstNameValue = this.firstNameRef.current?.value;
    const lastNameValue = this.lastNameRef.current?.value;
    const emailValue = this.emailRef.current?.value;
    const cityValue = this.cityRef.current?.value;
    const phoneNumberValue = this.state.phoneNumberInput;
    this.props.updateState(
      firstNameValue,
      lastNameValue,
      emailValue,
      cityValue,
      phoneNumberValue
    );
    console.log(phoneNumberValue);
  };

  render() {
    const { email, firstName, lastName, phone, city, updateState } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <ClassTextInput
          labelText="First Name:"
          inputProps={{
            placeholder: "Bilbo",
            ref: this.firstNameRef,
          }}
        />
        <ErrorMessage
          message={firstNameErrorMessage}
          show={this.handleError()}
        />

        <ClassTextInput
          labelText="Last Name:"
          inputProps={{
            placeholder: "Baggins",
            ref: this.lastNameRef,
          }}
        />
        <ErrorMessage
          message={lastNameErrorMessage}
          show={this.handleError()}
        />

        <ClassTextInput
          labelText="Email:"
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            ref: this.emailRef,
          }}
        />
        <ErrorMessage message={emailErrorMessage} show={this.handleError()} />

        <ClassCityInput
          labelText="City:"
          inputProps={{ placeholder: "Hobbiton", ref: this.cityRef }}
        />
        <ErrorMessage message={cityErrorMessage} show={this.handleError()} />

        <ClassPhoneInput
          labelText={"Phone:"}
          phoneNumberInput={this.state.phoneNumberInput}
          createOnChangehandler={this.createOnChangehandler}
          inputProps={{ ref: this.phoneRef }}
        />
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={this.handleError()}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
