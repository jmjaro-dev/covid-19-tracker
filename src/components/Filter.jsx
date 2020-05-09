import React, { useEffect, useContext, Fragment } from 'react';
// Contexts
import FilterContext from '../context/filter/filterContext';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, FormControl, Select, InputLabel } from '@material-ui/core';
import { red }  from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.9em',
    flexGrow: 1,
    paddingTop: '0.2em'
  },
  margin: {
    margin: theme.spacing(1),
  },
  box: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxWidth: '460px',
    margin: 'auto'
  },
  searchIcon: {
    margin: 'auto 0'
  },
  inputColor: {
    color: red[900]
  },
  formControl: {
    '& label.Mui-focused': {
      color: red[900],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: red[900],
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: red[900],
      },
    },
    width: "100%",
  }
}));

const Filter = () => {
  const filterContext = useContext(FilterContext);
  const { country, countries, loading, setCountry, getCountries } = filterContext;

  useEffect(() => {
    if(countries === null) {
      getCountries();
    }
    // eslint-disable-next-line
  }, [loading]);

  const onChange = e => {
    if(e.target.name === 'country') {
      setCountry(e.target.value);
    }
  }
  
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Grid container>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl} disabled={!countries ? true : false}>
                {!countries && loading ? (
                  <Fragment>
                  <InputLabel htmlFor="tempSelect">Getting All Countries...</InputLabel>
                  <Select
                    native
                    label="Getting All Countries..."
                    size="small"
                    inputProps={{
                      name: 'tempSelect',
                      id: 'tempSelect',
                    }}
                  >
                  </Select>
                  </Fragment>
                ) : (
                  <Fragment>
                    <InputLabel htmlFor="country">Select Country</InputLabel>
                    <Select
                      native
                      label="Select Country"
                      size="small"
                      value={country}
                      inputProps={{
                        name: 'country',
                        id: 'country',
                      }}
                      onChange={onChange}
                    >
                      <option value={"Global"}>Global</option>
                      {countries && countries.map(country => (
                        <option key={country.country} value={country.country}>
                          {country.country}
                        </option>
                      ))};
                    </Select>
                  </Fragment>
                )}
            </FormControl>  
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Filter;