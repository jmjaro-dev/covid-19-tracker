import { 
  GET_GLOBAL_SUMMARY, 
  GET_COUNTRY_INFO,
  GET_TOP_COUNTRIES, 
  SET_LOADING,
  SET_LOADING_TOP_COUNTRIES
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case GET_GLOBAL_SUMMARY: 
      return {
        ...state,
        globalInfo: action.payload,
        countryInfo: null,
        loading: false
      }
    case GET_COUNTRY_INFO: 
      return {
        ...state,
        countryInfo: action.payload,
        globalInfo: null,
        loading: false
      }
    case GET_TOP_COUNTRIES: 
      switch(action.payload.filter) {
        case 'confirmed': 
          return {
            ...state,
            topCountriesInfo: action.payload.countries.sort((countryA, countryB) => countryB.cases-countryA.cases).filter((country, index) => index <= 9),
            loading_top_countries: false
          }
        case 'deaths': 
          return {
            ...state,
            topCountriesInfo: action.payload.countries.sort((countryA, countryB) => countryB.deaths-countryA.deaths).filter((country, index) => index <= 9),
            loading_top_countries: false
          }
        case 'active': 
          return {
            ...state,
            topCountriesInfo: action.payload.countries.sort((countryA, countryB) => countryB.active-countryA.active).filter((country, index) => index <= 9),
            loading_top_countries: false
          }
        case 'critical': 
          return {
            ...state,
            topCountriesInfo: action.payload.countries.sort((countryA, countryB) => countryB.critical-countryA.critical).filter((country, index) => index <= 9),
            loading_top_countries: false
          }
        case 'recovered': 
          return {
            ...state,
            topCountriesInfo: action.payload.countries.sort((countryA, countryB) => countryB.recovered-countryA.recovered).filter((country, index) => index <= 9),
            loading_top_countries: false
          }
        case 'tests': 
          return {
            ...state,
            topCountriesInfo: action.payload.countries.sort((countryA, countryB) => countryB.tests-countryA.tests).filter((country, index) => index <= 9),
            loading_top_countries: false
          }
        default: 
          return state;
      }
    case SET_LOADING: 
      return {
        ...state,
        loading: true
      }
    case SET_LOADING_TOP_COUNTRIES: 
      return {
        ...state,
        loading_top_countries: true
      }
    default:
      return state;
  }
}