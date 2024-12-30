import { IUser } from "@host/types";

const getUser = () =>
  fetch("http://localhost:8080/api/user", { credentials: "include" })
    .then((res) => res.json())
    .then(({ data }) => data as IUser);

export const userService = {
  getUser,
};
