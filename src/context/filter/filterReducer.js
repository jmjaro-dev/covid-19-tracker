import { SET_COUNTRY, GET_COUNTRIES, SET_LOADING } from '../types';

export default (state, action) => {
  switch(action.type) {
    case SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
        loading: false
      }
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
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