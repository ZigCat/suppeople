import React, { useState } from "react";
import request from "../../services/request";
import Select from "./Select";

const PostModal = ({ categories, user, setActive }) => {
    const postPost = async() => 
        request.post('/post', form, {
            auth:{
                username: localStorage.getItem('login'),
                password: localStorage.getItem('password'),
            }
        }).catch(err => console.log(err));

  const handleForm = (type, value) => {
    setForm({...form, [type]: value });
  };

  const handleCategory = (value) => {
    changeSelect(value);
    handleForm("category", value.id);
  }

  const handleSubmit = async () => {
    const res = await postPost();
    console.log(res.status);
    if(res.status === 201){
        setActive(false);
    }
  }

  const [form, setForm] = useState({
    category: "",
    city: user.city.id,
    message: "",
  });

  const [isSelect, setSelect] = useState(false);
  const [selectedItem, changeSelect] = useState({
    id: "999",
    name: "категория...",
  });

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
              <Select
                options={categories}
                isActive={isSelect}
                setActive={setSelect}
                selectedItem={selectedItem}
                changeSelect={handleCategory}
              />
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
            placeholder="Текст поста"
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
            <img src="/letter.svg" alt="" /> Опубликовать
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
