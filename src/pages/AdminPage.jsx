import React, { Component } from "react";
import { Route } from "react-router-dom";
import UserEdit from "../cmps/admin/UserEdit";
import AdminUsers from "../cmps/admin/AdminUsers";
import AdminNav from "../cmps/admin/AdminNav";
import ChangePassword from "../cmps/admin/ChangePassword";
import UpdateProducts from "../cmps/admin/UpdateProducts";

export default class AdminPage extends Component {
  render() {
    const { match } = this.props;
    return (
      <section className="admin-page-container flex main-layout-container">
        <AdminNav />
          <Route path={`${match.path}/`} exact component={AdminUsers} />
          <Route path={`${match.path}/userEdit/:id?`} exact component={UserEdit} />
          <Route path={`${match.path}/change-password/:id`} exact component={ChangePassword} />
          <Route path={`${match.path}/UpdateProducts`} exact component={UpdateProducts} />
      </section>
    );
  }
}
