
'use strict';



/* ---------- Constants ---------- */
const ABSOLUTE_ZERO = {
  celsius: -273.15,
  fahrenheit: -459.67,
  kelvin: 0,
};

const LOADING_DURATION_MS = 300;

/* ---------- DOM references ---------- */
const form = document.getElementById('converter-form');
const temperatureInput = document.getElementById('temperature-input');
const unitSelect = document.getElementById('unit-select');
const convertBtn = document.getElementById('convert-btn');
const resetBtn = document.getElementById('reset-btn');
const copyBtn = document.getElementById('copy-btn');
const copyBtnLabel = document.getElementById('copy-btn-label');

const errorMessage = document.getElementById('error-message');
const errorMessageText = document.getElementById('error-message-text');

const resultsSection = document.getElementById('results-section');
const valueCelsius = document.getElementById('value-celsius');
const valueFahrenheit = document.getElementById('value-fahrenheit');
const valueKelvin = document.getElementById('value-kelvin');

const resultCards = {
  celsius: document.getElementById('card-celsius'),
  fahrenheit: document.getElementById('card-fahrenheit'),
  kelvin: document.getElementById('card-kelvin'),
};

let existingErrorCard = null;

/* ============================================================
   VALIDATION
   ============================================================ */

/**
 * Validates the raw string typed into the temperature field.
 * Returns { valid: boolean, value: number|null, message: string }
 */
function validateInput(rawValue) {
  const trimmed = rawValue.trim();

  if (trimmed === '') {
    return { valid: false, value: null, message: 'Please enter a temperature value.' };
  }

  // Allow an optional leading minus sign, digits, and a single decimal point.
  const numericPattern = /^-?\d*\.?\d+$/;

  if (!numericPattern.test(trimmed)) {
    return { valid: false, value: null, message: 'Enter numbers only, like 25 or -12.5.' };
  }

  const numericValue = parseFloat(trimmed);

  if (Number.isNaN(numericValue) || !Number.isFinite(numericValue)) {
    return { valid: false, value: null, message: 'That value is not a valid number.' };
  }

  return { valid: true, value: numericValue, message: '' };
}

/**
 * Confirms a temperature does not fall below absolute zero for its unit.
 * Returns { valid: boolean, message: string }
 */
function validatePhysicalLimit(value, unit) {
  const floor = ABSOLUTE_ZERO[unit];

  if (value < floor) {
    const unitLabel = { celsius: '°C', fahrenheit: '°F', kelvin: 'K' }[unit];
    return {
      valid: false,
      message: `That's below absolute zero (${floor}${unitLabel}). Enter a value at or above the physical limit.`,
    };
  }

  return { valid: true, message: '' };
}

/* ============================================================
   CONVERSION
   ============================================================ */

/**
 * Converts a temperature value from the given unit into
 * Celsius, Fahrenheit and Kelvin.
 * Returns { celsius: number, fahrenheit: number, kelvin: number }
 */
function convertTemperature(value, fromUnit) {
  let celsius;

  switch (fromUnit) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      throw new Error(`Unknown unit: ${fromUnit}`);
  }

  const fahrenheit = celsius * (9 / 5) + 32;
  const kelvin = celsius + 273.15;

  return {
    celsius: roundTemperature(celsius),
    fahrenheit: roundTemperature(fahrenheit),
    kelvin: roundTemperature(kelvin),
  };
}

/** Rounds to 2 decimal places and strips trailing zeros for a clean display. */
function roundTemperature(value) {
  return Math.round(value * 100) / 100;
}

/* ============================================================
   DISPLAY
   ============================================================ */

/** Renders converted results into the three result cards. */
function displayResults(results) {
  hideError();

  valueCelsius.textContent = formatNumber(results.celsius);
  valueFahrenheit.textContent = formatNumber(results.fahrenheit);
  valueKelvin.textContent = formatNumber(results.kelvin);

  resultsSection.hidden = false;

  // Trigger a soft "updated" animation on each card.
  Object.values(resultCards).forEach((card) => {
    card.classList.remove('is-updated');
    // Force reflow so the animation can replay on repeated conversions.
    void card.offsetWidth;
    card.classList.add('is-updated');
  });

  window.setTimeout(() => {
    Object.values(resultCards).forEach((card) => card.classList.remove('is-updated'));
  }, 600);
}

function formatNumber(value) {
  // Keep whole numbers clean (25 instead of 25.00) while preserving decimals.
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

/** Displays a friendly inline validation message above the buttons. */
function showError(message) {
  hideResults();
  removeErrorCard();

  errorMessageText.textContent = message;
  errorMessage.hidden = false;
  temperatureInput.classList.add('is-invalid');
  temperatureInput.setAttribute('aria-invalid', 'true');
}

/** Clears the inline validation message. */
function hideError() {
  errorMessage.hidden = true;
  errorMessageText.textContent = '';
  temperatureInput.classList.remove('is-invalid');
  temperatureInput.removeAttribute('aria-invalid');
}

/** Displays a distinct elegant card for physically impossible temperatures. */
function showPhysicalLimitError(message) {
  hideResults();
  hideError();
  removeErrorCard();

  const card = document.createElement('div');
  card.className = 'error-card';
  card.setAttribute('role', 'alert');
  card.innerHTML = `
    <svg class="error-card__icon" width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#DC2626" stroke-width="1.6"/>
      <path d="M10 6.5v4" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="10" cy="13.2" r="0.9" fill="#DC2626"/>
    </svg>
    <div>
      <p class="error-card__title">Impossible temperature</p>
      <p class="error-card__text">${message}</p>
    </div>
  `;

  form.insertAdjacentElement('afterend', card);
  existingErrorCard = card;
}

function removeErrorCard() {
  if (existingErrorCard) {
    existingErrorCard.remove();
    existingErrorCard = null;
  }
}

/** Hides the results section entirely. */
function hideResults() {
  resultsSection.hidden = true;
}

/** Resets the form, results, and any messages back to their initial state. */
function clearResults() {
  form.reset();
  hideError();
  hideResults();
  removeErrorCard();
  copyBtnLabel.textContent = 'Copy';
  copyBtn.classList.remove('is-copied');
  temperatureInput.focus();
}

/* ============================================================
   LOADING STATE
   ============================================================ */

function setLoading(isLoading) {
  convertBtn.classList.toggle('is-loading', isLoading);
  convertBtn.disabled = isLoading;
}

/* ============================================================
   EVENT HANDLERS
   ============================================================ */

/** Runs validation live as the user types, without blocking input. */
function handleLiveValidation() {
  const rawValue = temperatureInput.value;

  if (rawValue.trim() === '') {
    hideError();
    return;
  }

  const validation = validateInput(rawValue);

  if (!validation.valid) {
    temperatureInput.classList.add('is-invalid');
    temperatureInput.setAttribute('aria-invalid', 'true');
  } else {
    temperatureInput.classList.remove('is-invalid');
    temperatureInput.removeAttribute('aria-invalid');
  }
}

/** Main submit handler: validate, convert, and display. */
function handleConvertSubmit(event) {
  event.preventDefault();

  const rawValue = temperatureInput.value;
  const unit = unitSelect.value;

  const inputValidation = validateInput(rawValue);
  if (!inputValidation.valid) {
    showError(inputValidation.message);
    return;
  }

  const limitValidation = validatePhysicalLimit(inputValidation.value, unit);
  if (!limitValidation.valid) {
    showPhysicalLimitError(limitValidation.message);
    return;
  }

  setLoading(true);

  // Brief, deliberate loading state (~300ms) before revealing results.
  window.setTimeout(() => {
    const results = convertTemperature(inputValidation.value, unit);
    displayResults(results);
    setLoading(false);
  }, LOADING_DURATION_MS);
}

/** Copies the current results to the clipboard as plain text. */
async function handleCopyResults() {
  const text = [
    `Celsius: ${valueCelsius.textContent} °C`,
    `Fahrenheit: ${valueFahrenheit.textContent} °F`,
    `Kelvin: ${valueKelvin.textContent} K`,
  ].join('\n');

  try {
    await navigator.clipboard.writeText(text);
    copyBtnLabel.textContent = 'Copied';
    copyBtn.classList.add('is-copied');

    window.setTimeout(() => {
      copyBtnLabel.textContent = 'Copy';
      copyBtn.classList.remove('is-copied');
    }, 1800);
  } catch (err) {
    // Clipboard API can fail in unsupported/insecure contexts; fail quietly.
    copyBtnLabel.textContent = 'Unable to copy';
    window.setTimeout(() => {
      copyBtnLabel.textContent = 'Copy';
    }, 1800);
  }
}

/* ============================================================
   INIT
   ============================================================ */

function init() {
  form.addEventListener('submit', handleConvertSubmit);
  temperatureInput.addEventListener('input', handleLiveValidation);
  resetBtn.addEventListener('click', clearResults);
  copyBtn.addEventListener('click', handleCopyResults);

  // Enter key submits the form (default behavior for text inputs inside
  // a form already does this, but we guard explicitly for clarity).
  temperatureInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      form.requestSubmit();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
