export const AppRoutes = {
  home: "/",
  signin: "/signin",
  signup: "/signup",
};

export const ServerRoutes = {
  signup: "/v1/user/signup",
  signin: "/v1/user/signin",
};

export const headerConfig = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};
