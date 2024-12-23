import React, { useState } from 'react';

const PasswordValidator = ({ password, confirmPassword }) => {
  const [validationResults, setValidationResults] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    match: false,
  });

  const validatePassword = (pwd, confirmPwd) => {
    const validations = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      match: pwd === confirmPwd,
    };
    setValidationResults(validations);
  };

  React.useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  return (
    <div>
      <h3>Password Validation</h3>
      <ul className='text-xs'>
        <li style={{ color: validationResults.length ? 'green' : 'red' }}>
          -At least 8 characters
        </li>
        <li style={{ color: validationResults.uppercase ? 'green' : 'red' }}>
          -At least one uppercase letter
        </li>
        <li style={{ color: validationResults.lowercase ? 'green' : 'red' }}>
          -At least one lowercase letter
        </li>
        <li style={{ color: validationResults.number ? 'green' : 'red' }}>
          -At least one number
        </li>
        <li style={{ color: validationResults.specialChar ? 'green' : 'red' }}>
          -At least one special character {'(!@#$%^&*(),.?":{}|<>)'}
        </li>
        <li style={{ color: validationResults.match ? 'green' : 'red' }}>
          -Passwords match
        </li>
      </ul>
    </div>
  );
};

export default PasswordValidator;