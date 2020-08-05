import React, { Component } from "react";
import UserService from "../../services/UserService";
import AuthService from '../../services/AuthService'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const initialState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  password: "",
  permission: "User",
  hiddenPass: true,
};

// ADMIN ADD/EDIT USER PAGE
export default class UserEdit extends Component {
  state = initialState;

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.loadUser(id);
    }
  }

  async componentDidUpdate(prevProps) {
    const prevParams = await prevProps.match.params.id;
    const id = await this.props.match.params.id;
    if (prevParams !== id) {
      this.getEmptyUser();
    }
  }

  loadUser = async (id) => {
    const user = await UserService.getUsersById(id);
    this.setState({ ...user });
  };

  getEmptyUser = () => {
    const emptyUser = UserService.getEmptyUser();
    this.setState({ _id: "", ...emptyUser });
  };

  onChangeHandler = (ev) => {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const isEdit = !!this.state._id;
    if (isEdit) {
      await UserService.editUser({ ...this.state });
      this.sendUserMsg("פרטי המשתמש עודכנו");
    } else {
      await AuthService.signup({ ...this.state });
      this.sendUserMsg("משתמש חדש נוסף למערכת");
    }
    // redirect to AdminUsers page
    this.props.history.push("/admin");
  };

  togglePasswordDispaly = () => {
    this.setState({ hiddenPass: !this.state.hiddenPass });
  };

  sendUserMsg = (msg) => {
    MySwal.fire({
      position: "top-start",
      icon: "info",
      title: msg,
      toast: true,
      timer: 3500,
    });
  };

  render() {
    const isEdit = !!this.state._id;

    return (
      <div className="user-edit-container">
        <form onSubmit={this.handleSubmit} className="form-box">
          <h3>רישום משתמש חדש</h3>

          <div className="form-row flex column">
            <label htmlFor="name">שם מלא</label>
            <input
              type="text"
              value={this.state.fullName}
              onChange={this.onChangeHandler}
              name="fullName"
            />
          </div>

          <div className="form-row flex column">
            <label htmlFor="company">חברה</label>
            <input
              type="text"
              value={this.state.company}
              onChange={this.onChangeHandler}
              name="company"
            />
          </div>

          <div className="form-row flex column">
            <label htmlFor="email">דואר אלקטרוני</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              name="email"
            />
          </div>
          <div className="form-row flex column">
            <label htmlFor="phone">טלפון</label>
            <input
              type="number"
              value={this.state.phone}
              onChange={this.onChangeHandler}
              name="phone"
            />
          </div>
          <div className="line" />

          <h4>כתובת</h4>

          <div className="address flex space-between">
            <div className="form-row flex column">
              <label htmlFor="streetAddress">רחוב ומספר</label>
              <input
                type="text"
                value={this.state.streetAddress}
                onChange={this.onChangeHandler}
                name="streetAddress"
              />
            </div>

            <div className="form-row flex column">
              <label htmlFor="city">עיר</label>
              <input
                type="text"
                value={this.state.city}
                onChange={this.onChangeHandler}
                name="city"
              />
            </div>
          </div>
          <div className="line" />

          {!isEdit && (
            <div className="form-row flex column password-input">
              <label htmlFor="password">סיסמה</label>
              <input
                type={this.state.hiddenPass ? "password" : "text"}
                value={this.state.password}
                onChange={this.onChangeHandler}
                name="password"
              />
              <div
                className="show-password he-pos"
                title={
                  this.state.hiddenPass ? "show password" : "hide password"
                }
                onClick={this.togglePasswordDispaly}
              >
                {this.state.hiddenPass ? eye : eyeSlash}
              </div>
            </div>
          )}

          <div className="form-row flex align-center permission-select">
            <label htmlFor="confirm-password">רמת הרשאה</label>
            <select
              value={this.state.permission}
              onChange={this.onChangeHandler}
              name="permission"
            >
              <option value="Guest">אורח</option>
              <option value="User">משתמש</option>
              <option value="Moderator">עורך</option>
              <option value="Admin">מנהל</option>
            </select>
          </div>

          <div className="btns flex column">
            <button type="submit" className="submit-btn">
              שמור
            </button>
          </div>
        </form>
      </div>
    );
  }
}
