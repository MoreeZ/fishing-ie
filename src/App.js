import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import LocationsReducerProvider from "./reducers/locationsReducer";
import AuthReducerProvider from "./reducers/authReducer";

import Navbar from "./components/Fixed/Navbar";
import Home from "./components/Routes/Home";
import Footer from "./components/Fixed/Footer";
import LocationPage from "./components/Routes/LocationPage/LocationPage";
import AddLocation from "./components/Routes/AddLocation/AddLocation";
import SearchPage from "./components/Routes/SearchPage";
import Login from "./components/Routes/Login";
import Register from "./components/Routes/Register";
import SignedOut from "./components/Routes/SignedOut";
import YourLocations from "./components/Routes/YourLocations/YourLocations";

function App() {
  return (
    <BrowserRouter>
      <LocationsReducerProvider>
        <AuthReducerProvider>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/addlocation" component={AddLocation} />
            <Route exact path="/search/:page" component={SearchPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/location/:location_id" component={LocationPage} />
            <Route path="/signed_out" component={SignedOut} />
            <Route path="/yourlocations" component={YourLocations} />
            <Footer />
          </div>
        </AuthReducerProvider>
      </LocationsReducerProvider>
    </BrowserRouter>
  );
}

export default App;
