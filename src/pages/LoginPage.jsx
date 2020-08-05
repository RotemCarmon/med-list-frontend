import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal);
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const initErrors = {
  emailError: "",
  passwordError: "",
};

const initValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { t, i18n } = useTranslation("translations");
  const history = useHistory();
  const location = useLocation();
  const isRtl = i18n.dir() === 'rtl';

  const [inputValues, setInputValues] = useState(initValues);
  const [remember, setRemember] = useState(true);
  const [hiddenPass, setHiddenPass] = useState(true);
  const [errors, setErrors] = useState(initErrors);

  const sendUserMsg = () => {
    MySwal.fire({
      position: "center",
      icon: "error",
      title: t("message.wrongCred"),
      text: t("message.tryAgain"),
      showConfirmButton: true,
      toast: true,
      timer: 3500,
    });
  };

  const validateForm = () => {
    // TODO: validate credentials exist in database
    let emailError = "";
    let passwordError = "";

    if (!inputValues.email) {
      emailError = t("errors.emailRequired");
    }
    if (!inputValues.password) {
      passwordError = t("errors.passRequired");
    }

    if (emailError || passwordError) {
      setErrors({ emailError, passwordError });
      return false;
    }
    return true;
  };

  const onChangeHandler = (ev) => {
    const { name, value } = ev.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const user = await AuthService.login({ ...inputValues, remember });

      if (user) {
        setInputValues(initValues);
        const { from } = location.state || {
          from: { pathname: "/" },
        };
        history.push(from);
      } else {
        sendUserMsg();
      }
    }
  };

  const togglePasswordDispaly = () => {
    setHiddenPass(!hiddenPass);
  };

  return (
    <div className="login-page-container">
      <h2>{t("login.login")}</h2>
      <form onSubmit={handleSubmit} className="form-box" noValidate>
        <div className="form-row flex column">
          <label htmlFor="email">{t("form.email")}</label>
          <input
            autoFocus
            type="email"
            value={inputValues.email}
            onChange={onChangeHandler}
            name="email"
          />
          <div className="validation-error">{errors.emailError}</div>
        </div>
        <div className="password-input form-row flex column">
          <div className="label-bar flex space-between align-center">
            <label htmlFor="password">{t("form.pass")}</label>
            <Link to="forgot" className="sec-btn">
            {t("login.forgotPass")}
            </Link>
          </div>
          <input
            type={hiddenPass ? "password" : "text"}
            value={inputValues.password}
            onChange={onChangeHandler}
            name="password"
          />
          <div
            className={`show-password ${isRtl ? 'he-pos': 'en-pos'}`}
            title={hiddenPass ? "show password" : "hide password"}
            onClick={togglePasswordDispaly}
          >
            {hiddenPass ? eye : eyeSlash}
          </div>
          <div className="validation-error">{errors.passwordError}</div>
        </div>
        <div className="form-row flex">
          <label htmlFor="remember">{t("form.remember")}</label>
          <input
            type="checkbox"
            checked={remember}
            onChange={(ev) => setRemember(ev.target.checked)}
            name="remember"
          />
        </div>
        <div className="btns flex column">
          <button type="submit" className="submit-btn">
          {t("form.send")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
