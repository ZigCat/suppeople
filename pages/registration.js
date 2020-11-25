import React, { useState } from "react";
import Select from "../components/common/Select";
import { registration } from "../api/registration";
import { getCities } from "../api/utils";
import request from "../services/request";

const fetchRegisteredUser = (email) =>
  request
    .get("/users", {
      params: {
        email: email,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const Registration = ({ cities }) => {
  const [status, setStatus] = useState(0);
  const [isActive, setActive] = useState(false);
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
    setStatus(res.status);
    const id = await fetchRegisteredUser(form.email);
    console.log(id[0].id);
    localStorage.setItem('id', id[0].id);
    localStorage.setItem('login', form.email);
    localStorage.setItem('password', form.password);
  };

  return (
    <div className="reg">
      <div className="reg-logo">
        <a href="/">
          <img src="/logo-blue.svg" alt="" />
        </a>
      </div>
      <div className="container">
        {status === 0 ? (
          <>
            <div className="reg-inner">
              <div className="reg_title">
                <h2>регистрация</h2>
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
                <div className="reg_item">
                  <span>Телефон</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleForm("phone", e.target.value)}
                  />
                </div>
                <div className="reg_item">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleForm("email", e.target.value)}
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
              <div className="reg_button">Вход</div>
              <a>
                <div onClick={handleSubmit} className="reg_button">
                  Регистрация
                </div>
              </a>
            </div>
          </>
        ) : null}
        {status === 201 ? (
          <div className="reg-inner">
            <div className="reg_title">
              <h2>Регистрация прошла успешно</h2>
            </div>
          </div>
        ) : null}
        {status !== 0 && status !== 201 ? (
          <>
            <div className="reg-inner">
              <div className="reg_title">
                <h2>Что-то пошло не так, повторите попытку</h2>
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
                <div className="reg_item">
                  <span>Телефон</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleForm("phone", e.target.value)}
                  />
                </div>
                <div className="reg_item">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleForm("email", e.target.value)}
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
              <div className="reg_button">Вход</div>
              <a>
                <div onClick={handleSubmit} className="reg_button">
                  Регистрация
                </div>
              </a>
            </div>
          </>
        ) : null}
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
