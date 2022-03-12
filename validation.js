// Show Error Functions

function showError(input, inputError, inputName, patternSummary) {
  if (input.validity.valueMissing) {
    inputError.textContent = `You need to enter ${inputName}.`;
  } else if (input.validity.typeMismatch) {
    inputError.textContent = `Entered value needs to be ${inputName}.`;
  } else if (input.validity.tooShort) {
    inputError.textContent = `Entered value should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
  } else if (input.validity.patternMismatch) {
    inputError.textContent = `Entered characters should be ${patternSummary}.`;
  }
  // Set the styling appropriately
  inputError.className = 'error active';
}

function showPasswordConfirmationError(pword, pwordConfirmation, errorField) {
  errorField.textContent = `Your password confirmation must match your password.`;
  // Set the styling appropriately
  errorField.className = 'error active';
}

// Configure Input Event Listeners

function configureInputEventListener(
  input,
  inputError,
  inputName,
  patternSummary
) {
  input.addEventListener('focusout', () => {
    if (input.validity.valid) {
      inputError.textContent = ''; // Reset the content of the message
      inputError.className = 'error'; // Reset the visual state of the message
    } else {
      // If there is an error, show the correct error
      showError(input, inputError, inputName, patternSummary);
    }
  });
}

function configurePasswordConfirmationEventListener(
  pword,
  pwordConfirmation,
  errorField
) {
  pwordConfirmation.addEventListener('focusout', () => {
    if (pword.value === pwordConfirmation.value) {
      errorField.textContent = ''; // Reset the content of the message
      errorField.className = 'error'; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      showPasswordConfirmationError(pword, pwordConfirmation, errorField);
    }
  });
}

// Query Selectors

// Email
const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');
const emailType = 'an email address';
configureInputEventListener(email, emailError, emailType);

// Country
const country = document.getElementById('country');
const countryError = document.querySelector('#country + span.error');
const countryType = 'a country';
const countryPattern = 'letters only';
configureInputEventListener(country, countryError, countryType, countryPattern);

// Zip Code
const zipCode = document.getElementById('zip-code');
const zipCodeError = document.querySelector('#zip-code + span.error');
const zipType = 'a zip code';
const zipPattern = 'numbers only';
configureInputEventListener(zipCode, zipCodeError, zipType, zipPattern);

// Password
const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');
const passwordType = 'a password';
configureInputEventListener(password, passwordError, passwordType);

// Password Confirmation
const passwordConfirmation = document.getElementById('conf-password');
const passwordConfirmationError = document.querySelector(
  '#conf-password + span.error'
);
configurePasswordConfirmationEventListener(
  password,
  passwordConfirmation,
  passwordConfirmationError
);

// Form
const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', (event) => {
  // if all fields are valid, we let the form submit
  if (!email.validity.valid) {
    showError(email, emailError, emailType);
    // Prevent the form from being sent by canceling the event
    event.preventDefault();
  }
  if (!country.validity.valid) {
    showError(country, countryError, countryType, countryPattern);
    event.preventDefault();
  }
  if (!zipCode.validity.valid) {
    showError(zipCode, zipCodeError, zipType, zipPattern);
    event.preventDefault();
  }
  if (!password.validity.valid) {
    showError(password, passwordError, passwordType);
    event.preventDefault();
  }
  if (password.value !== passwordConfirmation.value) {
    showPasswordConfirmationError(
      password,
      passwordConfirmation,
      passwordConfirmationError
    );
    event.preventDefault();
  }
});
