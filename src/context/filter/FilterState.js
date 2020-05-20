import React, { useReducer } from 'react';
import axios from 'axios';
import FilterContext from './filterContext'
import FilterReducer from './filterReducer'
import {
  SET_COUNTRY,
  GET_COUNTRIES,
  SET_LOADING
} from '../types';

const FilterState = props => {
  const initialState = {
    country: "Global",
    countries: null,
    loading: false
  };

  const [state, dispatch] = useReducer(FilterReducer, initialState);

  // Set Filter
  const setCountry = country => {
    setLoading();

    dispatch({
      type: SET_COUNTRY,
      payload: country 
    });
  }

  // Get Countries
  const getCountries = async () => {
    setLoading();

    const res = await axios.get("https://disease.sh/v2/countries");
    
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data 
    });
  }

   // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return <FilterContext.Provider 
    value={{
      country: state.country,
      countries: state.countries,
      loading: state.loading,
      setCountry,
      getCountries,
      setLoading
    }}
  >
    {props.children}
  </FilterContext.Provider>
}

export default FilterState;