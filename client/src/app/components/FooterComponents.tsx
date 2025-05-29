"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { FacebookIcon, InstagramIcon } from "lucide-react";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

export const FooterComponents = () => {
  const { push } = useRouter();
  const [data, setData] = useState<FoodCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<FoodCategory[]>(`http://localhost:8000/food-category`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col pt-25 bg-black h-auto">
      {/* Top Section */}
      <div className="flex bg-red-500 text-white font-semibold py-7 pl-[98px] text-[30px] gap-[34px] overflow-hidden whitespace-nowrap">
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
      </div>

      {/* Middle Section */}
      <div className="flex flex-wrap px-[88px] py-[76px] gap-8">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center">
          <Image
            src="./Icon.svg"
            alt="Nom Nom Swift Delivery Logo"
            width={46}
            height={38}
            onClick={() => push("/")}
          />
          <p className="text-white text-[20px] font-semibold">
            Nom{" "}
            <span className="text-[#EF4444] text-[20px] font-semibold">
              Nom
            </span>
          </p>
          <p className="text-white text-[12px] font-normal">Swift Delivery</p>
        </div>

        {/* Links */}
        <div className="flex gap-[112px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#71717A]">NOMNOM</h1>
            <p className="text-[16px] text-white cursor-pointer hover:underline">
              Home
            </p>
            <p className="text-[16px] text-white cursor-pointer hover:underline">
              Contact Us
            </p>
            <p className="text-[16px] text-white cursor-pointer hover:underline">
              Delivery zone
            </p>
          </div>

          {/* Food Categories */}
          <div className="flex gap-[56px]">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#71717A] text-[16px]">Menu</h1>
              {loading && <p className="text-white">Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {data?.slice(0, 5).map((cat) => (
                <p
                  key={cat._id}
                  className="cursor-pointer hover:underline text-white"
                >
                  {cat.categoryName}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[#71717A] text-[16px]">More</h1>
              {data?.slice(5, 10).map((cat) => (
                <p
                  key={cat._id}
                  className="cursor-pointer hover:underline text-white"
                >
                  {cat.categoryName}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <a href="https://facebook.com" aria-label="Facebook">
              <FacebookIcon className="text-white" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <InstagramIcon className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
