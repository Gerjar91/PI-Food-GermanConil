import { BrowserRouter, Route, Switch } from 'react-router-dom'; // switch no ROutes por la react routerdom V5
import LandingPage from './components/LandingPage/landingPage';
import React from 'react';
import HomePage from './components/HomePage/homePage';
import SearchBar from './components/SearchBar/searchBar';
import FormRecipe from './components/FormRecipe/formRecipe';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    <SearchBar/>
      <Switch>
        <Route exact path="/homePage" component={HomePage} />
        <Route exact path="/formRecipe" component={FormRecipe} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
