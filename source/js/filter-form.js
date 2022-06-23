import { setFeaturesDefault } from './form.js';
import { setMapDefault } from './map.js';

const DEFAULT_FILTER_VALUE = 'any';

const PriceRange = {
  ANY: {
    MIN: 0,
    MAX: 1000000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  HIGH: {
    MIN: 50000,
    MAX: 1000000,
  },
};

const RankValue = {
  TYPE: 4,
  PRICE: 3,
  ROOMS: 2,
  GUESTS: 1,
  FEATURES: 1,
};

const mapFilterForm = document.querySelector('.map__filters');
const mapFilters = mapFilterForm.querySelectorAll('.map__filter');
const objectFeaturesFilter = mapFilterForm.querySelector('.map__features');
const objectFeaturesFilterSet = objectFeaturesFilter.querySelectorAll('.map__checkbox');

const compareCallBack = () => {
  const getPromoRank = (promo) => {
    const { offer } = promo;
    let rank = 0;

    const objectTypeFilter = mapFilterForm.querySelector('#housing-type').value;
    const objectPriceFilter = mapFilterForm.querySelector('#housing-price').value.toUpperCase();
    const objectRoomsFilter = Number(mapFilterForm.querySelector('#housing-rooms').value);
    const objectCapacityFilter = Number(mapFilterForm.querySelector('#housing-guests').value);
    const checkedFeatures = objectFeaturesFilter.querySelectorAll('.map__checkbox:checked');

    if (offer.type === objectTypeFilter) {
      rank += RankValue.TYPE;
    }
    if (offer.price >= PriceRange[objectPriceFilter].MIN && offer.price <= PriceRange[objectPriceFilter].MAX) {
      rank += RankValue.PRICE;
    }
    if (offer.rooms === objectRoomsFilter) {
      rank += RankValue.ROOMS;
    }
    if (offer.guests === objectCapacityFilter) {
      rank += RankValue.GUESTS;
    }
    if (offer.features) {
      checkedFeatures.forEach((feature) => {
        if (offer.features.includes(feature.value)) {
          rank += RankValue.FEATURES;
        }
      });
    }

    return rank;
  };

  const comparePromos = (promoA, promoB) => {
    const rankA = getPromoRank(promoA);
    const rankB = getPromoRank(promoB);

    return rankB - rankA;
  };

  return comparePromos;
};

const setMapFilter = (cb) => {
  mapFilterForm.addEventListener('change', () => {
    cb();
    setMapDefault();
  });
};

const setInitialFilterState = () => {
  mapFilters.forEach((filter) => {
    filter.value = DEFAULT_FILTER_VALUE;
  });

  setFeaturesDefault(objectFeaturesFilterSet);
};

export { setMapFilter, compareCallBack, setInitialFilterState };
