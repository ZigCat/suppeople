import request from '../services/request'

export const fetchPosts = async () =>
  request
    .get("/post", {
      params: {
        size: 3,
      },
    })
    .catch((err) => console.log(err));