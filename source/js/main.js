import './images-preview.js';

import './../css/style.css';

import { setUsualMarkers, setInitialMapState } from './map.js';
import { getData } from './api.js';
import { setSuccessState, setErrorState, showAllertMessage } from './util/util-message.js';
import { setPromoFormSubmit, clearForm, sendPromoForm, setInitialFormState } from './form.js';
import { setMapFilter, setInitialFilterState } from './filter-form.js';
import { debounceLib } from './libraries.js';

const RERENDER_DELAY = 500;

getData(
  (promos) => {
    setUsualMarkers(promos);
    setPromoFormSubmit(() => setUsualMarkers(promos));
    setMapFilter(debounceLib(() => setUsualMarkers(promos), RERENDER_DELAY));
    clearForm(() => setUsualMarkers(promos));
  },

  () => showAllertMessage(),
);

setPromoFormSubmit(sendPromoForm(setSuccessState, setErrorState));
clearForm(setInitialFormState, setInitialFilterState, setInitialMapState);
