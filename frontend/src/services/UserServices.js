import http from "../http-common.js";

const create = data => {
  return http.post("/users", data);
};

const get = id => {
  return http.get(`/users/${id}`);
};

const getAll = () => {
  return http.get("/users");
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const login = data => {
  return http.post("users/login", data);
}

export default {
  create,
  get,
  getAll,
  remove,
  login
};