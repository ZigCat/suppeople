import request from "../services/request";

export const fetchAppsBySender = async (setApps) =>
  request
    .get("/userApplication", {
      auth: {
        username: localStorage.getItem("login"),
        password: localStorage.getItem("password"),
      },
    })
    .then((res) => {
      console.log(res);
      setApps(res.data);
    })
    .catch((err) => console.log(err));
