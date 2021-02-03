import React, { useState, useEffect } from "react";
import { fetchAppsBySender } from "../../api/applications";
import request from "../../services/request";
import Pagination from "../common/Pagination";
import PostModal from "../common/PostModal";
import Product from "../common/Product";

const UserPage = ({ user, data }) => {
  const [post, setPost] = useState(null);
  const [postPhase, changePhase] = useState(false);
  const [activeModal, setModal] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [userId, setUserId] = useState(null);
  const [apps, setApps] = useState(null);
  const [head, setHead] = useState(false);

  const fetchAppsBySender = async () =>
    request
      .get("/userApplication", {
        auth: {
          username: localStorage.getItem("login"),
          password: localStorage.getItem("password"),
        },
      })
      .then((res) => {
        setApps(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));

  const fetchUserPosts = async (page) =>
    request
      .get("/post", {
        params: {
          user: data.id,
          size: 3,
          page: page,
        },
      })
      .then((res) => {
        setPost(res);
        console.log(res);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    fetchUserPosts(pagination);
  }, [pagination]);

  useEffect(() => {
    setHead(userId === parseInt(data.id));
  }, [userId]);

  useEffect(() => {
    setUserId(parseInt(localStorage.getItem("id")));
    fetchAppsBySender();
  }, []);

  console.log(apps);

  return (
    <div className="blockpage">
      <div className="container">
        <div className="blockpage-inner">
          <div className="blockpage-title">
            <div className="blockpage-title_headers">
              {head ? (
                <>
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
                    Мои запросы
                  </div>
                </>
              ) : (
                <h2>Посты</h2>
              )}
            </div>
          </div>
          {/* <div className="blockpage_filter">
            <h4>Категории</h4>
            <div className="blockpage_filter_active">активные</div>
            <div className="blockpage_filter_disactivated">неактивные</div>
          </div> */}
          <div className="blockpage_items">
            {head ? (
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
                user={user}
                setActive={setModal}
              />
            ) : null}
            {!postPhase
              ? post
                ? post.data.map((item, index) => (
                    <div className="blockpage_item" key={index}>
                      <Product
                        item={item}
                        trustLevel="10"
                        img={
                          item.image === null
                            ? "placeholder-image.svg"
                            : `posters/${item.image}`
                        }
                        yourPost={userId === item.user.id}
                      />
                    </div>
                  ))
                : null
              : apps !== null
              ? apps.map((item, index) => (
                  <div className="blockpage_item" key={index}>
                    <Product
                      item={item}
                      trustLevel="10"
                      img={
                        item.image === null
                          ? "placeholder-image.svg"
                          : `posters/${item.image}`
                      }
                      yourPost={userId === item.user.id}
                    />
                  </div>
                ))
              : null}
            <Pagination
              selectedItem={pagination}
              changeSelect={setPagination}
              length={data.pages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
