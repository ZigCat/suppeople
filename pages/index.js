import React from "react";
import BlockPage from "../components/common/Block-Page";
import { fetchPosts } from "../api/posts";
import { fetchCategory } from "../api/category";
import Loading from "../components/common/Loading";

const Main = ({ data }) => {
  return (
    <div>
      {data ? (
        <>
        <div className="main-placeholder"></div>
          <div className="main-banner"></div>
          <div className="main-product">
            <div className="container">
              <BlockPage data={data} />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export async function getServerSideProps() {
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
