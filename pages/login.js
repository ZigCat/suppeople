import React, { useState } from "react";
import { login } from "../api/registration";
import {validateEmail, validatePhone} from '../services/validator';

const Login = () => {
  const [status, setStatus] = useState(0);
  const [validLogin, setValidLogin] = useState(true);
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleForm = (type, value) => {
    setForm({
      ...form,
      [type]: value,
    });
  };

  const handleSubmit = async () => {
    if (validLogin) {
      const res = await login(form);
      console.log("here");
      console.log(res);
      if (res !== undefined) {
        let id = res.data;
        console.log(id);
        localStorage.clear();
        localStorage.setItem("id", id.id);
        localStorage.setItem("login", id.email);
        localStorage.setItem("password", form.password);
        setStatus(201);
      } else {
        setStatus(600);
      }
    } else {
      setStatus(601);
    }
  };

  return (
    <div className="reg">
      <div className="reg-logo">
        <a href="/">
          <img src="/logo-blue.svg" alt="" />
        </a>
      </div>
      <div className="container">
        {status === 201 ? (
          <div className="reg-inner reg-login">
            <div className="reg_title">
              <h2>Вы вошли в аккаунт</h2>
            </div>
          </div>
        ) : (
          <>
            <div className="reg-inner reg-login">
              <div className="reg_title">
                <h2>
                {status === 0 ? "регистрация" : null}
                  {status === 601 ? "Заполните все необходимые поля" : null}
                  {status !== 0 && status !== 201 && status !== 601
                    ? "Что-то пошло не так, повторите попытку"
                    : null}
                </h2>
              </div>
              <form action="">
                <div className={`reg_item ${!validLogin ? ` valid` : ``}`}>
                  <span>Email или телефон</span>
                  <input
                    type="text"
                    value={form.email}
                    onChange={(e) => {
                      handleForm("login", e.target.value);
                      let ph = validatePhone(e.target.value);
                      let ml = validateEmail(e.target.value);
                      setValidLogin(ph || ml);
                    }}
                  />
                </div>
                <div className="reg_item">
                  <span>Пароль</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleForm("password", e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="reg-buttons">
              <a onClick={handleSubmit} className="reg_button">
                Вход
              </a>
              <a href="/registration" className="reg_button">
                Регистрация
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const emptyLayout = ({ children }) => <>{children}</>;

Login.layout = emptyLayout;

export default Login;
