import validator from 'is_js';

const checkEmpty = (val, key) => {
  if (validator.empty(val.trim())) {
    return `Please enter ${key}`;
  } else {
    return '';
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `Please enter valid ${key}`;
  } else {
    return '';
  }
};

export default function (data) {
  const {name, email, password} = data;

  if (name !== undefined) {
    let emptyValidationText = checkEmpty(name, 'name');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLenghtValidation = checkMinLength(name, 3, 'name');
      if (minLenghtValidation !== '') {
        return minLenghtValidation;
      }
    }
  }

  if (email !== undefined) {
    let emptyValidationText = checkEmpty(email, 'email');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      if (!validator.email(email)) {
        return 'Please enter valid email';
      }
    }
  }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(password, 'password');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLenghtValidation = checkMinLength(password, 5, 'password');
      if (minLenghtValidation !== '') {
        return minLenghtValidation;
      }
    }
  }
}
