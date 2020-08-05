import React from "react";
import { useState } from "react";
import UserService from "../../services/UserService";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const initialState = {
  password: "",
  passwordError: '',
  hiddenPass: true
}


const ChangePassword = (props) => {
  let { id } = useParams();
  const history = useHistory()
  const [state, setstate] = useState(initialState)
  

 const onChangeHandler = (ev) => {
    const { value, name } = ev.target;
    setstate({ ...state ,[name]: value });    
  };


  
  const validateForm = () => {
    let passwordError = "";
    if (!state.password) {
      passwordError = "Password in required";
    } 
    if (passwordError) {
      setstate({ passwordError });
      return false;
    }
    return true;
  };

  const togglePasswordDispaly = () => {
    setstate({hiddenPass: !state.hiddenPass})
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const isValid = validateForm();
    if(isValid){
      const userData = {
        _id: +id,
        password: state.password
      }
      const res = await UserService.changeUserPassword(userData)
      if(res) {
       sendUserMsg()
       setTimeout(() => {
         props.history.push('/admin')
       }, 1500)
     }
    }
  };

  const sendUserMsg = () => {
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "הסיסמה שונתה בהצלחה",
      text: "הודעה עם הסיסמה החדשה תשלח למשתמש",
      showConfirmButton: true,
      timer: 3500,
    });
  };


  return (
    <div className="change-password-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-row flex column">
          <label></label>
          <div className="form-row flex column password-input">
            <label htmlFor="password">סיסמה</label>
            <input
              type={state.hiddenPass ? "password" : "text"}
              onChange={onChangeHandler}
              name="password"
            />
            <div
              className="show-password he-pos"
              title={state.hiddenPass ? "show password" : "hide password"}
              onClick={togglePasswordDispaly}
            >
              {state.hiddenPass ? eye : eyeSlash}
            </div>
          </div>
            <div className="validation-error">{state.passwordError}</div>
        </div>
        <div className="btns flex space-between align-center">
          <button type="submit" className="submit-btn">
            שליחה
          </button>
          <Link to="/admin" className="sec-btn">
            חזרה
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
