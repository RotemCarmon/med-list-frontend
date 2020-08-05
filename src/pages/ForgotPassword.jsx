import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserService from "../services/UserService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const initialState = {
  email: "",
  emailError: ""
};




const ForgotPassword = (props) => {
  const { t } = useTranslation('translations')
  const [state, setstate] = useState(initialState);
  
  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let emailError = "";
    
    if (!state.email) {
      emailError = t('errors.emailRequired');
    } else if (!validateEmail(state.email)) {
      emailError = t("errors.emailInvalid");
    }
    if (emailError) {
      setstate({ emailError });
      return false;
    }
    return true;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const isValid = validateForm();
    if(isValid){
     const isEmailValid = await UserService.verifyEmail(state.email)
     if(isEmailValid) {
       const res = await UserService.forgotPassword(state.email);
       
       if(res) {
         sendUserMsg('success')
         setTimeout(() => {
           props.history.push('/')
          }, 1500)
        }
     } else {
      sendUserMsg('error')
     }
    }
  };

  const onChangeHandler = (ev) => {
    const { value, name } = ev.target;
    setstate({ [name]: value });
  };

  const sendUserMsg = (message) => {
    if(message === 'success') {
      MySwal.fire({
        position: "center",
        icon: "success",
        title: t('message.reqReceived'),
        text: t('message.newPassWillBeSent'),
        showConfirmButton: true,
        timer: 3500,
      });
    } else if(message === 'error') {
      MySwal.fire({
        position: "center",
        icon: "error",
        title: t('message.noEmail'),
        text: t('message.tryAgain'),
        showConfirmButton: true,
        timer: 3500,
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="form-box" onSubmit={handleSubmit} noValidate >
        <h3>{t('resetPass.reset')}</h3>
        <h5>
        {t('resetPass.instructions')}
        </h5>
        <div className="form-row flex column">
          <label>{t('form.email')}</label>
          <input
            type="email"
            autoFocus
            onChange={onChangeHandler}
            name="email"
          />
          <div className="validation-error">{state.emailError}</div>
        </div>
        <div className="btns flex column">
          <button type="submit" className="submit-btn">
          {t('form.send')}
          </button>
          <Link to="/login" className="sec-btn">
          {t('resetPass.backToLogin')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
