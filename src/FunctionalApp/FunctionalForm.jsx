import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { createRef, useState } from "react";
import { isEmailValid, isNumberValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalCityInput } from "./FunctionalCityInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";
const firstNameRef = createRef(null);
const lastNameRef = createRef(null);
const emailRef = createRef(null);
const cityRef = createRef(null);

export const FunctionalForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  city,
  setCity,
  phoneNumber,
  setPhoneNumber,
}) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCity("");
    setPhoneNumber(["", "", "", ""]);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstName(firstNameRef.current?.value);
    setLastName(lastNameRef.current?.value);
    setEmail(emailRef.current?.value);
    setCity(cityRef.current?.value);
    setPhoneNumber(phoneNumberInput);
    setIsSubmitted(true);
    console.log(phoneNumberInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>
      <FunctionalTextInput
        labelText="First Name:"
        inputProps={{
          placeholder: "Bilbo",
          value: firstName,
          ref: firstNameRef,
        }}
      />
      <ErrorMessage
        message={firstNameErrorMessage}
        show={shouldShowFirstNameError}
      />
      <FunctionalTextInput
        labelText="Last Name:"
        inputProps={{
          placeholder: "Baggins",
          value: lastName,
          ref: lastNameRef,
        }}
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={shouldShowLastNameError}
      />
      <FunctionalTextInput
        labelText="Email:"
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.ne",
          value: email,
          ref: emailRef,
        }}
      />

      <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

      <FunctionalCityInput
        labelText={"City:"}
        inputProps={{
          placeholder: "Hobbiton",
          value: city,
          ref: cityRef,
        }}
      />

      <ErrorMessage message={cityErrorMessage} show={shouldShowCityError} />

      <FunctionalPhoneInput
        labelText={"Phone:"}
        phoneNumberInput={phoneNumberInput}
        setPhoneNumberInput={setPhoneNumberInput}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={shouldShowPhoneNumberError}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
