import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import PostModal from "./PostModal";
import Product from "./Product";
import Select from "./Select";
import request from "../../services/request";

const BlockPage = ({
  title = "Посты",
  data,
  user = true,
  userData,
  postPhase,
  changePhase,
  owner,
}) => {
  const [posts, setPosts] = useState(data.posts);

  const option1 = [
    { name: "по дате добавления", id: 1 },
    { name: "по возрастанию", id: 2 },
    { name: "по убыванию", id: 3 },
  ];

  const [activeModal, setModal] = useState(false);

  const [select1, changeSelect1] = useState(option1[0]);
  const [active1, setActive1] = useState(false);

  const [category, setCategory] = useState({ id: "999", name: "категория..." });
  const [activeCategory, setCategoryActive] = useState(false);

  const [pagination, changePagination] = useState(1);

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

  const paginationByClick = async (page) =>
    request
      .get("/post", {
        params: {
          size: 3,
          page: page,
        },
      })
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    paginationByClick(pagination);
  }, [pagination]);

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
                  <div
                    onClick={() => changePhase(false)}
                    className={`blockpage-title_mine ${
                      !postPhase ? `act` : null
                    }`}
                  >
                    Мои посты
                  </div>
                  <span>|</span>
                  <div
                    onClick={() => changePhase(true)}
                    className={`blockpage-title_other ${
                      postPhase ? `act` : null
                    }`}
                  >
                    Выполняемые
                  </div>
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
            {owner ? (
              <div
                onClick={() => setModal(true)}
                className="blockpage_items-create"
              >
                + создать пост
              </div>
            ) : null}
            {activeModal ? (
              <PostModal
                categories={data.categories}
                user={userData}
                setActive={setModal}
              />
            ) : null}
            {!postPhase
              ? posts.map((item) => {
                  return (
                    <div className="blockpage_item">
                      <Product
                        item={item}
                        trustLevel="10"
                        img={
                          item.image === null
                            ? "placeholder-image.svg"
                            : `posters/${item.image}`
                        }
                        profileButton={owner}
                      />
                    </div>
                  );
                })
              : data.apps.map((item) => {
                  return (
                    <div className="blockpage_item">
                      <Product
                        username={
                          item.applicationUser.fname +
                          " " +
                          item.applicationUser.lname
                        }
                        trustLevel="10"
                        city={item.applicationUser.city.city}
                        img="placeholder-image.svg"
                        message={item.message}
                      />
                    </div>
                  );
                })}
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
