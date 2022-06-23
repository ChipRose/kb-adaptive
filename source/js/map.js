import { mapLib } from './libraries.js';
import { promoRender } from './similar-promos.js';
import { setAddress, clearForm, setPromoFormSubmit } from './form.js';
import { setMapFilter, compareCallBack } from './filter-form.js';
import { setInactiveFilterState, setActiveFilterState, setInactiveOfferFormState, setActiveOfferFormState} from './page-state.js';

const OBJECT_QUANTITY = 10;

const CoordinatesDefault = {
  LAT: 35.6894,
  LNG: 139.692,
  ZOOM: 12,
};

const MarkerSizes = {
  MAIN: {
    X: 52,
    Y: 52,
  },
  USUAL: {
    X: 40,
    Y: 40,
  },
};

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.innerHTML = '<div id="map-inner" style="width: 100%; height: 100%;"></div>';

setInactiveOfferFormState();
setInactiveFilterState();

const map = mapLib
  .map('map-inner', {
    scrollWheelZoom: false,
  })
  .on('load', () => {
    setActiveOfferFormState();
    setActiveFilterState();
  });

mapLib
  .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const setMapDefault = () => {
  map.setView(
    {
      lat: CoordinatesDefault.LAT,
      lng: CoordinatesDefault.LNG,
    },
    CoordinatesDefault.ZOOM,
  );
};

const mapMainIcon = mapLib.icon({
  iconUrl: 'img/pin/main-pin.svg',
  iconSize: [MarkerSizes.MAIN.X, MarkerSizes.MAIN.Y],
  iconAnchor: [MarkerSizes.MAIN.X / 2, MarkerSizes.MAIN.Y],
  popupAnchor: [0, -MarkerSizes.MAIN.Y / 2],
});

const mainMarker = mapLib.marker(
  {
    lat: CoordinatesDefault.LAT,
    lng: CoordinatesDefault.LNG,
  },
  {
    draggable: true,
    icon: mapMainIcon,
  },
);

mainMarker.addTo(map);

const mapUsualIcon = mapLib.icon({
  iconUrl: 'img/pin/pin.svg',
  iconSize: [MarkerSizes.USUAL.X, MarkerSizes.USUAL.Y],
  iconAnchor: [MarkerSizes.USUAL.X / 2, MarkerSizes.USUAL.Y],
  popupAnchor: [0, -MarkerSizes.USUAL.Y / 2],
});

const setUsualMarkers = (similarPromos) => {
  const usualMarkers = [];
  const popupInfoBlocks = [];

  similarPromos
    .slice()
    .sort(compareCallBack())
    .slice(0, OBJECT_QUANTITY)
    .forEach((promo) => {
      const {lat, lng} = promo.location;

      const usualMarker = mapLib.marker(
        {
          lat,
          lng,
        },
        {
          icon: mapUsualIcon,
        },
      );

      usualMarkers.push(usualMarker);
      popupInfoBlocks.push(promoRender(promo));
    });

  usualMarkers.forEach((marker, index) => {
    marker.addTo(map).bindPopup(popupInfoBlocks[index]),
    {
      keepInView: true,
    };
  });

  setMapFilter(() => removeMarkers(usualMarkers));
  clearForm(() => removeMarkers(usualMarkers));
  setPromoFormSubmit(() => removeMarkers(usualMarkers));
};

const removeMarkers = (markers) => {
  markers.forEach((marker) => marker.remove());
};

const setInitialMapState = () => {
  const { LAT, LNG } = CoordinatesDefault;

  setMapDefault();
  mainMarker.setLatLng([LAT, LNG]);
  setAddress(LAT, LNG);
};

setInitialMapState();

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

export { setUsualMarkers, setInitialMapState, setMapDefault };
