import { makeStyles } from '@material-ui/core/styles';
import { red, grey }  from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '1em'
  },
  box: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxWidth: '450px',
    margin: 'auto'
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
  miniFlagContainer: {
    width: "20px",
    height: "15px",
    margin: "0 auto 0.5em auto",
    padding: 0,
    borderRadius: '5px'
  },
  flag: {
    borderRadius: '5px',
    width: '40px',
    height: '25px'
  },
  miniFlag: {
    borderRadius: '5px',
    width: '20px',
    height: '15px'
  },
  topCountriesContainer: {
    maxWidth: "900px",
    margin: "0 auto 2em auto"
  },
  topCountriesHeader: {
    width: "100%",
    textAlign: "center",
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "1.5em"
  },
  activeFilter: {
    '&.MuiTableSortLabel-active' : {
      color: red[900]
    }
  },
  emphasize : {
    fontSize: "0.85em",
    fontWeight: "bold",
    margin: "2em auto"
  },
  tip: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: grey[500],
    fontSize: "0.8em",
    margin: "1em auto"
  },
  hintIcon: {
    color: grey[600],
    marginRight: "0.3em"
  },
  divider: {
    margin: '2em 0'
  }
}));