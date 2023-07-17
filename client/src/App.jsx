import { BrowserRouter, Route, Switch } from 'react-router-dom'; // switch no ROutes por la react routerdom V5
import LandingPage from './Pages/LandingPage/landingPage';
import React from 'react';
import HomePage from './Pages/HomePage/homePage';
import SearchBar from './components/SearchBar/searchBar';
import FormRecipe from './Pages/FormRecipePage/formRecipe';
import DetailPage from './Pages/DetailPage/detailPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
      <SearchBar />{/* la search bar queda fija en todas estas pantallas */}
      <Switch>
        <Route exact path="/homePage" component={HomePage} />
        <Route exact path="/formRecipe" component={FormRecipe} />
        <Route exact path="/detailPage/:id" component={DetailPage} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
