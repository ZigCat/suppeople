import React, { useState } from "react";
import Select from "../components/common/Select";
import { registration } from "../api/registration";
import { getCities } from "../api/utils";
import { validateEmail, validatePhone } from "../services/validator";

const Registration = ({ cities }) => {
  const [status, setStatus] = useState(0);
  const [resMessage, setMessage] = useState('Что-то пошло не так, повторите попытку...')
  const [isActive, setActive] = useState(false);
  const [validMail, setValidMail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [selectedItem, changeSelect] = useState({
    id: 999,
    city: "Выберите город...",
  });

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    dateOfBirthday: "",
    city: 1,
  });

  const handleForm = (type, value) => {
    setForm({
      ...form,
      [type]: value,
    });
  };

  const handleCity = (value) => {
    changeSelect(value);
    handleForm("city", value.id);
  };

  const handleSubmit = async () => {
    const res = await registration(form);
    if (validPhone && validMail) {
      if (res !== undefined) {
        if (res.status === 201 || res.status === 200) {
          let id = res.data;
          localStorage.clear();
          localStorage.setItem("id", id.id);
          localStorage.setItem("login", id.email);
          localStorage.setItem("password", form.password);
          setStatus(201);
        } else {
          setStatus(600);
          setMessage(res.data.message);
        }
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
          <div className="reg-inner">
            <div className="reg_title">
              <h2>Регистрация прошла успешно</h2>
            </div>
          </div>
        ) : (
          <>
            <div className="reg-inner">
              <div className="reg_title">
                <h2>
                  {status === 0 ? "регистрация" : null}
                  {status === 601 ? "Заполните все необходимые поля" : null}
                  {status !== 0 && status !== 201 && status !== 601
                    ? resMessage
                    : null}
                </h2>
              </div>
              <form action="">
                <div className="reg_row">
                  <div className="reg_item row">
                    <span>Фамилия</span>
                    <input
                      type="text"
                      value={form.lname}
                      onChange={(e) => handleForm("lname", e.target.value)}
                    />
                  </div>
                  <div className="reg_item row">
                    <span>Имя</span>
                    <input
                      type="text"
                      value={form.fname}
                      onChange={(e) => handleForm("fname", e.target.value)}
                    />
                  </div>
                </div>
                <div className={`reg_item ${!validPhone ? ` valid` : ``}`}>
                  <span>Телефон</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      handleForm("phone", e.target.value);
                      setValidPhone(validatePhone(e.target.value));
                    }}
                  />
                </div>
                <div className={`reg_item ${!validMail ? ` valid` : ``}`}>
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      handleForm("email", e.target.value);
                      setValidMail(validateEmail(e.target.value));
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
                <div className="reg_item">
                  <span>Дата рождения</span>
                  <input
                    type="date"
                    value={form.dateOfBirthday}
                    onChange={(e) =>
                      handleForm("dateOfBirthday", e.target.value)
                    }
                  />
                </div>
                <div className="reg_item town">
                  <span>Город</span>
                  <Select
                    options={cities}
                    isActive={isActive}
                    setActive={setActive}
                    selectedItem={selectedItem}
                    changeSelect={handleCity}
                    valueKey="city"
                  />
                </div>
              </form>
            </div>
            <div className="reg-buttons">
              <a href="/login" className="reg_button">
                Вход
              </a>
              <a onClick={handleSubmit} className="reg_button">
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

Registration.layout = emptyLayout;

export async function getServerSideProps(context) {
  const cities = await getCities();

  return {
    props: {
      cities: cities || null,
    },
  };
}

export default Registration;
