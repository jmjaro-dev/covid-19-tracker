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
        case 'cases': 
        case 'deaths':
        case 'active': 
        case 'critical':
        case 'recovered': 
        case 'tests': 
          return {
            ...state,
            topCountriesInfo: action.payload.countries.filter((country, index) => index <= 9),
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