import React, { Fragment, useEffect, useContext } from 'react';
// Contexts
import InfoContext from '../context/info/infoContext';
import FilterContext from '../context/filter/filterContext';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { red, grey, green }  from '@material-ui/core/colors';
// Moment
import Moment from 'react-moment';
// Components
import Filter from './Filter';
import Preloader from './Preloader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '1em'
  },
  box: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxWidth: '450px',
    margin: 'auto',
    paddingBottom: '2em'
  },
  bigDataContainer: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.primary,
    margin: 'auto',
    maxWidth: '350px',
    borderRadius: '10px'
  },
  dataContainer: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxWidth: '160px',
    height: '75px',
    margin: 'auto',
    borderRadius: '10px'
  },
  dataLabel: {
    fontSize: '0.9em',
    fontWeight: 'bold',
    paddingTop: '1em'
  },
  dataValue: {
    fontSize: '0.9em',
    fontWeight: 'bold'
  },
  dateContainer: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  date: {
    color: theme.palette.text.primary,
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  dateLabel: {
    color: grey[700],
    fontSize: '0.7em'
  },
  header: {
    padding: '1em',
  },
  headerText: {
    fontSize: '1.5em'
  },
  textLabel: {
    color: grey[600],
    paddingTop: '1em',
    fontSize: '0.83em',
    fontWeight: '500',
    marginBottom: '1.2em'
  },
  icon: {
    marginRight: '0.3em'
  },
  flagContainer: {
    width: "40px",
    height: "25px",
    margin: "0 auto",
    padding: 0,
    borderRadius: '5px'
  },
  flag: {
    borderRadius: '5px',
    width: '40px',
    height: '25px'
  }
}));

const Summary = () => {
  const filterContext = useContext(FilterContext);
  const infoContext = useContext(InfoContext);
  const { country, countries } = filterContext;
  const { globalInfo, countryInfo, getGlobalSummary, getCountryInfo, loading } = infoContext;
  
  useEffect(() => {
    if(globalInfo === null && country === "Global" && !countries && !loading) {
      getGlobalSummary();
    }

    if(!globalInfo && countryInfo && country === "Global" && !loading) {
      getGlobalSummary();
    }
    
    if(!countryInfo && country !== "Global" && countries && !loading) {
      getCountryInfo(country);
    }

    if(countryInfo && country !== "Global" && country !== countryInfo.country && !loading) {
      getCountryInfo(country);
    }
    // eslint-disable-next-line
  }, [country, loading]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Filter />
      {(globalInfo || countryInfo) && countries && !loading ? (
        <Fragment>
          <div className={classes.box}>
            <div className={classes.header}>
              {globalInfo && countryInfo === null ? (
                <h1 className={classes.headerText}>
                  <FontAwesomeIcon icon="globe-asia" className={classes.icon} style={{ color: red[900] }} /> {' '} Global Summary
                </h1>
              ) : (
                <Fragment>
                  <Box className={classes.flagContainer} boxShadow={3}>
                    <img className={classes.flag} src={countryInfo && countryInfo.countryInfo.flag} alt={`${countryInfo && countryInfo.country} Flag`}/>
                  </Box> 
                  <h1 className={classes.headerText}> 
                    { countryInfo && countryInfo.country} ({countryInfo && countryInfo.countryInfo.iso2})
                  </h1>
                </Fragment>
              )}
            </div>
            <div className={classes.dateContainer}>
              <p className={classes.dateLabel}>
                <FontAwesomeIcon icon="clock" style={{ color: grey[500] }} /> {' '}
                as of {' '}
                <Moment format="LLL" className={classes.date}>
                  {globalInfo ? globalInfo.updated : countryInfo.updated}
                </Moment>
              </p>
            </div>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box className={classes.bigDataContainer} boxShadow={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <div className={classes.dataLabel}>
                        <FontAwesomeIcon icon="head-side-cough" size="lg" className={classes.icon} style={{ color: red[500] }} /> {' '}
                        Confirmed Cases
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.dataContainer}>
                        <div className={classes.textLabel}>
                          New Cases
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.todayCases).toLocaleString('en') : Number(countryInfo.todayCases).toLocaleString('en') }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.dataContainer}>
                        <div className={classes.textLabel}>
                          Total Cases
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.cases).toLocaleString('en') : Number(countryInfo.cases).toLocaleString('en') }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box className={classes.bigDataContainer} boxShadow={2}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div className={classes.dataLabel}>
                        <FontAwesomeIcon icon="skull" size="lg" className={classes.icon} style={{ color: grey[700] }} /> {' '}
                        Deaths
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <div className={classes.dataContainer}>
                        <div className={classes.textLabel}>
                          Deaths Today
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.todayDeaths).toLocaleString('en') : Number(countryInfo.todayDeaths).toLocaleString('en') }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <div className={classes.dataContainer}>
                        <div className={classes.textLabel}>
                          Total Deaths
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.deaths).toLocaleString('en') : Number(countryInfo.deaths).toLocaleString('en') }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box className={classes.bigDataContainer}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box className={classes.dataContainer} boxShadow={2}>
                        <div className={classes.textLabel}>
                          <FontAwesomeIcon icon="heartbeat" size="lg" className={classes.icon} style={{ color: red[700] }} /> {' '}
                          Critical Cases
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.critical).toLocaleString('en') : Number(countryInfo.critical).toLocaleString('en') }
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className={classes.dataContainer} boxShadow={2}>
                        <div className={classes.textLabel}>
                          <FontAwesomeIcon icon="heartbeat" size="lg" className={classes.icon} style={{ color: green['A700'] }} /> {' '}
                          Recovered
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.recovered).toLocaleString('en') : Number(countryInfo.recovered).toLocaleString('en') }
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      ) : (
        <Preloader country={country} />
      )}
    </div>
  );
}

export default Summary;