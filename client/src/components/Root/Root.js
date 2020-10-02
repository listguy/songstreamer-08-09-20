import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { UserContext } from "./userContext";
import HomePage from "./Home";
import SearchBar from "./SearchBar";
import TopMenu from "./TopMenu";

import {
  AlbumPage,
  ArtistPage,
  SongsPage,
  PlayListPage,
  PageNotFound,
  ALlOfPage,
  Login,
} from "./OtherPages";

export default function Root() {
  const isLoggedIn = localStorage.getItem("LIT");
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem("LIT"));

  //Spare re-renders when logged user hasn't changed
  const providerValue = useMemo(() => ({ loggedUser, setLoggedUser }), [
    loggedUser,
    setLoggedUser,
  ]);

  debugger;
  console.log(loggedUser);
  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        {!isLoggedIn ? (
          <>
            <Redirect to="/login" />
            <Route component={Login} path="/login" />
          </>
        ) : (
          <>
            <TopMenu />
            <Switch>
              <Route component={HomePage} exact path="/" />
              <Route component={ALlOfPage} exact path="/:type" />
              <Route component={SongsPage} exact path="/songs/:id" />
              <Route component={AlbumPage} exact path="/albums/:id" />
              <Route component={ArtistPage} exact path="/artists/:id" />
              <Route component={PlayListPage} exact path="/playlists/:id" />
              <Route component={PageNotFound} />
            </Switch>
          </>
        )}
      </UserContext.Provider>
    </Router>
  );
}
