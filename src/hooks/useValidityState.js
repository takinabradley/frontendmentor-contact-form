import { useState, useEffect, useCallback } from "react"

// extracts key/value pairs of a validityState into a 'normal' object with enumerable own values
const extractValidityValues = (validityState) => {
  let obj = {};
  for(const key in validityState) {
    obj[key] = validityState[key]
  }
  return obj
}



const useValidityState = (inputRef) => {
  const [value, setValue] = useState('')
  const [userInvalid, setUserInvalid] = useState(false)
  const [validityState, setValidityState] = useState(null)

  // setter for end-user to update vailidityState whenever they want
  // useful for getting :user-invalid to work correctly onBlur, onInvalid, etc
  const updateValidityState = useCallback(() => {
    const input = inputRef?.current
    if(input) {
      setUserInvalid(input.matches(':user-invalid'))
      setValidityState(extractValidityValues(input.validity))
    }
  }, [inputRef])

  useEffect(() => {
    updateValidityState()
  }, [value, updateValidityState, inputRef])

  return {
    ...validityState,
    userInvalid,
    setValidity: updateValidityState,
    value,
    setValue
  }
}

export default useValidityState