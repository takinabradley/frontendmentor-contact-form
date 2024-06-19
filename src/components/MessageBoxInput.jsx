import { useRef, useId } from "react";
import useValidityState from "../hooks/useValidityState";
import Alert from "./Alert"

export default function MessageBoxInput({
  label = "",
  inputProps = {},
  validityMessages = {},
  className,
  onInputChange,
  labelPlacement = "right"
}) {
  const inputRef = useRef(null);
  const validity = useValidityState(inputRef);
  const inputId = useId();
  const messageBoxId = useId();
  const _input = inputProps.type === "textarea" ? "textarea" : "input";
  
  const renderValidityMessages = () => {
    return Object.keys(validityMessages).map(messageReason => {
      if(validity.userInvalid && validity[messageReason]) return <Alert key={messageReason}>{validityMessages[messageReason]}</Alert>
    })
  };

  return (
    <div className={className || ""}>
      {labelPlacement === "right" ? 
        <label htmlFor={inputId}>{label}</label> : null
      }
      <_input
        {...inputProps}
        id={inputId}
        aria-describedby={messageBoxId}
        ref={inputRef}
        onChange={validity.setValidity}
        onInvalid={validity.setValidity}
        onBlur={validity.setValidity}
        // edge case for checkboxes
        onClick={inputProps.type === "checkbox" ? validity.setValidity : undefined}
      />
      {labelPlacement === "left" ? 
        <label htmlFor={inputId}>{label}</label> : null
      }
      <p id={messageBoxId} htmlFor={inputId} /* aria-live="off" */ /* aria-atomic="true" aria-relevant="all" */>
        {renderValidityMessages()}
      </p>
    </div>
  );
}