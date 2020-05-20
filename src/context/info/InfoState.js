import React, { useReducer } from 'react';
import axios from 'axios';
import InfoContext from './infoContext'
import InfoReducer from './infoReducer'
import {
  GET_GLOBAL_SUMMARY,
  GET_COUNTRY_INFO,
  GET_TOP_COUNTRIES,
  SET_LOADING,
  SET_LOADING_TOP_COUNTRIES
} from '../types';

const InfoState = props => {
  const initialState = {
    globalInfo: null,
    countryInfo: null,
    topCountriesInfo: null,
    loading: false,
    loading_top_countries: false
  };

  const [state, dispatch] = useReducer(InfoReducer, initialState);


  // Get Summary
  const getGlobalSummary = async () => {
    setLoading();

    const res = await axios.get("https://disease.sh/v2/all");
    
    dispatch({
      type: GET_GLOBAL_SUMMARY,
      payload: res.data
    });
  }

  // Get Country Information
  const getCountryInfo = async country => {
    setLoading();

    const res = await axios.get(`https://disease.sh/v2/countries/${country}`);
    
    dispatch({
      type: GET_COUNTRY_INFO,
      payload: res.data
    });
  }

  // Get Top Countries Information depending on filter
  const getTopCountries = async filter => {
    setLoadingTopCountries();
    
    const res = await axios.get("https://disease.sh/v2/countries");

    dispatch({
      type: GET_TOP_COUNTRIES,
      payload: { 
        countries: res.data,
        filter
      } 
    });
  }

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set Loading for Top Countries process
  const setLoadingTopCountries = () => dispatch({ type: SET_LOADING_TOP_COUNTRIES });

  return <InfoContext.Provider 
    value={{
      globalInfo: state.globalInfo,
      countryInfo: state.countryInfo,
      topCountriesInfo: state.topCountriesInfo,
      loading: state.loading,
      loading_top_countries: state.loading_top_countries,
      getGlobalSummary,
      getCountryInfo,
      getTopCountries,
      setLoading,
      setLoadingTopCountries
    }}
  >
    {props.children}
  </InfoContext.Provider>
}

export default InfoState;