import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserService from "../services/UserService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function PrivateRoute({ component: Component, permissions, ...rest }) {

  const sendUserMsg = () => {
    MySwal.fire({
      position: 'top-start',
      icon: 'error',
      title: 'אין הרשאה להיכנס',
      text: 'הירשם בכדי לגשת לקישור המבוקש',
      showConfirmButton: true,
      toast: true,
      timer: 3500,
      });
  };

  return (
    <Route {...rest} render={(props) => {
      const currentUser = UserService.getLoggedInUser()
      
      if(!currentUser) {
        // if no logged in user
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
      
      // check if route is restricted by role
      if (permissions && permissions.indexOf(currentUser.permission) === -1) {
      // role not authorised so redirect to home page
      sendUserMsg()
      return <Redirect to={{ pathname: '/'}} />
      } 
      
      // authorised so return component
      return <Component {...props} />
    }} />
  )
}

export default PrivateRoute;
