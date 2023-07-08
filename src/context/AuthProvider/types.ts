import { ReactNode } from "react";

export interface IUser {
  username?: string;
  password?: string;
}

export interface IContext extends IUser {
  authenticate: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticate: boolean;
  isError: boolean;
}

export interface IAuthProvider {
  children?: ReactNode;
}
