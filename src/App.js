import React from 'react';
import { Container } from '@material-ui/core';
import 'typeface-roboto';
import './App.css';
// Components
import NavBar from './components/layout/NavBar';
import Summary from './components/Summary';
// Contexts State
import FilterState from './context/filter/FilterState';
import InfoState from './context/info/InfoState';
// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobeAsia, faFlag, faSearch, faClock, faSkull, faProcedures, faHeartbeat, faHeadSideMask, faHeadSideCough, faVial, faUsers, faVirus, faViruses } from '@fortawesome/free-solid-svg-icons';
library.add(faGlobeAsia, faFlag, faSearch, faClock, faSkull, faProcedures, faHeartbeat, faHeadSideMask, faHeadSideCough, faVial, faUsers, faVirus, faViruses)

function App() {
  return (
    <InfoState>
      <FilterState>
        <div className="App">
          <NavBar />
          <Container fixed>
            <Summary />
          </Container>
        </div>
      </FilterState>
    </InfoState>
  );
}

export default App;
