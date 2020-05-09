import { GET_GLOBAL_SUMMARY, GET_COUNTRY_INFO, SET_LOADING } from '../types';

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
    case SET_LOADING: 
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}