import React, { useState, useEffect } from "react";
import Search from "../components/common/Search";
import SearchModal from "../components/common/SearchModal";
import UserModal from "../components/user/UserModal";
import request from "../services/request";

const Layout = ({ children }) => {
  const [user, setUser] = useState();
  const [openModal, changeModal] = useState(false);
  const [isActiveSearch, setActiveSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const fetchUser = async () =>
    request
      .get(`/users/${localStorage.getItem("id")}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="layout">
      <div className="layout-top">
        <div className="container-head">
          <div className="layout-top_inner">
            <div className="layout-top_item">
              <div className="layout-top_logo">
                <a href="/">
                  <img src="/logo-lay.svg" alt="suppeople.kz" />
                  <img src="/raw-logo.png" alt="suppeople.kz" />
                </a>
              </div>
              <div className="layout-top_search">
                <Search setShow={setActiveSearch} setUser={setSearchData} />
                {isActiveSearch ? <SearchModal data={searchData} /> : null}
              </div>
            </div>
            <div className="layout-top_item">
              <div className="layout-top_about">
                <a href="#">О проекте</a>
              </div>
              <div className="layout-top_profile">
                <a
                  onClick={() => {
                    if (localStorage.getItem("login")) {
                      changeModal(!openModal);
                    }
                  }}
                >
                  <img src="/avatar.svg" alt="" />
                  <span>
                    {user && localStorage.getItem("login")
                      ? user.fname
                      : "Пользователь"}
                  </span>
                </a>
                {openModal ? <UserModal user={user} /> : null}
              </div>
              <div className="layout-top_mob">
                <div className="layout-top_mob_profile">
                  <a>
                    <img src="/avatar.svg" alt="" />
                    <span>
                      {user && localStorage.getItem("login")
                        ? user.fname
                        : "Пользователь"}
                    </span>
                  </a>
                </div>
                <div className="layout-top_mob_menu">
                  <img src="/list.svg" alt="" />
                </div>
              </div>
              <div className="layout-top_reg">
                <a href="/registration">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-inner">{children}</div>
      <div className="layout-bottom">
        <div className="container-head">
          <div className="layout-bottom_inner">
            <div className="layout-bottom_logo">
              <img src="/logo.svg" alt="" />
            </div>
            <div className="layout-bottom_desc">
              <span>
                В условиях пандемии и экономического кризиса многие люди
                потеряли работу и оказались неспособны обеспечить себя и свои
                семьи.
              </span>
              <span>
                Цель проекта <strong>Suppeople</strong> заключается в нахождении
                помощи для тех, кто в ней нуждается.
              </span>
            </div>
            <div className="layout-bottom_copyright">
              <span>Suppeople Organization, 2020г.</span>
              <span>Copyright free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
