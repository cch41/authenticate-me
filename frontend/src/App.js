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
import ProfilePage from "./components/ProfilePage";
import TheGreatWave from "./images/The_Great_Wave_off_Kanagawa.jpg"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <span className="logo">
        <img src={TheGreatWave} alt="The_Great_Wave_off_Kanagawa" />
        <h1>Coastal Camper</h1>
      </span>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
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
        </Switch>
      )}
    </>
  );
}

export default App;
