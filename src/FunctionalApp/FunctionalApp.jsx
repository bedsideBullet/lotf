import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(["", "", "", ""]);
  const userData = { firstName, lastName, email, city, phoneNumber };
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={firstName ? userData : null} />
      <FunctionalForm
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setCity={setCity}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
      />
    </>
  );
};
