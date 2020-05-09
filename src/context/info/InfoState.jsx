import React, { useReducer } from 'react';
import axios from 'axios';
import InfoContext from './infoContext';
import InfoReducer from './infoReducer';
import {
  GET_GLOBAL_SUMMARY,
  GET_COUNTRY_INFO,
  SET_LOADING
} from '../types';

const InfoState = props => {
  const initialState = {
    globalInfo: null,
    countryInfo: null,
    loading: false
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

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return <InfoContext.Provider 
    value={{
      globalInfo: state.globalInfo,
      countryInfo: state.countryInfo,
      loading: state.loading,
      getGlobalSummary,
      getCountryInfo,
      setLoading
    }}
  >
    {props.children}
  </InfoContext.Provider>
}

export default InfoState;