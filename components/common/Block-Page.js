import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Product from "./Product";
import Select from "./Select";
import request from "../../services/request";

const BlockPage = ({ data, owner }) => {
  const [posts, setPosts] = useState(data.posts);
  const [user, setUser] = useState(null);

  const option1 = [
    { name: "по дате добавления", id: 1 },
    { name: "по возрастанию", id: 2 },
    { name: "по убыванию", id: 3 },
  ];

  const [select1, changeSelect1] = useState(option1[0]);
  const [active1, setActive1] = useState(false);

  const [category, setCategory] = useState({ id: "999", name: "категория..." });
  const [activeCategory, setCategoryActive] = useState(false);

  const [pagination, changePagination] = useState(1);

  const [userId, setUserId] = useState(null);

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
      })
      .catch((err) => console.log(err));

  const fetchThisUser = async (id) =>
    request
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));

  const paginationByClick = async (page) =>
    request
      .get("/post", {
        params: {
          size: 3,
          page: page,
          status: 'CREATED',
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    paginationByClick(pagination, {});
  }, [pagination]);

  useEffect(() => {
    setUserId(parseInt(localStorage.getItem("id")));
    fetchThisUser(localStorage.getItem('id'));
  }, []);

  return (
    <div className="blockpage">
      <div className="container">
        <div className="blockpage-inner">
          <div className="blockpage-title">
            <h2>Посты</h2>
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
            {posts.map((item, key) => (
              <div className="blockpage_item" key={key}>
                <Product
                  item={item}
                  loggedUser={user}
                  trustLevel="10"
                  img={
                    item.image === null
                      ? "placeholder-image.svg"
                      : `posters/${item.image}`
                  }
                  profileButton={owner}
                  yourPost={userId === item.user.id}
                />
              </div>
            ))}
            <Pagination
              selectedItem={pagination}
              changeSelect={changePagination}
              length={data.pagesize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
