import React, { useState } from "react";
import BlockPage from "../components/common/Block-Page";
import request from "../services/request";

const fetchCategory = async () =>
  request
    .get("/category", {
      params: {
        size: 7,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const fetchPosts = async () =>
  request
    .get("/post", {
      params: {
        size: 3,
      },
    })
    .catch((err) => console.log(err));

const Main = ({ data }) => {
  const [category, SetCategory] = useState(data.categories[0]);

  console.log(category);
  return (
    <div>
      <div className="main-banner"></div>
      <div className="main-product">
        <div className="container">
          <BlockPage
            data={data}
            selectCategory={(selectCategory) => SetCategory(selectCategory)}
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // const res = await fetch(
  //   "http://localhost:22867/category?size=7"
  // ).then((res) => res.json());
  // const post = await fetch("http://localhost:22867/post?size=3").then((post) =>
  //   post.json()
  // );
  const res = await fetchCategory();
  const post = await fetchPosts();
  
  return {
    props: {
      data: {
        posts: post.data,
        categories: res,
        pagesize: post.headers["total-pages"],
      },
    },
  };
}

export default Main;
