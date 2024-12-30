const login = (data: { username: string; password: string }) =>
  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  }).then(async (res) => {
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage);
    }
    return res.json();
  });

export const authService = {
  login,
};
