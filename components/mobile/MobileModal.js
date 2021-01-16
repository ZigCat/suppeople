import React from "react";

const MobileModal = ({ user, closeModal }) => {
  return (
    <div className="mobmodal">
      <div className="mobmodal-placeholder" onClick={() => closeModal(false)}></div>
      <div className="mobmodal-inner">
        <div className="mobmodal-logo">
          <a onClick={() => closeModal(false)}>
            <img src="/logo-blue.svg" alt="" />
          </a>
        </div>
        <div className="mobmodal-profile">
          <img src="/avatar.svg" alt="" />
          <span>{user ? user.fname + " " + user.lname : "Пользователь"}</span>
        </div>
        {user ? (
          <div className="mobmodal-menu">
            <a
              href={`/user/${localStorage.getItem("id")}`}
              className="mobmodal-menu_item"
            >
              <span>Мой профиль</span>
            </a>
            <a
              href={`/user/${localStorage.getItem("id")}`}
              className="mobmodal-menu_item"
            >
              <span>Посты</span>
            </a>
            <a
              href={`/user/${localStorage.getItem("id")}`}
              className="mobmodal-menu_item"
            >
              <span>Достижения</span>
            </a>
            <a
              href={`/user/${localStorage.getItem("id")}`}
              className="mobmodal-menu_item"
            >
              <span>Избранные</span>
            </a>
            <a
              href={`/user/${localStorage.getItem("id")}`}
              className="mobmodal-menu_item"
            >
              <span>Настройки</span>
            </a>
          </div>
        ) : null}
        {user ? (
          <a href='/login' onClick={() => localStorage.clear()} className="mobmodal-exit">
            <span>Выход</span>
            <img src="/exit.svg" alt="" />
          </a>
        ) : null}
        <div className="mobmodal-reg">
          <a href="/registration">Регистрация</a>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;
