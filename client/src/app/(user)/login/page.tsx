"use client";

import { useUserContext } from "@/app/providers/UserProvider";

const Loginpage = () => {
  const { user, userLoginHandler } = useUserContext();
  return <div>{user.email}</div>;
};

export default Loginpage;
