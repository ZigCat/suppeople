import React, { useState } from "react";
import Select from "../components/common/Select";
import { registration } from "../api/registration";
import { getCities } from "../api/utils";

const Registration = ({ cities }) => {
  const [isActive, setActive] = useState(false);
  const [selectedItem, changeSelect] = useState(cities[0]);
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
    handleForm('city', value.id);
  }

  const handleSubmit = async () => {
    const res = await registration(form);
  };

  return (
    <div className="reg">
      <div className="reg-logo">
        <a href="/">
          <img src="/logo.svg" alt="" />
        </a>
      </div>
      <div className="container">
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
                onChange={(e) => handleForm("dateOfBirthday", e.target.value)}
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
          <div className="reg_button">
            Вход
          </div>
          <a href="/"><div onClick={handleSubmit} className="reg_button">Регистрация</div></a>
        </div>
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
