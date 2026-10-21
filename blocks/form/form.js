import { toCamelCase, toClassName } from '../../scripts/aem.js';

/**
 * Creates an HTML element with an optional class name.
 */
function createElement(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

/**
 * Generates a camelCase ID.
 */
function generateId(name, option = null) {
  const id = toCamelCase(name);
  return option ? `${id}-${toCamelCase(option)}` : id;
}

/**
 * Creates help text.
 */
function writeHelpText(text, inputId) {
  const help = createElement('p', 'field-help-text');
  help.textContent = text;
  help.id = `${inputId}-help`;
  return help;
}

/**
 * Creates a label or legend.
 */
function buildLabel(text, type = 'label', id = null, required = false) {
  const label = createElement(type);
  label.textContent = text;

  if (id && type === 'label') {
    label.setAttribute('for', id);
  }

  if (required) {
    label.dataset.required = 'true';
  }

  return label;
}

/**
 * Creates an input element.
 * Uses the label as the placeholder if no placeholder is configured.
 */
function buildInput(field) {
  const {
    type,
    field: fieldName,
    label,
    required,
    default: defaultValue,
    placeholder,
  } = field;

  const input = createElement('input');

  input.type = type || 'text';
  input.id = generateId(fieldName);
  input.name = input.id;
  input.required = required === 'true';

  if (defaultValue) {
    input.value = defaultValue;
  }

  input.placeholder = placeholder || label || '';

  return input;
}

/**
 * Creates a textarea element.
 */
function buildTextArea(field) {
  const {
    field: fieldName,
    label,
    required,
    default: defaultValue,
    placeholder,
  } = field;

  const textarea = createElement('textarea');

  textarea.id = generateId(fieldName);
  textarea.name = textarea.id;
  textarea.required = required === 'true';
  textarea.rows = 5;

  if (defaultValue) {
    textarea.value = defaultValue;
  }

  textarea.placeholder = placeholder || label || '';

  return textarea;
}

/**
 * Creates a radio or checkbox input.
 */
function buildOptionInput(field, option) {
  const {
    type,
    field: fieldName,
    default: defaultValue,
    required,
  } = field;

  const id = generateId(fieldName, option);

  const input = createElement('input');

  input.type = type;
  input.id = id;
  input.name = generateId(fieldName);
  input.value = option;
  input.checked = option === defaultValue;
  input.required = required === 'true';

  return input;
}

/**
 * Creates a fieldset containing radio or checkbox options.
 */
function buildOptions(field, controlled) {
  const {
    type,
    options,
    label,
    required,
  } = field;

  if (!options) return null;

  const fieldset = createElement('fieldset', `form-field ${type}-field`);

  if (controlled) {
    const controller = controlled.split('-')[0];

    fieldset.dataset.controller = controller;
    fieldset.dataset.condition = controlled;
  }

  fieldset.append(
    buildLabel(label, 'legend', null, required === 'true'),
  );

  options.split(',').forEach((o) => {
    const option = o.trim();

    const input = buildOptionInput(field, option);
    const span = createElement('span');
    const labelEl = buildLabel(option, 'label', input.id);

    labelEl.prepend(input, span);
    fieldset.append(labelEl);
  });

  return fieldset;
}

/**
 * Fetches select options from a URL.
 */
async function buildOptionsFromUrl(url) {
  const resp = await fetch(url);
  const { data } = await resp.json();

  const options = data.map((o) => {
    const { option, value } = o;
    const optionEl = createElement('option');

    if (option && value) {
      optionEl.value = value;
      optionEl.textContent = option;
    } else if (option && !value) {
      optionEl.value = option;
      optionEl.textContent = option;
    } else if (value && !option) {
      optionEl.value = value;
      optionEl.textContent = value;
    }

    return optionEl;
  });

  return options;
}

/**
 * Creates a select dropdown field.
 */
function buildSelect(field, controlled) {
  const {
    type,
    options,
    field: fieldName,
    label,
    required,
    placeholder,
  } = field;

  if (!options) return null;

  const wrapper = createElement('div', `form-field ${type}-field`);

  if (controlled) {
    const controller = controlled.split('-')[0];

    wrapper.dataset.controller = controller;
    wrapper.dataset.condition = controlled;
  }

  wrapper.append(
    buildLabel(label, 'label', generateId(fieldName), required === 'true'),
  );

  const select = createElement('select');

  select.id = generateId(fieldName);
  select.name = select.id;
  select.required = required === 'true';

  wrapper.append(select);

  if (placeholder || label) {
    const placeholderOption = createElement('option');

    placeholderOption.value = '';
    placeholderOption.textContent = placeholder || label;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;

    select.append(placeholderOption);
  }

  try {
    const url = new URL(options);

    buildOptionsFromUrl(url).then((os) => {
      select.append(...os);
    }).catch((error) => {
      console.error('Could not load select options:', error);
    });
  } catch (error) {
    options.split(',').forEach((o) => {
      const option = o.trim();
      const optionEl = createElement('option');

      optionEl.value = option;
      optionEl.textContent = option;

      select.append(optionEl);
    });
  }

  return wrapper;
}

/**
 * Creates a toggle switch field.
 */
function buildToggle(field, controlled) {
  const {
    label,
    required,
    default: defaultValue,
  } = field;

  const wrapper = createElement('div', 'form-field toggle-field');

  if (controlled) {
    const controller = controlled.split('-')[0];

    wrapper.dataset.controller = controller;
    wrapper.dataset.condition = controlled;
  }

  const input = buildOptionInput(
    { ...field, type: 'checkbox' },
    defaultValue || 'true',
  );

  input.setAttribute('role', 'switch');
  input.setAttribute('aria-checked', input.checked);

  input.addEventListener('change', () => {
    input.setAttribute('aria-checked', input.checked);
  });

  const span = createElement('span');
  const labelEl = buildLabel(label, 'label', input.id, required === 'true');

  labelEl.prepend(input, span);
  wrapper.append(labelEl);

  return wrapper;
}

/**
 * Creates a button.
 */
function buildButton(field) {
  const { type, label } = field;

  const button = createElement('button');

  button.className = 'button';
  button.type = type;
  button.textContent = label;

  if (type === 'reset') {
    button.classList.add('secondary');
  }

  return button;
}

/**
 * Toggles visibility of conditional fields.
 */
function toggleConditional(e, controllerConfig) {
  const { target } = e;
  const controller = target.name;

  if (controllerConfig.has(controller)) {
    const inputs = [...controllerConfig.get(controller)];

    inputs.forEach((input) => {
      const field = input.closest('.form-field');

      if (!field) return;

      const { condition } = field.dataset;
      const conditionMet = condition.includes(toClassName(target.value));

      field.setAttribute('aria-hidden', !conditionMet);

      if (conditionMet) {
        if (input.dataset.originalRequired === 'true') {
          input.setAttribute('required', '');
        }

        input.removeAttribute('tabindex');
      } else {
        input.removeAttribute('required');
        input.setAttribute('tabindex', '-1');
      }
    });
  }
}

/**
 * Initializes conditional fields.
 */
function initConditionals(form, controllerConfig) {
  controllerConfig.forEach((controlledInputs, controller) => {
    let controllerValue = null;

    const checked = form.querySelector(`[name="${controller}"]:checked`);
    const select = form.querySelector(`select[name="${controller}"]`);

    if (checked) {
      controllerValue = checked.value;
    } else if (select) {
      controllerValue = select.value;
    }

    if (controllerValue) {
      controlledInputs.forEach((input) => {
        const field = input.closest('.form-field');

        if (!field) return;

        const { condition } = field.dataset;
        const conditionMet = condition.includes(
          toClassName(controllerValue),
        );

        field.setAttribute('aria-hidden', !conditionMet);

        if (input.hasAttribute('required')) {
          if (!input.dataset.originalRequired) {
            input.dataset.originalRequired = 'true';
          }

          if (!conditionMet) {
            input.removeAttribute('required');
          }
        }

        if (conditionMet) {
          input.removeAttribute('tabindex');
        } else {
          input.setAttribute('tabindex', '-1');
        }
      });
    } else {
      controlledInputs.forEach((input) => {
        const field = input.closest('.form-field');

        if (!field) return;

        field.setAttribute('aria-hidden', true);

        if (input.hasAttribute('required')) {
          if (!input.dataset.originalRequired) {
            input.dataset.originalRequired = 'true';
          }

          input.removeAttribute('required');
        }

        input.setAttribute('tabindex', '-1');
      });
    }
  });
}

/**
 * Enables conditional fields.
 */
function enableConditionals(form) {
  const controlled = [...form.querySelectorAll('[data-controller]')];
  const controllerConfig = new Map();

  controlled.forEach((container) => {
    const input = container.querySelector('input, textarea, select');
    const { controller } = container.dataset;

    if (!input) return;

    if (!controllerConfig.has(controller)) {
      controllerConfig.set(controller, []);
    }

    controllerConfig.get(controller).push(input);

    if (input.id) {
      const controllerInputs = form.querySelectorAll(
        `[name="${controller}"]`,
      );

      controllerInputs.forEach((controllerInput) => {
        const existingControls = controllerInput.getAttribute('aria-controls') || '';
        const controlsArray = existingControls.split(' ').filter((item) => item);

        if (!controlsArray.includes(input.id)) {
          controlsArray.push(input.id);
        }

        controllerInput.setAttribute(
          'aria-controls',
          controlsArray.join(' '),
        );

        input.setAttribute('aria-controlledby', controllerInput.id);
      });
    }
  });

  initConditionals(form, controllerConfig);

  form.addEventListener('change', (e) => {
    toggleConditional(e, controllerConfig);
  });
}

/**
 * Enables or disables all form elements.
 */
function toggleForm(form, disabled = true) {
  [...form.elements].forEach((el) => {
    el.disabled = disabled;
  });
}

/**
 * Generates the form submission payload.
 */
function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) {
          payload[field.name] = field.value;
        }
      } else if (field.type === 'checkbox') {
        if (field.checked) {
          payload[field.name] = payload[field.name]
            ? `${payload[field.name]},${field.value}`
            : field.value;
        }
      } else {
        payload[field.name] = field.value;
      }
    }
  });

  return payload;
}

/**
 * Handles form submission.
 */
async function handleSubmit(form) {
  try {
    const payload = generatePayload(form);

    toggleForm(form);

    const response = await fetch(form.dataset.action, {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      if (form.dataset.confirmation) {
        window.location.href = form.dataset.confirmation;
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    toggleForm(form, false);
  }
}

/**
 * Sets up form submission.
 */
function enableSubmission(form, submit, fields) {
  form.dataset.action = submit;

  const confirmation = fields.find((f) => f.type === 'confirmation');

  if (confirmation) {
    form.dataset.confirmation = confirmation.label || confirmation.default;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valid = form.reportValidity();

    if (valid) {
      handleSubmit(form);
    } else {
      const firstInvalid = form.querySelector(':invalid:not(fieldset)');

      if (firstInvalid) {
        firstInvalid.focus();

        firstInvalid.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        firstInvalid.setAttribute('aria-invalid', true);
      }
    }
  });

  form.addEventListener('input', (e) => {
    if (e.target.hasAttribute('aria-invalid')) {
      if (e.target.validity.valid) {
        e.target.removeAttribute('aria-invalid');
      }
    }
  });
}

/**
 * Creates a form field.
 */
function buildField(field) {
  const {
    type,
    label,
    help,
    field: fieldName,
    conditional,
  } = field;

  const controlled = conditional || null;

  // Submit and reset buttons
  if (type === 'submit' || type === 'reset') {
    return buildButton(field);
  }

  // Radio and checkbox fields
  if (type === 'radio' || type === 'checkbox') {
    const fieldset = buildOptions(field, controlled);

    if (help && fieldset) {
      const helpText = writeHelpText(help, generateId(fieldName));
      fieldset.append(helpText);
    }

    return fieldset;
  }

  // Toggle fields
  if (type === 'toggle') {
    const toggle = buildToggle(field, controlled);

    if (help) {
      const helpText = writeHelpText(help, generateId(fieldName));
      toggle.append(helpText);
    }

    return toggle;
  }

  // Select fields
  if (type === 'select') {
    const select = buildSelect(field, controlled);

    if (help && select) {
      const helpText = writeHelpText(help, generateId(fieldName));
      select.append(helpText);
    }

    return select;
  }

  // Input and textarea wrappers.
  // The textarea gets an extra class to make it span both columns.
  const wrapper = createElement(
    'div',
    `form-field ${type}-field${type === 'textarea' ? ' textarea-field' : ''}`,
  );

  if (controlled) {
    const controller = controlled.split('-')[0];

    wrapper.dataset.controller = controller;
    wrapper.dataset.condition = controlled;
  }

  const inputId = generateId(fieldName);

  wrapper.append(
    buildLabel(label, 'label', inputId, field.required === 'true'),
  );

  let helpText;

  if (help) {
    helpText = writeHelpText(help, inputId);
    wrapper.append(helpText);
  }

  const input = type === 'textarea'
    ? buildTextArea(field)
    : buildInput(field);

  if (type === 'textarea') {
    wrapper.append(input);
  } else {
    wrapper.insertBefore(input, wrapper.firstChild.nextSibling);
  }

  if (help) {
    input.setAttribute('aria-describedby', helpText.id);
  }

  return wrapper;
}

/**
 * Builds the complete form.
 */
function buildForm(fields, submit) {
  const form = createElement('form');

  form.setAttribute('novalidate', '');

  const buttons = [];

  fields.forEach((field) => {
    if (field.type === 'submit' || field.type === 'reset') {
      buttons.push(field);
    } else if (field.type !== 'confirmation') {
      form.append(buildField(field));
    }
  });

  // Add buttons at the end.
  if (buttons.length) {
    const buttonWrapper = createElement('div', 'button-wrapper');

    buttons.forEach((button) => {
      buttonWrapper.append(buildField(button));
    });

    form.append(buttonWrapper);
  }

  enableConditionals(form);

  if (submit) {
    enableSubmission(form, submit, fields);
  }

  return form;
}

/**
 * Initializes the form block.
 */
export default function decorate(block) {
  block.style.visibility = 'hidden';

  const [source, submit] = [...block.querySelectorAll('a[href]')]
    .map((a) => a.href);

  if (source) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          try {
            const resp = await fetch(
              new URL(source, window.location.origin),
            );

            if (!resp.ok) {
              throw new Error(`${resp.status}: ${resp.statusText}`);
            }

            const { data } = await resp.json();

            if (!data) {
              throw new Error(`No form fields at ${source}`);
            }

            const form = buildForm(data, submit);

            // Create the Request For Service heading.
            const heading = createElement('h2', 'form-title');

            const boldText = createElement('strong');
            boldText.textContent = 'Request For';

            heading.append(
              boldText,
              document.createTextNode(' Service'),
            );

            // Insert heading before the generated form.
            block.replaceChildren(heading, form);

            block.removeAttribute('style');
          } catch (error) {
            console.error('Could not build form from', source, error);

            if (block.parentElement) {
              block.parentElement.remove();
            }
          }

          observer.disconnect();
        }
      });
    }, { threshold: 0 });

    observer.observe(block);
  } else {
    console.error('Unable to create form without source');

    if (block.parentElement) {
      block.parentElement.remove();
    }
  }
}