const AUTH_KEY = "auth";

interface AuthData {
  token: string;
  user: string;
}

export const getAuthFromLocalStorage = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  return authData ? JSON.parse(authData) : null;
};

export const setAuthToLocalStorage = (authData: AuthData): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

export const removeAuthFromLocalStorage = () => {
  localStorage.removeItem(AUTH_KEY);
};
