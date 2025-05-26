"use client";

import axios from "axios";
import { createContext, PropsWithChildren, useState, useContext } from "react";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
  userLoginHandler: () => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const userLoginHandler = async () => {
    await axios.post("local/login", {});
  };

  return (
    <UserContext.Provider value={{ user, userLoginHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
