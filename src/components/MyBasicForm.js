import useInput from '../hooks/use-input';

const BasicForm = (props) => {

    const isFieldValid = (value) => {
       return value.trim().length !== 0
    }

    const isEmailValid = (value) => {
        return value.includes('@')
     }

    const { value: firstNameValue,
        isValid: firstNameIsvalid,
        hasError: hasFirstNameError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName
    } = useInput((value) => value !== '')

    const { value: lastNameValue,
        isValid: lastNameIsvalid,
        hasError: hasLastNameError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName
    } = useInput(isFieldValid)

    const { value: emailValue,
        isValid: emailIsvalid,
        hasError: hasEmailError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput(isEmailValid)

    const formIsValid= !(hasFirstNameError || hasLastNameError || hasEmailError)

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid){           
            console.log(firstNameValue+'*'+ lastNameValue +'*'+ emailValue)
            return;
        }

            resetFirstName();
            resetLastName();
            resetEmail();
    }

    const firstNameClasses = hasFirstNameError ? "form-control invalid" :"form-control"
    const lastNameClasses = hasLastNameError ? "form-control invalid" :"form-control"
    const emailClasses = hasEmailError ? "form-control invalid" :"form-control"

    return (
        <form onSubmit={submitHandler}>
            <div className='control-group'>
                <div className={firstNameClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input
                        type='text'
                        id='name'
                        value={firstNameValue}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                    />
                    {hasFirstNameError && <p className="error-text">Please enter a first name.</p>}
                </div>
                <div className={lastNameClasses}>
                    <label htmlFor='name'>Last Name</label>
                    <input
                        type='text'
                        id='name'
                        value={lastNameValue}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                    />
                    {hasLastNameError && <p className="error-text">Please enter a last name.</p>}
                </div>
            </div>
            <div className={emailClasses}>
                <label htmlFor='name'>E-Mail Address</label>
                <input
                    type='text'
                    id='name'
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {hasEmailError && <p className="error-text">Please enter a valid email address.</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
