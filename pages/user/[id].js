import React, { useEffect, useState } from "react";
import { fetchUserPosts } from "../../api/posts";
import UserPage from "../../components/user/UserPage";
import request from "../../services/request";

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
  const [user, setUser] = useState();

  const fetchThisUser = async () =>
    request
      .get(`/users/${data.id}`, {
        auth: {
          username: localStorage.getItem("login"),
          password: localStorage.getItem("password"),
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));

  useEffect(() => {
    fetchThisUser();
  }, []);

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

  return {
    props: {
      data: {
        pages: post.headers["total-pages"],
        categories: categories,
        id: id,
      },
    },
  };
}

export default User;
