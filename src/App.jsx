import React, { useState , useEffect} from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { permissions, currentObservedUser } from "./services/AuthService.js";
import { useTranslation } from "react-i18next";




import ProductPage from "./pages/ProductPage.jsx";
import AppHeader from "./cmps/AppHeader.jsx";
import AppFooter from "./cmps/AppFooter.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import PrivateRoute from "./cmps/PrivateRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";



const history = createBrowserHistory();


function App() {
  const [currentUser, setCurrentUser] = useState();

  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  // const direction = {
  //   direction: isRtl ? "rtl" : "ltr",
  //   transition: '5s'
  // }



  useEffect(() => {
    currentObservedUser.subscribe(user => {  
      setCurrentUser(user);
    });
  }, [currentUser])
  
  return (
    <Router history={history}   >
      <div className={`main-app-container flex column ${isRtl? 'right' : 'left'}`}>
        <AppHeader user={currentUser} />
        <main className="main-view-container">
          <Switch >
            <Route path="/login" exact component={LoginPage} />
            <Route path="/forgot" exact component={ForgotPassword} />
            <PrivateRoute path="/admin" permissions={[permissions.Admin]} component={AdminPage} />
            <PrivateRoute path="/" component={ProductPage} permissions={[permissions.Admin, permissions.User, permissions.Moderator]} />

          </Switch>
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
