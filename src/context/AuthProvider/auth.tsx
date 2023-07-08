import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
      setIsAuthenticate(true);
    }
  }, []);

  async function authenticate(username: string, password: string) {
    try {
      const response = await LoginRequest(username, password);
      const payload = { token: response.token, username };

      setUser(payload);
      setUserLocalStorage(payload);
      setIsAuthenticate(true);
      return response;
    } catch (error) {
      setIsError(true);
      return null;
    }
  }

  async function logout() {
    setUser(null);
    setIsError(false);
    setUserLocalStorage(null);
    setIsAuthenticate(false);
  }

  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, logout, isAuthenticate, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
