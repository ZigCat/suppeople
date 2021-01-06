import request from "../services/request";

export const fetchPosts = async () =>
  request
    .get("/post", {
      params: {
        size: 3,
      },
    })
    .catch((err) => console.log(err));

export const fetchUserPosts = async (id) =>
  request
    .get(`/post`, {
      params: {
        user: id,
        size: 3,
      },
    })
    .catch((err) => console.log(err));
