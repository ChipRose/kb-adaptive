const FormElementsStates = {
  ACTIVE: false,
  INACTIVE: true,
};

const FormClasses = {
  OFFER_FORM: {
    FORM: 'ad-form',
    ELEMENTS: 'ad-form__element',
    DISABLED: 'ad-form--disabled',
  },
  MAP_FILTER: {
    FORM: 'map__filters',
    ELEMENTS: 'map__filter',
    DISABLED: 'map__filters--disabled',
  },
  STATE: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  },
};

const setElementsState = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
};

const setFormState = (form, state) => {
  const { FORM, ELEMENTS, DISABLED } = form;
  const parentForm = document.querySelector(`.${FORM}`);
  const formElements = parentForm.querySelectorAll(`.${ELEMENTS}`);

  state === FormClasses.ACTIVE ? parentForm.classList.remove(DISABLED) : parentForm.classList.add(DISABLED);
  setElementsState(formElements, FormElementsStates[state]);
};

const setInactiveFilterState = () => {
  setFormState(FormClasses.MAP_FILTER, FormClasses.INACTIVE);
};

const setActiveFilterState = () => {
  setFormState(FormClasses.MAP_FILTER, FormClasses.ACTIVE);
};

const setInactiveOfferFormState = () => {
  setFormState(FormClasses.OFFER_FORM, FormClasses.INACTIVE);
};

const setActiveOfferFormState = () => {
  setFormState(FormClasses.OFFER_FORM, FormClasses.ACTIVE);
};

export { setInactiveFilterState, setActiveFilterState, setInactiveOfferFormState, setActiveOfferFormState };
