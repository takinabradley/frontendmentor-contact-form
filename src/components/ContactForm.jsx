import H from "./H";
import styles from "./ContactForm.module.css";
import { useRef } from "react";
import useValidityState from "../hooks/useValidityState";
import MessageBoxInput from "./MessageBoxInput";
import Alert from "./Alert";

export default function ContactForm({ headingLevel = 1 }) {
  const queryTypeInput = useRef(null)
  const queryTypeValidity = useValidityState(queryTypeInput)
  const onSubmit = (e) => {
    console.log(e.target);
  };

  return (
    <div className={styles["ContactForm"]}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <H level={headingLevel}>Contact Us</H>

        <p className="sr-only">Fields marked with * are required</p>

        <fieldset className={styles["contactInfo"]}>
          <legend className="sr-only">Please enter your contact information</legend>
          <MessageBoxInput
            label="First Name"
            className={styles["messageBoxInput"]}
            inputProps={{
              name: "givenName",
              type: "text",
              autoComplete: "given-name",
              required: true,
              pattern: "\\S.*",
            }}
            validityMessages={{
              patternMismatch: "First name may not start with a space, or be completely spaces",
              valueMissing: "This field is required",
            }}
          />

          <MessageBoxInput
            label="Last Name"
            className={styles["messageBoxInput"]}
            inputProps={{
              name: "familyName",
              type: "text",
              autoComplete: "family-name",
              required: true,
              pattern: "\\S.*",
            }}
            validityMessages={{
              patternMismatch: "Last name may not start with a space, or be completely spaces",
              valueMissing: "This field is required",
            }}
          />

          <MessageBoxInput
            label="Email Address"
            className={styles["messageBoxInput"]}
            inputProps={{
              name: "email",
              type: "email",
              autoComplete: "email",
              required: true,
            }}
            validityMessages={{
              typeMismatch: "Please enter a valid email address",
              valueMissing: "Please enter a valid email address",
            }}
          />
        </fieldset>

        <fieldset className={styles["queryType"]}>
          <legend>
            <span aria-hidden="true">Query Type</span>
            <span className="sr-only">Please select a query type</span>
          </legend>
          
          <div className={styles["queryTypeInputs"]}>
            <label>
              <input
                type="radio"
                name="queryType"
                required
                value="General Enquiry"
                ref={queryTypeInput}
                onChange={queryTypeValidity.setValidity}
                onBlur={queryTypeValidity.setValidity}
                onInvalid={queryTypeValidity.setValidity}
              />
              General Enquiry
            </label>
            <label>
              <input
                type="radio"
                name="queryType"
                required
                value="Support Request"
                onChange={queryTypeValidity.setValidity}
                onBlur={queryTypeValidity.setValidity}
                onInvalid={queryTypeValidity.setValidity}
              />
              Support Request
            </label>
          </div>

          <output aria-live="off">
            {queryTypeValidity.userInvalid && queryTypeValidity.valueMissing && <Alert>Please select a query type</Alert>}
          </output>
        </fieldset>

        <MessageBoxInput
          label="Message"
          className={styles["messageBoxInput"]}
          inputProps={{
            name: "message",
            type: "textarea",
            required: true,
            rows: 3
          }}
          validityMessages={{
            valueMissing: "This field is required",
          }}
        />

        <MessageBoxInput
          label="I consent to being contacted by the team"
          labelPlacement="left"
          className={styles["messageBoxInput"]}
          inputProps={{
            name: "contactConsent",
            type: "checkbox",
            required: true,
          }}
          validityMessages={{
            valueMissing:
              "To sumbit this form, please consent to being contacted",
          }}
        />

        <button>Submit</button>
      </form>

      <dialog>
        <p>
          Message Sent! Thanks for completing the form. We'll be in touch soon!
        </p>
        <form >
          <button autoFocus method="dialog">OK</button>
        </form>
      </dialog>
    </div>
  );
}
