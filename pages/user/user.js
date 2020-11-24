import { urlObjectKeys } from "next/dist/next-server/lib/utils";
import React, { useState } from "react";
import BlockPage from "../../components/common/Block-Page";
import request from "../../services/request";

const fetchUserPosts = async (id) =>
  request
    .get("/post", {
      params: {
        size: 3,
        user: id,
      },
    })
    .catch((err) => console.log(err));

const fetchUser = async (username, password, id) =>
  request
    .get(`/users/${id}`, {
      auth: {
        username: username,
        password: password,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const User = ({ data }) => {
  const [activeTab, changeActive] = useState(0);

  const [postPhase, changePhase] = useState(false);

  return (
    <div className="user">
      <div className="user-inner">
        <div className="user-bio">
          <div className="user-bio-container">
            <div className="user-bio_avatar">
              <img src="/avatar.svg" alt="" />
            </div>
            <div className="user-bio_info">
              <h4>John Dodster</h4>
              <span className="user-bio_info-trust">уровень доверия 10</span>
              <span className="user-bio_info-city">
                <img src="/pin.svg" alt="" />
                Алматы
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
                <BlockPage
                  title="Мои посты"
                  data={data}
                  user={false}
                  postPhase={postPhase}
                  changePhase={changePhase}
                />
              </div>
            ) : null}
            {activeTab === 1 ? (
              <div className="user-tabs_contacts">
                <div className="user-tabs_contacts-items">
                  <div className="user-tabs_contacts-item">
                    <span>John Dodster</span>
                    <span>06.06.2020</span>
                    <span>
                      <img src="/pin-contact.svg" alt="" />
                      г.Алматы, Казахстан
                    </span>
                  </div>
                  <div className="user-tabs_contacts-item">
                    <span>Телефон:</span>
                    <span>+77081234567</span>
                  </div>
                  <div className="user-tabs_contacts-item">
                    <span>Email:</span>
                    <span>jdoe@gmail.com</span>
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

export async function getServerSideProps() {
  const posts = await fetchUserPosts(4);
  //const user = await fetchUser()

  return {
    props: {
      data: {
        posts: posts.data,
        pagesize: posts.headers["total-pages"],
      },
    },
  };
}

export default User;
