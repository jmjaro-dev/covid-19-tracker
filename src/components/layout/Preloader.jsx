import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import red from '@material-ui/core/colors/red';

const Preloader = ({country}) => {
  const styles = {
    loader: {
      position: "absolute",
      top: '40%',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    text: {
      color: red[900],
      fontSize: "0.85em",
      fontWeight: "bold",
      textAlign: "center",
      paddingTop: '6em'
    },
    countryText: {
      color: "#000",
      fontSize: "1em",
      fontWeight: "bold"
    }
  }

  return (
    <Fragment>
      <div style={styles.loader}>
        <FontAwesomeIcon icon="virus" size="2x" style={styles.loader} spin/>
        <div style={styles.text}>
          {country === "Global" ? "Fetching Global Data..." : (
            <span>
              Fetching Data for {' '}
              <span style={styles.countryText}>
                {country}
              </span>
              ...
            </span>
            ) }
        </div>
      </div>
    </Fragment>
  )
}

export default Preloader

