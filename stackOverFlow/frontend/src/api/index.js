import Cookies from "js-cookie";

import Fetch from "../utils/helper";

export const handleLoginRequest = async (data) => {
  const url = `http://localhost:4000/login`;

  const response = await Fetch.request({
    method: "POST",
    url,
    data,
  });

  const jsonData = await response.json();

  Cookies.set("userId", jsonData.userId);
  window.localStorage.setItem("token", jsonData.token);

  return jsonData;
};

export const handleRegisterRequest = async (data) => {
  const url = `http://localhost:4000/register`;

  const response = await Fetch.request({
    method: "POST",
    url,
    data,
  });

  const jsonData = await response.json();

  Cookies.set("userId", jsonData.userId);
  window.localStorage.setItem("token", jsonData.token);

  return jsonData;
};
