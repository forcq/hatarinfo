import { SWAP_SELECTED_COUNTRIES, UPDATE_COUNTRY_FROM, UPDATE_COUNTRY_TO } from "./actions";

const supportedCountries = [
  {
    name: "Magyarország",
    code: "hu",
    neighbours: ["rs", "ro", "ua", "sl", "sk", "at", "hr"],
    link: "http://www.police.hu/hu/hirek-es-informaciok/hatarinfo?field_hat_rszakasz_value=szerb+hat%C3%A1rszakasz",
  },
  {
    name: "Szerbia",
    code: "rs",
    neighbours: ["hu", "ro", "hr"],
    link: "http://www.police.hu/hu/hirek-es-informaciok/hatarinfo?field_hat_rszakasz_value=szerb+hat%C3%A1rszakasz",
  },
  // { name: "Románia", code: "ro", neighbours: ["rs", "ua", "hu"] },
  // { name: "Ukrajna", code: "ua", neighbours: ["ro", "sk", "hu"] },
  // { name: "Slovénia", code: "sl", neighbours: ["hu", "at", "hr"] },
  // { name: "Szlovákia", code: "sk", neighbours: ["at", "hu", "ua"] },
  // { name: "Ausztria", code: "at", neighbours: ["sl", "sk", "hu"] },
  // { name: "Horvátország", code: "hr", neighbours: ["rs", "sl"] },
];

const initialState = {
  countries: supportedCountries,
  selectedCountries: {
    from: supportedCountries[0],
    to: supportedCountries[1],
  },
};

export const countries = (state = initialState.countries, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const selectedCountries = (state = initialState.selectedCountries, action) => {
  switch (action.type) {
    case UPDATE_COUNTRY_FROM:
      return {
        from: action.payload,
        to: findFirstNeighbourCountry(supportedCountries, action),
      };
    case UPDATE_COUNTRY_TO:
      return { ...state, to: action.payload };
    case SWAP_SELECTED_COUNTRIES:
      return { from: state.to, to: state.from };
    default:
      return state;
  }
};
function findFirstNeighbourCountry(countries, action) {
  return countries.find((country) => action.payload.neighbours.includes(country.code));
}
