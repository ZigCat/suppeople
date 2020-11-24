import React, { useState, useEffect } from "react";
import request from "../../services/request";
import Pagination from "./Pagination";
import Product from "./Product";
import Select from "./Select";

const BlockPage = ({
  title = "Посты",
  data,
  user = true,
  postPhase,
  changePhase,
}) => {
  const [posts, setPosts] = useState(data.posts);

  const byClickCategory = async (id) =>
    request
      .get("/post", {
        params: {
          category: id,
          size: 3,
        },
      })
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

  const option1 = [
    { name: "по дате добавления", id: 1 },
    { name: "по возрастанию", id: 2 },
    { name: "по убыванию", id: 3 },
  ];

  const [select1, changeSelect1] = useState(option1[0]);
  const [active1, setActive1] = useState(false);

  const [category, setCategory] = useState({ id: "999", name: "категория..." });
  const [activeCategory, setCategoryActive] = useState(false);

  const [pagination, changePagination] = useState(2);

  return (
    <div className="blockpage">
      <div className="container">
        <div className="blockpage-inner">
          <div className="blockpage-title">
            {user ? (
              <h2>{title}</h2>
            ) : (
              <>
                <div className="blockpage-title_headers">
                  <div onClick={() => changePhase(false)} className={`blockpage-title_mine ${!postPhase ? `act` : null}`}>Мои посты</div>
                  <span>|</span>
                  <div onClick={() => changePhase(true)} className={`blockpage-title_other ${postPhase ? `act` : null}`}>Выполняемые</div>
                </div>
              </>
            )}
          </div>
          <div className="blockpage_filter">
            {user ? (
              <>
                <h4>Фильтр</h4>
                <Select
                  options={option1}
                  selectedItem={select1}
                  changeSelect={changeSelect1}
                  isActive={active1}
                  setActive={setActive1}
                />
                <Select
                  options={data.categories}
                  selectedItem={category}
                  changeSelect={setCategory}
                  isActive={activeCategory}
                  setActive={setCategoryActive}
                  byClick={byClickCategory}
                />
              </>
            ) : (
              <>
                <h4>Категории</h4>
                <div className="blockpage_filter_active">активные</div>
                <div className="blockpage_filter_disactivated">неактивные</div>
              </>
            )}
          </div>
          <div className="blockpage_items">
            {posts.map((item) => {
              return (
                <div className="blockpage_item">
                  <Product
                    username={item.user.fname + " " + item.user.lname}
                    trustLevel="10"
                    city={item.user.city.city}
                    img={
                      item.image === null
                        ? "placeholder-image.svg"
                        : `posters/${item.image}`
                    }
                    message={item.message}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
