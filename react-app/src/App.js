import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import EventList from "./components/EventsList";
import EventPage from "./components/SingleEvent";
import CreateEvent from "./components/CreateEvent";
import UpdateEvent from "./components/UpdateEvent";
import SingleProduct from "./components/SingleProduct";
import Marketplace from "./components/Marketplace";
import SideNav from "./components/SideNav/SideNav";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="body">
        <div className="side-nav">
          <SideNav />
        </div>
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <EventList />
            </Route>
            <Route exact path='/events/new'>
              <CreateEvent />
            </Route>
            <Route exact path='/events/:event_id'>
              <EventPage />
            </Route>
            <Route exact path='/events/:event_id/edit'>
              <UpdateEvent />
            </Route>
            <Route exact path='/products/:product_id'>
              <SingleProduct />
            </Route>
            <Route exact path='/marketplace'>
              <Marketplace />
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
