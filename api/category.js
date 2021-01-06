import request from "../services/request";

export const fetchCategory = async () =>
  request
    .get("/category", {
      params: {
        size: 7,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
