import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SignUpFormPage from "./components/SignUpFormPage";
import HostFormPage from "./components/HostFormPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import TagPage from "./components/TagPage";
import LocationPage from "./components/LocationPage";
import AccountPage from "./components/AccountPage";
import CovidPage from "./components/CovidPage";
import { useHistory } from "react-router-dom";
import HostingPage from "./components/HostingPage";
import TripsPage from "./components/TripsPage";
import About from "./components/About";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <span className="covid-message">
        Recreate responsibly during COVID-19. Learn more <p className="covid-message here" onClick={() => history.push('/covid')}> here </p>.
      </span>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>
          <Route path="/host">
            <HostFormPage />
          </Route>
          <Route path="/tags/:tagId">
            <TagPage />
          </Route>
          <Route path="/locations/:locationId">
            <LocationPage />
          </Route>
          <Route path="/trips">
            <TripsPage />
          </Route>
          <Route path="/hosting">
            <HostingPage />
          </Route>
          <Route path="/covid">
            <CovidPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
