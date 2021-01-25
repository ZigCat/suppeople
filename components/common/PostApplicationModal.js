import React, { useState } from "react";
import request from "../../services/request";

const PostApplicationModal = ({ post, user, setActive }) => {
  const [form, setForm] = useState({
    userId: user.id,
    postId: post.id,
    message: "",
  });

  const createPostApplication = async () =>
    request
      .post("/postApplication", form, {
        auth: {
          username: localStorage.getItem("login"),
          password: localStorage.getItem("password"),
        },
      })
      .catch((err) => console.log(err));

  const handleForm = (type, value) => {
    setForm({ ...form, [type]: value });
  };

  const handleSubmit = async () => {
    if (form.message !== "") {
      const res = await createPostApplication(form);
      if (res.status === 201) {
        setActive(false);
      }
    }
  };

  return (
    <div className="postmodal">
      <div className="postmodal-inner">
        <div className="postmodal-top">
          <div className="postmodal-top_user">
            <div className="postmodal-top_user-avatar">
              <img src="/avatar.svg" alt="" />
            </div>
            <div className="postmodal-top_user-info">
              <h2>{user ? user.fname + " " + user.lname : "User Account"}</h2>
            </div>
          </div>
          <div className="postmodal-top_img">
            Загрузить картинку
            <img src="/upload.svg" alt="" />
          </div>
        </div>
        <div className="postmodal-desc">
          <textarea
            onChange={(e) => handleForm("message", e.target.value)}
            wrap="on"
            placeholder="Ваше предложение помощи"
            cols="400"
            rows="8"
          ></textarea>
        </div>
        <div className="postmodal-buttons">
          <div onClick={() => setActive(false)} className="postmodal-button">
            <img src="/cross-orange.svg" alt="" />
            Отменить
          </div>
          <div onClick={() => handleSubmit()} className="postmodal-button">
            <img src="/letter.svg" alt="" /> Запросить
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostApplicationModal;
