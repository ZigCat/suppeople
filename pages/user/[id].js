import React, { useEffect, useState } from "react";
import { fetchUserPosts } from "../../api/posts";
import { getCities } from "../../api/utils";
import UserPage from "../../components/user/UserPage";
import request from "../../services/request";
import Select from "../../components/common/Select";
import {validateEmail, validatePhone} from '../../services/validator';

const fetchCategory = async () =>
  request
    .get("/category", {
      params: {
        size: 7,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const User = ({ data }) => {
  const [activeTab, changeActive] = useState(0);
  const [activeSelect, changeActiveSelect] = useState(false);
  const [user, setUser] = useState();
  const [userParams, setUserParams] = useState(false);
  const [form, setForm] = useState(null);
  const [validMail, setValidMail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [statusCode, setStatusCode] = useState(0);
  const [selectedCity, changeCity] = useState({
    id: 999,
    city: "Город",
  });

  const fetchThisUser = async () =>
    request
      .get(`/users/${data.id}`, {
        auth: {
          username: localStorage.getItem("login"),
          password: localStorage.getItem("password"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));

  const patchUser = async (form) => 
      request
        .patch(`/users/${data.id}`, form, {
          auth: {
            username: localStorage.getItem("login"),
            password: localStorage.getItem("password"),
          },
        })
        .catch(err => console.log(err));

  useEffect(() => {
    fetchThisUser();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("id") === data.id) {
      setUserParams(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        fname: user.fname,
        lname: user.lname,
        city: user.city.id,
        email: user.email,
        phone: user.phone,
      });
      changeCity({
        id: user.city.id,
        city: user.city.city,
      });
    }
  }, [user]);

  const handleUserForm = (type, value) => {
    setForm({ ...form, [type]: value });
  };

  const handleUserFormCity = (value) => {
    changeCity(value);
    setForm({ ...form, city: value.id });
  };

  const handleSubmitUser = async(form) => {
    if(validPhone && validMail){
      let res = await patchUser(form);
      if(res !== undefined){
        setStatusCode(201);
      } else {
        setStatusCode(600);
      }
    } else {
      setStatusCode(601);
    }
  };

  return (
    <div className="user">
      <div className="user-inner">
        <div className="user-bio">
          <div className="user-bio-container">
            <div className="user-bio_avatar">
              <img src="/avatar.svg" alt="" />
            </div>
            <div className="user-bio_info">
              <h4>{user ? user.fname + " " + user.lname : "User Account"}</h4>
              <span className="user-bio_info-trust">уровень доверия 10</span>
              <span className="user-bio_info-city">
                <img src="/pin.svg" alt="" />
                {user ? user.city.city : "City"}
              </span>
            </div>
          </div>
          <div className="user-bio-bg"></div>
        </div>
        <div className="user-tabs">
          <div className="user-tabs_map">
            <div
              className={`user-tabs_map-item ${
                activeTab === 0 ? `active-tab` : null
              }`}
              onClick={() => changeActive(0)}
            >
              Посты
            </div>
            <div
              className={`user-tabs_map-item ${
                activeTab === 1 ? `active-tab` : null
              }`}
              onClick={() => changeActive(1)}
            >
              Контакты
            </div>
            <div
              className={`user-tabs_map-item ${
                activeTab === 2 ? `active-tab` : null
              }`}
              onClick={() => changeActive(2)}
            >
              Достижения
            </div>
          </div>
          <div className="user-tabs_items">
            {activeTab === 0 ? (
              <div className="user-tabs_post">
                <UserPage data={data} user={user} />
              </div>
            ) : null}
            {activeTab === 1 ? (
              !userParams ? (
                <div className="user-tabs_contacts">
                  <div className="user-tabs_contacts-items">
                    <div className="user-tabs_contacts-item">
                      <span>
                        {user ? user.fname + " " + user.lname : "Пользователь"}
                      </span>
                      <span>{user ? user.dateOfBirthday : "1973-01-01"}</span>
                      <span>
                        <img src="/pin-contact.svg" alt="" />
                        г.{user ? user.city.city : "Алматы"}, Казахстан
                      </span>
                    </div>
                    <div className="user-tabs_contacts-item">
                      <span>Телефон:</span>
                      <span>{user ? user.phone : "+77000000000"}</span>
                    </div>
                    <div className="user-tabs_contacts-item">
                      <span>Email:</span>
                      <span>{user ? user.email : "email@gmail.com"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="user-tabs_contacts">
                  <div className="user-tabs_contacts-editable">
                    <div className="user-tabs_contacts-editable-title">
                      <h2>
                        {statusCode === 0 ? 'Личные данные' : null}
                        {statusCode === 201 ? 'Изменения подтверждены' : null}
                        {statusCode === 601 ? 'Поля заполнены некорректно' : null}
                        {statusCode === 600 ? 'Повторите попытку...' : null}
                      </h2>
                    </div>
                    <form action="">
                      <div className="user-tabs_contacts-editable-part">
                        <div className="user-tabs_contacts-editable-item">
                          <span>Фамилия</span>
                          <input
                            type="text"
                            value={form === null ? "Фамилия" : form.lname}
                            onChange={(e) =>
                              handleUserForm("lname", e.target.value)
                            }
                          />
                        </div>
                        <div className="user-tabs_contacts-editable-item">
                          <span>Имя</span>
                          <input
                            type="text"
                            value={form === null ? "Имя" : form.fname}
                            onChange={(e) =>
                              handleUserForm("fname", e.target.value)
                            }
                          />
                        </div>
                        <div className="user-tabs_contacts-editable-item town">
                          <span>Город проживания</span>
                          <Select
                            options={data.cities}
                            isActive={activeSelect}
                            setActive={changeActiveSelect}
                            selectedItem={selectedCity}
                            changeSelect={handleUserFormCity}
                            valueKey="city"
                          />
                        </div>
                      </div>
                      <div className="user-tabs_contacts-editable-part">
                        <div
                          className={`user-tabs_contacts-editable-item ${
                            !validMail ? ` valid` : ``
                          }`}
                        >
                          <span>Email</span>
                          <input
                            type="email"
                            value={form === null ? "Email" : form.email}
                            onChange={(e) => {
                              handleUserForm("email", e.target.value);
                              setValidMail(validateEmail(e.target.value));
                            }}
                          />
                        </div>
                        <div
                          className={`user-tabs_contacts-editable-item ${
                            !validPhone ? ` valid` : ``
                          }`}
                        >
                          <span>Телефон</span>
                          <input
                            type="tel"
                            value={
                              form === null ? "Номер телефона" : form.phone
                            }
                            onChange={(e) => {
                              handleUserForm("phone", e.target.value);
                              setValidPhone(validatePhone(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                      <div className="user-tabs_contacts-editable-submit"
                            onClick={() => handleSubmitUser(form)}>
                        Подтвердить изменения
                      </div>
                    </form>
                  </div>
                </div>
              )
            ) : null}
            {activeTab === 2 ? (
              <div className="user-tabs_ach">
                <div className="user-tabs_ach-items">
                  <div className="user-tabs_ach-row">
                    <div className="user-tabs_ach-item">
                      <img src="/1pirozhok.svg" alt="" />
                    </div>
                    <div className="user-tabs_ach-item">
                      <img src="/2konfety.svg" alt="" />
                    </div>
                    <div className="user-tabs_ach-item">
                      <img src="/5buketik.svg" alt="" />
                    </div>
                    <div className="user-tabs_ach-item">
                      <img src="/10podarki.svg" alt="" />
                    </div>
                  </div>
                  <div className="user-tabs_ach-row">
                    <div className="user-tabs_ach-item">
                      <img src="/50medalki.svg" alt="" />
                    </div>
                    <div className="user-tabs_ach-item">
                      <img src="/100kubki.svg" alt="" />
                    </div>
                    <div className="user-tabs_ach-item">
                      <img src="/150almazy.svg" alt="" />
                    </div>
                    <div className="user-tabs_ach-item">
                      <img src="/150_zvezda.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  const categories = await fetchCategory();
  const post = await fetchUserPosts(id);
  const cities = await getCities();

  return {
    props: {
      data: {
        cities: cities,
        pages: post.headers["total-pages"],
        categories: categories,
        id: id,
      },
    },
  };
}

export default User;
