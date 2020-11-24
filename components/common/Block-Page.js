import React, { useState, useEffect } from "react";
import request from "../../services/request";
import Pagination from "./Pagination";
import Product from "./Product";
import Select from "./Select";

const BlockPage = ({ title = "Посты", data }) => {

  const [posts, setPosts] = useState(data.posts);

  const byClickCategory = async (id) =>
    request
      .get("/post", {
        params: {
          category: id,
          size: 3,
        },
      })
      .then((res) => {setPosts(res.data);console.log(res.data)})
      .catch((err) => console.log(err));

  const option1 = [
    { name: "по дате добавления", id: 1 },
    { name: "по возрастанию", id: 2 },
    { name: "по убыванию", id: 3 },
  ];

  const [select1, changeSelect1] = useState(option1[0]);
  const [active1, setActive1] = useState(false);

  const [category, setCategory] = useState(data.categories[0]);
  const [activeCategory, setCategoryActive] = useState(false);

  const [pagination, changePagination] = useState(2);

  return (
    <div className="blockpage">
      <div className="container">
        <div className="blockpage-inner">
          <div className="blockpage-title">
            <h2>{title}</h2>
          </div>
          <div className="blockpage_filter">
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
