import { useReducer, useState } from 'react';


const initialState = {
  enteredValue: '',
  isTouched: false,
  valueIsValid:false,
  hasError:false
}

const inputReducer = (state, action) => {
 ;debugger
  if (action.type === 'TOUCHED') {

    const validateMethod =action.payload.validator;   
    let isValueValid = validateMethod(state.enteredValue);
   let hasInputError =  ! isValueValid;
    return { ...state, isTouched: true, hasError: hasInputError }

  } else if (action.type === 'VALUECHANGED') {
   const validateMethod =action.payload.validator;
   const value = action.payload.value;
   let isValueValid = validateMethod(value);
   const hasError = !isValueValid && state.isTouched;    
    return { ...state, isValid:isValueValid, hasError:hasError, enteredValue: action.payload.value }
  }
  else if (action.type === 'RESET') {
    return initialState;
  } else {
    return initialState;
  }

}

const useInput = (validateValue) => {

const[state, dispatchInputAction] = useReducer(inputReducer,initialState);

  /* const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
 */
  const valueChangeHandler = (event) => {
   // setEnteredValue(event.target.value);
   dispatchInputAction({type:'VALUECHANGED', payload:{value:event.target.value,validator:validateValue}})
  };

  const inputBlurHandler = (event) => {
   // setIsTouched(true);
   ;debugger
   dispatchInputAction({type:'TOUCHED', payload:{validator:validateValue}})
  };

  const reset = () => {
   /*  setEnteredValue('');
    setIsTouched(false); */
    dispatchInputAction({type:'RESET'})
  };

  return {
    value: state.enteredValue,
    isValid: state.valueIsValid,
    hasError:state.hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
