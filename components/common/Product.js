import React, {useState} from "react";
import request from "../../services/request";
import PostApplicationModal from "./PostApplicationModal";

const Product = ({ item, loggedUser, trustLevel, img, yourPost = false }) => {
  const [openModal, changeOpenModal] = useState(false);
  const deletePost = async (id) =>
    request
      .patch(
        `/post/${id}`,
        { status: "COMPLETED" },
        {
          auth: {
            username: localStorage.getItem("login"),
            password: localStorage.getItem("password"),
          },
        }
      )
      .catch((err) => console.log(err));

  const processDelete = async () => {
    let res = await deletePost(item.id);
    console.log(res);
    //window.location.reload();
  };
  return (
    <>
      {openModal ? <PostApplicationModal setActive={changeOpenModal} post={item} user={loggedUser} /> : null}
      <div className="post">
        <div className="post__top">
          <div className="post__top_owner">
            <img className="post__top_owner-avatar" src="/avatar.svg" />
            <div className="post__top_owner-desc">
              <h3>
                <a href={`/user/${item.user.id}`}>
                  {item
                    ? item.user.fname + " " + item.user.lname
                    : "Пользователь"}
                </a>
              </h3>
              <span className="post__top_owner-desc-trust">
                уровень доверия {trustLevel}
              </span>
              <span className="post__top_owner-desc-city">
                <img src="/pin-prod.svg" alt="" />
                {item ? item.user.city.city : "Алматы"}
              </span>
            </div>
          </div>
          <img className="post__top_img" src={`/${img}`} />
        </div>
        <div className="post__desc">
          <p>{item ? item.message : "Сообщение"}</p>
        </div>
        <div className="post__buttons">
          {!yourPost ? (
            <>
              <div className="post__button">
                <img src="/cross-sign.svg" alt="" />
                Пожаловаться
              </div>
            </>
          ) : (
            <>
              <div onClick={() => processDelete()} className="post__button">
                <img src="/cross-sign.svg" alt="" />
                Закончить
              </div>
            </>
          )}
          {!yourPost ? <div className="post__button ac-but" onClick={() => changeOpenModal(true)}>Откликнуться</div> : null}
          <div className="post__button">
            <img src="/like.svg" alt="" />
            Избранное
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
