import React, { Fragment, useEffect, useState, useContext } from 'react';
// Contexts
import InfoContext from '../context/info/infoContext';
import FilterContext from '../context/filter/filterContext';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// icons
import InfoIcon from '@material-ui/icons/Info';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import { 
  Box,
  Divider, 
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
  } from '@material-ui/core';
import { red, grey, green, cyan }  from '@material-ui/core/colors';
// Moment
import Moment from 'react-moment';
// Components
import Filter from './Filter'
import Preloader from './layout/Preloader';
// Styles
import { useStyles } from './styles/summary';

const StyledTableCell = withStyles(() => ({
  head: {
    height: 45,
    fontSize: '0.9em',
    color: grey[800]
  },
  body: {
    fontSize: '0.85em'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Summary = () => {
  const filterContext = useContext(FilterContext);
  const infoContext = useContext(InfoContext);
  const { country, countries } = filterContext;
  const { globalInfo, countryInfo, topCountriesInfo, getGlobalSummary, getCountryInfo, getTopCountries, loading, loading_top_countries } = infoContext;
  const [topCountriesFilter, setFilter] = useState('cases');
  
  useEffect(() => {
    if(globalInfo === null && country === "Global" && !countries && !loading) {
      getGlobalSummary();
      getTopCountries('cases');
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

  const onFilter = e => {
    e.preventDefault();
  
    let filter;

    if(e.target.tagName === 'path'){
      filter = e.target.parentElement.parentElement.innerText.toLowerCase();
    } else if(e.target.tagName === 'svg'){
      filter = e.target.parentElement.innerText.toLowerCase();
    } else {
      filter = e.target.innerText.toLowerCase();
    }

    if(filter !== topCountriesFilter) {
      getTopCountries(filter);
      setFilter(filter);
    }
  }  

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
              {/* Confirmed Cases */}
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
              
              {/* Deaths */}
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

              {/* Recovered */}
              <Grid item xs={12}>
                <Box className={classes.bigDataContainer} boxShadow={2}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div className={classes.dataLabel}>
                        <FontAwesomeIcon icon="heartbeat" size="lg" className={classes.icon} style={{ color: green['A700'] }} /> {' '}
                        Recovered
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <div className={classes.dataContainer}>
                        <div className={classes.textLabel}>
                          Recovered Today
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.todayRecovered).toLocaleString('en') : Number(countryInfo.todayRecovered).toLocaleString('en') }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <div className={classes.dataContainer}>
                        <div className={classes.textLabel}>
                          Total Recovered
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.recovered).toLocaleString('en') : Number(countryInfo.recovered).toLocaleString('en') }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              
              {/* Other Info */}
              <Grid item xs={12}>
                <Box className={classes.bigDataContainer}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box className={classes.dataContainer} boxShadow={2}>
                        <div className={classes.textLabel}>
                          <FontAwesomeIcon icon="head-side-mask" size="lg" className={classes.icon} style={{ color: red[500] }} /> {' '}
                          Active Cases
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.active).toLocaleString('en') : Number(countryInfo.active).toLocaleString('en') }
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className={classes.dataContainer} boxShadow={2}>
                        <div className={classes.textLabel}>
                          <FontAwesomeIcon icon="procedures" size="lg" className={classes.icon} style={{ color: red[700] }} /> {' '}
                          Critical Cases
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.critical).toLocaleString('en') : Number(countryInfo.critical).toLocaleString('en') }
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} >
                <Box className={classes.bigDataContainer}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box className={classes.dataContainer} boxShadow={2}>
                        <div className={classes.textLabel}>
                          <FontAwesomeIcon icon="vial" size="lg" className={classes.icon} style={{ color: cyan[400] }} /> {' '}
                          Test Conducted
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.tests).toLocaleString('en') : Number(countryInfo.tests).toLocaleString('en') }
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className={classes.dataContainer} boxShadow={2}>
                        <div className={classes.textLabel}>
                          <FontAwesomeIcon icon="users" size="lg" className={classes.icon} style={{ color: grey[600] }} /> {' '}
                          Population
                        </div>
                        <div className={classes.dataValue}>
                          { !countryInfo ? Number(globalInfo.population).toLocaleString('en') : Number(countryInfo.population).toLocaleString('en') }
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.divider}/>
          <div className={classes.topCountriesContainer}>
            <div className={classes.topCountriesHeader}>
              Top 10 Countries with Most {'  '}
              {topCountriesFilter === 'cases' && 
                <span>
                  <FontAwesomeIcon icon="head-side-cough" className={classes.icon} style={{ color: red[500] }} />
                  Confirmed Cases
                </span>}
              {topCountriesFilter === 'deaths' && 
                <span>
                  <FontAwesomeIcon icon="skull" className={classes.icon} style={{ color: grey[700] }} />
                  Deaths
                </span>}
              {topCountriesFilter === 'active' && 
                <span>
                  <FontAwesomeIcon icon="head-side-mask" className={classes.icon} style={{ color: red[500] }} />
                  Active Cases
                </span>}
              {topCountriesFilter === 'critical' && 
                <span>
                  <FontAwesomeIcon icon="procedures" className={classes.icon} style={{ color: red[900] }} />
                  Critical Cases
                </span>}
              {topCountriesFilter === 'recovered' && 
                <span>
                  <FontAwesomeIcon icon="heartbeat" className={classes.icon} style={{ color: green["A700"] }} />
                  Recovered Cases
                </span>}
              {topCountriesFilter === 'tests' && 
                <span>
                  <FontAwesomeIcon icon="vial" className={classes.icon} style={{ color: cyan[400] }} />
                  Test Conducted
                </span>}
            </div>
            <span className={classes.tip}>
              <InfoIcon fontSize="small" className={classes.hintIcon} /> Click on a "Table Header" to filter the list.
            </span>
            {topCountriesInfo && !loading_top_countries ? (
              <TableContainer className={classes.table} component={Paper} elevation={3}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        <FontAwesomeIcon icon="flag" size="lg" className={classes.icon} />
                        Country
                      </StyledTableCell>
                      <StyledTableCell align="center" onClick={onFilter}>
                        <TableSortLabel hideSortIcon direction='desc' active={topCountriesFilter === 'cases' ? true : false} className={topCountriesFilter === 'cases' && classes.activeFilter}>
                          <FontAwesomeIcon icon="head-side-cough" size="lg" className={classes.icon} style={topCountriesFilter === 'cases' && { color: red[500] }} />
                          Cases
                        </TableSortLabel>
                      </StyledTableCell>  
                      <StyledTableCell align="center" onClick={onFilter}>
                        <TableSortLabel hideSortIcon direction='desc' active={topCountriesFilter === 'deaths' ? true : false} className={topCountriesFilter === 'deaths' && classes.activeFilter}>
                          <FontAwesomeIcon icon="skull" size="lg" className={classes.icon} style={topCountriesFilter === 'deaths' && { color: grey[700] }} />
                          Deaths
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell align="center" onClick={onFilter}>
                        <TableSortLabel hideSortIcon direction='desc' active={topCountriesFilter === 'active' ? true : false} className={topCountriesFilter === 'active' && classes.activeFilter}>
                          <FontAwesomeIcon icon="head-side-mask" size="lg" className={classes.icon} style={topCountriesFilter === 'active' && { color: red[500] }} />
                          Active
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell align="center" onClick={onFilter}>
                        <TableSortLabel hideSortIcon direction='desc' active={topCountriesFilter === 'critical' ? true : false} className={topCountriesFilter === 'critical' && classes.activeFilter}>
                          <FontAwesomeIcon icon="procedures" size="lg" className={classes.icon} style={topCountriesFilter === 'critical' && { color: red[900] }} />
                          Critical
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell align="center" onClick={onFilter}>
                        <TableSortLabel hideSortIcon direction='desc' active={topCountriesFilter === 'recovered' ? true : false} className={topCountriesFilter === 'recovered' && classes.activeFilter}>
                          <FontAwesomeIcon icon="heartbeat" size="lg" className={classes.icon} style={topCountriesFilter === 'recovered' && { color: green['A700'] }} />
                          Recovered
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell align="center" onClick={onFilter}>
                        <TableSortLabel hideSortIcon direction='desc' active={topCountriesFilter === 'tests' ? true : false} className={topCountriesFilter === 'tests' && classes.activeFilter}>
                          <FontAwesomeIcon icon="vial" size="lg" className={classes.icon} style={topCountriesFilter === 'tests' && { color: cyan[400] }} />
                          Tests
                        </TableSortLabel>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topCountriesInfo.map((country, index) => (
                      <StyledTableRow key={country.country}>
                        <StyledTableCell align="center">
                          <Box className={classes.miniFlagContainer} boxShadow={3}>
                            <img className={classes.miniFlag} src={country.countryInfo.flag} alt={`${country.country} Flag`}/>
                          </Box>
                          #{index+1} {country.country} 
                        </StyledTableCell>
                      <StyledTableCell align="center" className={topCountriesFilter === 'cases' && classes.emphasize}>{country.cases.toLocaleString('en')}</StyledTableCell>
                      <StyledTableCell align="center" className={topCountriesFilter === 'deaths' && classes.emphasize}>{country.deaths.toLocaleString('en')}</StyledTableCell>
                      <StyledTableCell align="center" className={topCountriesFilter === 'active' && classes.emphasize}>{country.active.toLocaleString('en')}</StyledTableCell>
                      <StyledTableCell align="center" className={topCountriesFilter === 'critical' && classes.emphasize}>{country.critical.toLocaleString('en')}</StyledTableCell>
                      <StyledTableCell align="center" className={topCountriesFilter === 'recovered' && classes.emphasize}>{country.recovered.toLocaleString('en')}</StyledTableCell>
                      <StyledTableCell align="center" className={topCountriesFilter === 'tests' && classes.emphasize}>{country.tests.toLocaleString('en')}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div align="center" className={classes.emphasize} style={{ height: 100}}>
                <FontAwesomeIcon icon="virus" style={{ color: red[900] }} spin /> {' '}
                Fetching Information...
              </div>
            )}
          </div>
        </Fragment>
      ) : (
        <Preloader country={country} />
      )}
    </div>
  );
}

export default Summary;