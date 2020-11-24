import React, { useState, useEffect } from "react";
import Search from "../components/common/Search";
import request from '../services/request';

const Layout = ({ children }) => {
  const [user, setUser] = useState();
  const fetchUser = async () => {
      let req = '/user'/+localStorage.getItem('id');
    request
      .get(
        req,
        {
          auth: {
            username: localStorage.getItem("login"),
            password: localStorage.getItem("password"),
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    }

  useEffect(() => {
      setUser(fetchUser());
  }, []);
  console.log(user);
  return (
    <div className="layout">
      <div className="layout-top">
        <div className="container-head">
          <div className="layout-top_inner">
            <div className="layout-top_item">
              <div className="layout-top_logo">
                <a href="/">
                  <img src="/logo-lay.svg" alt="suppeople.kz" />
                </a>
              </div>
              <Search />
            </div>
            <div className="layout-top_item">
              <div className="layout-top_about">
                <a href="#">О проекте</a>
              </div>
              <div className="layout-top_profile">
                <a href="/user/user">
                  <img src="/avatar.svg" alt="" />
                  <span>Dodster</span>
                </a>
              </div>
              <div className="layout-top_reg">
                <a href="/registration">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-inner">{children}</div>
    </div>
  );
};

export default Layout;
