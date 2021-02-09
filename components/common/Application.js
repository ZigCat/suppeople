import React from "react";

const Application = ({ item }) => {

  return (
    <>
      <div className="post">
        <div className="post__top">
          <div className="post__top_owner">
            <img className="post__top_owner-avatar" src="/avatar.svg" />
            <div className="post__top_owner-desc">
              <h3>
                <a>
                  {item
                    ? item.applicationUser.fname + " " + item.applicationUser.lname
                    : "Пользователь"}
                </a>
              </h3>
              <span className="post__top_owner-desc-trust">
                уровень доверия {item.applicationUser.postQt}
              </span>
              <span className="post__top_owner-desc-city">
                <img src="/pin-prod.svg" alt="" />
                {item ? item.applicationUser.city.city : "Алматы"}
              </span>
            </div>
          </div>
        </div>
        <div className="post__desc">
          <p>{item ? item.message : "Сообщение"}</p>
        </div>
        <div className="post__buttons">
          {item.status !== "COMPLETED" ? (
            <>
              <div className="post__button">
                <img src="/cross-sign.svg" alt="" />
                Пожаловаться
              </div>
            </>
          ) : (
            <div className="post__button">Выполнен</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Application;
