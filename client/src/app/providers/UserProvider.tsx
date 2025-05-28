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
  userLoginHandler: (email: string, password: string) => Promise<void>;
  setUser: Dispatch<SetStateAction<User>>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const userLoginHandler = async (email: string, password: string) => {
    const res = await axios.post("/auth/sign-in", { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      setUser({ email, password });
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("/auth/refresh-user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
      }
    };
    checkToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoginHandler, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
