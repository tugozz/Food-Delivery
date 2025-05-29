"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const HeaderComponents = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleSignIn = () => {
    router.push("/login");
  };
  return (
    <div className="w-full h-[172px] bg-black">
      <div className="flex pl-[88px] pt-16 gap-3">
        <Image src="./icon.svg" height={46} width={37} alt="icon"></Image>
        <div className="font-medium, flex ">
          <h1 className="text-white">Nom</h1>
          <h1 className="text-[#EF4444]">Nom</h1>
          <h1 className="flex text-white">Swift delivery</h1>
        </div>

        <div className="flex">
          <button className="bg-white" onClick={handleSignIn}>
            Sign in
          </button>
          <button className="bg-red-600" onClick={handleSignup}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
