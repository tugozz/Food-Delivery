"use client";

import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
  userLoginHandler: () => void;
  setUser: Dispatch<SetStateAction<User>>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const userLoginHandler = async () => {
    try {
      await axios.post("local/login", {});
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    const refreshTokenIfNeeded = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("adfadfadf", {
            headers: { Authorization: token },
          });
          localStorage.setItem("token", response.data.token);
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }
    };

    refreshTokenIfNeeded();
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoginHandler, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
