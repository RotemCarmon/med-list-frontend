import React from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import AuthService, { permissions } from "../services/AuthService";
import { useTranslation } from "react-i18next";


const AppHeader = (props) => {
  const { t, i18n } = useTranslation("translations");
  const dir = i18n.dir();
  
  let history = useHistory();

  const logout = async () => {
    await AuthService.logout();
    history.replace("/");
  };

  const changeLang = (ev) => {
    const {value} = ev.target;
    i18n.changeLanguage(value);
  };

  return (
    // <div className="app-header-container flex align-center space-between main-layout-container">
    <div className="app-header-container flex align-center main-layout-container">
      <div className="nav-bar-container">
      {props.user && props.user.permission === permissions.Admin && (
        <NavLink to="/product" exact activeClassName="activeLink">
          {t("header.products")}
        </NavLink>
      )}

        {props.user && props.user.permission === permissions.Admin && (
          <NavLink to="/admin/"  activeClassName="activeLink">
            {t("header.admin")}
          </NavLink>
        )}
        {props.user && (
          <button className="logout-btn" onClick={logout}>
            {t("header.logout")}
          </button>
        )}
      </div>
      <Link to="/" className="logo" />

      <div className="lang-switch">
        
        <select id="lang" onChange={changeLang}  value={dir === 'rtl'? 'he' : 'en'}>
          <option value="en">EN</option>
          <option value="he">עב</option>
        </select>

      </div>

    </div>
  );
};

export default AppHeader;
